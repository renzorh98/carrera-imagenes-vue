<template>
  <div class="flex column align-center">
    <r-card class="margin-2" border="thin" :background="'white'" border-color="primary">
      <p class="txt-black txt-bold font-24">Seleccione la imagen ganadora</p>
    </r-card>
    <div class="result-container inline-flex align-center wrap justify-content-center">
      <template v-for="(image, i) in selectedImages" :key="i">
        <r-card-image-sellers type="votar" :url="image.image" :id="image.vendedor">
        </r-card-image-sellers>
      </template>
    </div>
  </div>

</template>

<script>
import RCard from "@/components/r-card.vue";
import RCardImageSellers from "@/components/r-card-image-sellers.vue";

import {defineComponent} from "vue";
export default defineComponent({
  name: "Votacion",
  components:{ RCard, RCardImageSellers},
  props: {
    selectedImages: {
      type: Array,
      required: true
    }
  }
})
</script>

<style scoped lang="sass">
.result-container
  gap: 1rem 1rem
</style>