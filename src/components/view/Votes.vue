<template>
  <r-modal :show="showModal">
    <template v-slot:header>
      <div class="padding-1">
        <span class="header-title txt-primary font-32 txt-bold">Bien Hecho!</span>
      </div>
    </template>
    <template v-slot:body>
      <span class="margin-1 body-text txt-black font-24">Se añadio 3 puntos al Vendedor {{ vendedorId + 1}}.</span>
    </template>
    <template v-slot:footer>
      <r-button class="margin-1 clickeable" size="normal" state="active" @click="confirm">Continuar</r-button>
    </template>
  </r-modal>
  <div class="flex column align-center">
    <r-card class="margin-2" border="thin" :background="'white'" border-color="primary">
      <p class="txt-black txt-bold font-24">Seleccione la imagen ganadora</p>
    </r-card>
    <div class="result-container inline-flex align-center wrap justify-content-center">
      <template v-for="(image, i) in selectedImages" :key="i">
        <r-card-image-sellers type="votar" :url="image.image" :id="image.vendedor" v-on:votedImage="sendVote">
        </r-card-image-sellers>
      </template>
    </div>
  </div>
</template>

<script>
import RCard from "@/components/r-card.vue";
import RCardImageSellers from "@/components/r-card-image-sellers.vue";
import RModal from "@/components/r-modal.vue";
import RButton from "@/components/r-button.vue";

import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "Votacion",
  components: {RCard, RCardImageSellers, RModal, RButton},
  props: {
    selectedImages: {
      type: Array,
      required: true
    }
  },
  setup(props, {emit}) {
    const showModal = ref(false)
    const vendedorId = ref(null)

    const sendVote = (id) => {
      vendedorId.value = id
      showModal.value = true
    }

    const confirm = () => {
      showModal.value = false
      emit('sendVote', vendedorId.value)
    }
    return {
      showModal,
      vendedorId,
      name,
      sendVote,
      confirm
    }
  }

})
</script>

<style scoped lang="sass">
.result-container
  gap: 1rem 1rem
</style>