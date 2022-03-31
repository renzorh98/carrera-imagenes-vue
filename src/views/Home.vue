<template>
  <r-card v-if="step === 2 || step === 3" class="margin-1" border="thin" :background="'white'" border-color="primary">
    <div class="flex row align-center justify-content-center gap-1">
      <template v-if="seePoints">
        <template v-for="(seller, index) in sellersPoints" :key="index">
          <p class="font-14 txt-black txt-bold">
            Vendedor {{ index + 1 }}: {{ seller }} puntos, a {{ pointsToWin - seller }} puntos de ganar.
          </p>
        </template>
      </template>
      <r-button class="clickeable" size="normal" state="active" @click="seePoints = !seePoints">Puntajes</r-button>
    </div>
  </r-card>
  <div class="inline-flex align-center">
    <Confirmation :show-modal="showModalConfirm" :id="idRes" :name="name" v-on:confirm="showModalConfirm = false"/>
    <Login :data="sellersPoints" :showModal="showModalLogin" :id="idWinner" v-on:responseService="responseService"/>

    <div v-if="step === 1">
      <Start v-on:setNumSellers="getSellers"/>
    </div>
    <div v-if="step === 2">
      <Race :sellers="sellers" v-on:sendImages="setSelectedImages"/>
    </div>
    <div v-if="step === 3">
      <Votes :selectedImages="selectedImages" v-on:sendVote="getVote"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Race from "@/components/view/Race.vue";
import Start from '@/components/view/Start.vue'
import Votes from "@/components/view/Votes.vue";
import Login from "@/components/view/Login.vue";
import Confirmation from "@/components/view/Confirmation.vue";
import {ref} from "vue";
import RCard from "@/components/r-card";
import RButton from "@/components/r-button";

export default {
  name: 'Home',
  components: {
    RButton,
    RCard,
    Start,
    Race,
    Votes,
    Login,
    Confirmation,
  },
  setup() {
    const step = ref(1)
    const sellers = ref(0)
    const sellersPoints = ref([])
    const selectedImages = ref([])
    const showModalConfirm = ref(false)
    const showModalLogin = ref(false)
    const seePoints = ref(false)
    const idWinner = ref(-1)
    const idRes = ref()
    const name = ref('S/N')
    const pointsToWin = 20

    const setSellers = (num) => {
      sellersPoints.value = Array(num).fill(0)
      console.log('sellers' + num)
    }

    const evalWinner = () => {
      let id = sellersPoints.value.findIndex((value) => {
        return value >= pointsToWin
      })
      if (id !== -1) {
        return {bool: true, id: id}
      }
      return {bool: false, id: id}
    }

    const getSellers = (num) => {
      sellers.value = num
      setSellers(num)
      step.value++
    }

    const getVote = (id) => {
      sellersPoints.value[id] = sellersPoints.value[id] + 3
      let res = evalWinner()
      if (res.bool) {
        console.log('ganador' + res.id)
        showModalLogin.value = true
        idWinner.value = res.id
      } else {
        step.value = 2
      }
    }

    const responseService = (res) => {
      showModalLogin.value = false
      name.value = res.data.client.name
      idRes.value = res.data.client.id
      showModalConfirm.value = true
      step.value = 1
    }

    const setSelectedImages = (arr) => {
      selectedImages.value = arr
      step.value++
    }

    return {
      step,
      sellers,
      sellersPoints,
      selectedImages,
      showModalLogin,
      showModalConfirm,
      idWinner,
      idRes,
      name,
      pointsToWin,
      seePoints,

      setSelectedImages,
      getSellers,
      getVote,
      responseService,
    }

  }
}
</script>
<style lang="scss" src="../styles/generals.scss"/>
