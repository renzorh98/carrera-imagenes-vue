<template>
  <div class="inline-flex align-center">

    <div v-if="step === 1">
      <Inicio v-on:setNumSellers="getSellers"/>
    </div>
    <div v-if="step === 2">
      <Carrera :sellers="sellers" v-on:sendImages="setSelectedImages"/>
    </div>
    <div v-if="step === 3">
      <Votacion :selectedImages="selectedImages"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Carrera from "@/components/Carrera.vue";
import Inicio from '@/components/Inicio.vue'
import Votacion from "@/components/Votacion.vue";
import {ref} from "vue";

export default {
  name: 'Home',
  components: {
    Inicio,
    Carrera,
    Votacion
  },
  setup(){
    let step = ref(1)
    let sellers = ref(0)
    let sellersPoints = ref([])
    let selectedImages = ref([])

    const setSellers = () => {
      sellersPoints.value = Array(sellers.value).fill(0)
      console.log(sellersPoints.value)
    }

    const evalWinner = () => {
      let id = sellersPoints.value.findIndex((value) => { return value >= 20})
      if(id !== -1){
        return {bool: true, id: id}
      }
      return {bool: false, id: id}
    }

    const getSellers = (num) => {
      sellers.value = num
      setSellers()
      step.value++
    }

    const getVote = (id) => {
      sellersPoints.value[id] = sellersPoints.value[id] + 3
      let res = evalWinner()
      if(res.bool){
        console.log('ganador'+res.id)
      }
    }

    const setSelectedImages = (arr) => {
      selectedImages.value = arr
      step.value++

    }

    return{
      step,
      sellers,
      sellersPoints,
      selectedImages,

      setSelectedImages,
      getSellers,
      getVote,
    }

  }
}
</script>
<style lang="scss" src="../styles/generals.scss" />
