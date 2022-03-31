<template>
  <div class="flex column align-center">
    <r-card class="margin-2" border="thin" :background="'white'" border-color="primary">
      <p class="txt-black txt-bold font-24">{{selectedImagesCant}} de {{sellers}} imagenes seleccionadas</p>
      <r-button v-if="!isDisabled" style="margin-top: 1rem" size="normal" state="disabled">Ir a Votar</r-button>
      <r-button v-if="isDisabled" class="clickeable" style="margin-top: 1rem" size="normal" state="active" @click="sendImages">Ir a Votar</r-button>
    </r-card>
    <div class="inline-flex justify-content-center padding-2">
      <r-control icon="search" style="width: 40rem">
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
        <r-card-image-sellers :disabled="isDisabled" type="item" :url="imagen.image" v-on:selectedImage="setSelectedImage">

        </r-card-image-sellers>
      </template>
    </div>
    <div v-if="!loading && !imagenes.length" class="inline-flex align-center wrap justify-content-center">
      <p class="txt-white font-32 txt-bold">No hemos encontrado resultados!</p>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import * as GoogleApi from "../services/googleImagesApi";
import {GOOGLE_IMAGES_KEY} from "@/services/HOSTSERVER";
import RCardImageSellers from "@/components/r-card-image-sellers.vue";
import RButton from "@/components/r-button.vue";
import RControl from "@/components/r-control.vue";
import RCard from "@/components/r-card.vue";

export default defineComponent({
  name: "Carrera",
  props:{
    sellers:{
      type: Number,
      required: true
    }
  },

  emits: ['sendImages'],

  components: {
    RCardImageSellers,
    RButton,
    RControl,
    RCard,
  },

  setup(props, { emit }) {
    let imagenes = ref([])
    let query = ref('')
    let loading = ref(false)
    let selectedImages = ref([])
    let selectedImagesCant = ref(0)
    let maxSelections = ref(props.sellers)

    const isDisabled = computed(() => {
      return selectedImagesCant.value === maxSelections.value;
    })

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
      getImagenes(query.value.trim().replace(/\s/g, '+'))
    }

    const setSelectedImage = (obj) => {
        selectedImages.value.push(obj)
        selectedImagesCant.value = selectedImages.value.length
    }

    const sendImages = () => {
      emit('sendImages', selectedImages.value)

    }


    return {
      imagenes,
      query,
      loading,
      selectedImages,
      selectedImagesCant,

      isDisabled,

      search,
      setSelectedImage,
      sendImages,
    }

  }
})
</script>

<style scoped lang="sass">
.result-container
  gap: 1rem 1rem
</style>