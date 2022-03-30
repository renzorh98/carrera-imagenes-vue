<template>
  <div class="flex column">
    <div class="inline-flex justify-content-center padding-2">
      <r-control icon="search" style="width: 40rem; margin-top: 3rem">
        <input maxlength="35" class="input-control" type="text" placeholder="Ingrese una palabra para buscar imagenes"
               v-model="query">
        <r-button class="clickeable" style="margin-left: 1rem" size="normal" state="active" @click="search()">Buscar
        </r-button>
      </r-control>
    </div>
    <div v-if="loading">
      <div class="flex column align-center wrap justify-content-center">
        <div class="loader"></div>
        <p class="txt-white font-32 txt-bold">Buscando resultados...</p>
      </div>
    </div>
    <div v-if="!loading && imagenes.length" class="result-container inline-flex align-center wrap justify-content-center">
      <template v-for="(imagen, i) in imagenes" :key="i">
        <r-card-image-sellers :disabled="disabled" type="item"
                              :url="imagen.image"></r-card-image-sellers>
      </template>
    </div>
    <div v-if="!loading && !imagenes.length" class="inline-flex align-center wrap justify-content-center">
      <p class="txt-white font-32 txt-bold">No hemos encontrado resultados!</p>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import * as GoogleApi from "../services/googleImagesApi";
import {GOOGLE_IMAGES_KEY} from "@/services/HOSTSERVER";
import RCardImageSellers from "@/components/r-card-image-sellers.vue";
import RButton from "@/components/r-button.vue";
import RControl from "@/components/r-control.vue";

export default defineComponent({
  name: "Carrera",
  components: {
    RCardImageSellers,
    RButton,
    RControl,
  },

  setup() {
    let imagenes = ref([])
    let query = ref('')
    let disabled = ref(false)
    let loading = ref(false)

    const getImagenes = async (query) => {
      await GoogleApi.get(`?key=${GOOGLE_IMAGES_KEY}&q=${query}`)
          .then((response) => {
            imagenes.value = response.data.hits.map((value) => {
              return {image: value.largeImageURL, title: value.tags}
            })
            loading.value = false
          })
          .catch((err) => {
            console.warn(err)
          })
      console.log(imagenes.value)
    }

    const search = () => {
      imagenes.value = []
      loading.value = true
      getImagenes(query.value.trim().replace(' ', '+'))
    }


    return {
      imagenes,
      query,
      disabled,
      loading,

      search,
    }

  }
})
</script>

<style scoped lang="sass">
.result-container
  gap: 1rem 1rem
</style>