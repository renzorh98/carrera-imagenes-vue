<template>
  <div class="flex column align-center">
    <r-card class="margin-2" border="thin" :background="'white'" border-color="primary">
      <p class="txt-black txt-bold font-24">¿Cuantos vendedores participaran?</p>
    </r-card>
    <r-card border="thin" :background="'white'" border-color="primary">
      <div class="flex column gap-1 padding-1">
        <p class="font-32 txt-primary">Vendedores</p>
        <r-control icon="sellers" class="sellers-input">
          <input class="input-control" type="number" placeholder="Nº vendedores" v-model="numSellers">
        </r-control>
      </div>
      <div class="full-w txt-error font-14" v-if="error">
        Cantidad de vendedores admitida entre 2 y 8.
      </div>
    </r-card>
    <div class="padding-1">
      <r-button v-if='buttonAvailable' class="clickeable" size="normal" state="active" @click="sendNumSellers">Empezar
      </r-button>
      <r-button v-if='!buttonAvailable' class="clickeable" size="normal" state="disabled">Empezar</r-button>
    </div>

  </div>

</template>

<script>
import {computed, defineComponent, ref, watch} from "vue";

import RCard from "@/components/r-card.vue";
import RControl from "@/components/r-control.vue";
import RButton from "@/components/r-button.vue";

export default defineComponent({
  name: "Inicio",
  components: {
    RCard,
    RControl,
    RButton,
  },
  emits: ['setNumSellers'],
  setup(props, {emit}) {
    const error = ref(false)
    const numSellers = ref(null)

    const sendNumSellers = () => {
      emit('setNumSellers', numSellers.value)
    }
    const buttonAvailable = computed(() => {
      return (!error.value && numSellers.value && numSellers.value > 1)
    })

    watch(numSellers, (currentValue) => {
      error.value = currentValue <= 1 || currentValue > 8;
    })

    return {
      numSellers,
      error,

      buttonAvailable,

      sendNumSellers,
    }

  }
})
</script>
