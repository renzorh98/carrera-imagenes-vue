<template>
  <r-modal :show="showModal">
    <template v-slot:header>
      <div class="padding-1">
        <span class="header-title txt-primary font-32 txt-bold">Bien Hecho!</span>
      </div>
    </template>
    <template v-slot:body>
      <span class="margin-1 body-text txt-black font-24">Se emitio la factura a nombre de {{name}} con id {{id}}.</span>
    </template>
    <template v-slot:footer>
      <r-button class="margin-1 clickeable" size="normal" state="active" @click="confirm">Cerrar</r-button>
    </template>
  </r-modal>
</template>

<script>
import RModal from "@/components/r-modal.vue";
import RButton from "@/components/r-button.vue";

export default {
  name: "Confirmation",
  components: {
    RModal,
    RButton
  },
  props: {
    showModal:{
      type: Boolean,
      default: false
    },
    name:{
      type: String,
      default: 'S/N'
    },
    id:{
      type: Number,
      default: null
    }
  },
  setup(props, { emit }){
    const confirm = () => {
      emit('confirm')
    }
    return{ confirm }
  }
}
</script>
<style lang="scss" src="../../styles/generals.scss"/>
