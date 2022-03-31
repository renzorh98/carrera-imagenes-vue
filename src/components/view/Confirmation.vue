<template>
  <r-modal :show="showModal">
    <template v-slot:header>
      <div class="padding-1">
        <span class="header-title txt-primary font-32 txt-bold">Bien Hecho!</span>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex column">
        <span class="margin-1 body-text txt-black font-24">Se emitio la factura a nombre de {{name}} con id {{id}}.</span>
        <span class="margin-1 body-text txt-black font-24">Fecha de emision {{response.date}}</span>
        <span class="margin-1 body-text txt-primary font-32 txt-bold">Items:</span>
        <div v-for="item in response.items" :key="item.id">
          <span class="margin-1 body-text txt-black font-24">{{item.id}} - {{item.name}}</span>
          <span class="margin-1 body-text txt-black font-24">precio: {{item.price}}, cantidad: {{item.quantity}}, total: {{item.total}}</span>
        </div>
      </div>

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
    response:{
      type: Object,
      required: true
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
