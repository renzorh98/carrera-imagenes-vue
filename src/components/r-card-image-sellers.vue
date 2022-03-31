<template>
  <r-card border="thin" :background="'white'" border-color="primary">
    <div class="card-image-sellers">
      <div class="card-image full-w">
        <img alt='imagen busqueda' :src="url">
      </div>
      <div class="card-body" v-if="id != null">
        <p class="txt-black font-24">{{ 'Opcion del Vendedor ' + (id+1) }}</p>
      </div>
      <div class="card-actions inline-flex full-w gap-1 justify-content-center align-center">
        <template v-if="type==='item'">
          <r-button v-if="!disabled && !auxDisabled" class="clickeable" size="normal" >Ver</r-button>
          <r-button v-if="disabled || auxDisabled" size="normal" state="disabled" >Ver</r-button>
          <r-button v-if="!disabled && !auxDisabled" class="clickeable" size="normal" state="active" @click="selected">Seleccionar</r-button>
          <r-button v-if="disabled || auxDisabled" size="normal" state="disabled" >Seleccionar</r-button>
        </template>
        <template v-if="type==='votar'">
          <r-button class="clickeable" size="normal">Ver</r-button>
          <r-button class="clickeable" size="normal" state="active">Votar</r-button>
        </template>
      </div>
    </div>
  </r-card>
</template>

<script>
import {defineComponent, ref} from "vue";
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
    id: {
      type: Number,
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
  },
  emits: ['selectedImage'],
  setup(props, { emit }){
    let auxDisabled = ref(false)
    const selected = () => {
      auxDisabled.value = true
      emit('selectedImage', {image: props.url})
    }

    return{ auxDisabled, selected }

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
  padding-top: 1rem

  p
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
.card-actions
  padding-top: 1rem
</style>