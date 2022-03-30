<template>
  <r-card border="thin" background="white" border-color="primary">
    <div class="card-image-sellers">
      <div class="card-image full-w">
        <img alt='imagen busqueda' :src="url">
      </div>
      <div class="card-body">
        <p class="txt-black font-24">{{ title }}</p>
      </div>
      <div class="inline-flex full-w gap-1 justify-content-center align-center">
        <template v-if="type==='item'">
          <r-button class="clickeable" size="normal" :state="disabled?'disabled':'default'">Ver</r-button>
          <r-button class="clickeable" size="normal" :state="disabled?'disabled':'active'">Seleccionar</r-button>
        </template>
        <template v-if="type==='venta'">
          <r-button class="clickeable" size="normal">Ver</r-button>
          <r-button class="clickeable" size="normal" state="active">Votar</r-button>
        </template>
      </div>
    </div>
  </r-card>
</template>

<script>
import {defineComponent} from "vue";
import RButton from "@/components/r-button";
import RCard from "@/components/r-card";

export default defineComponent({
  name: "r-card-image-sellers",
  components: {RCard, RButton},
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }

  }

})
</script>
<style lang="scss" src="../styles/generals.scss"></style>

<style lang="sass" scoped>
@import "src/styles/variables.scss"
.card-image-sellers
  width: 16rem
  background: transparent

  .card-image
    img
      width: $full-v
      height: 12.5rem
      object-fit: cover

.card-body
  width: $full-v
  padding: 1rem 0 1rem 0

  p
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

</style>