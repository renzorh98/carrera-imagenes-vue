<template>
  <div class="inline-flex align-center">

    <div v-if="step === 1">
      <Inicio v-on:setNumSellers="getSellers"/>
    </div>
    <div v-if="step === 2">
      <Carrera :sellers="sellers"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Carrera from "@/components/Carrera.vue";
import Inicio from '@/components/Inicio.vue'
import {ref} from "vue";

export default {
  name: 'Home',
  components: {
    Inicio,
    Carrera
  },
  setup(){
    let step = ref(1)
    let sellers = ref(0)
    let sellers_points = ref([])

    const setSellers = () => {
      sellers_points.value = Array(sellers.value).fill(0)
      console.log(sellers_points.value)
    }

    const evalWinner = () => {
      let id = sellers_points.value.findIndex((value) => { return value >= 20})
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
      sellers_points.value[id] = sellers_points.value[id] + 3
      let res = evalWinner()
      if(res.bool){
        console.log('ganador'+res.id)
      }
    }

    return{
      step,
      sellers,
      sellers_points,

      getSellers,
      getVote,
    }

  }
}
</script>
<style lang="scss" src="../styles/generals.scss" />
