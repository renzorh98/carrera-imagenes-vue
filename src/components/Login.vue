<template>
  <r-modal :show="showModal">
    <template v-slot:header>
      <div class="padding-15">
        <span class="header-title txt-primary font-32 txt-bold">LOGIN</span>
      </div>
    </template>
    <template v-slot:body>
      <span class="body-text txt-black font-24">Usuario y Token correctos empezamos la carrera.<br><br>Se seleccionaron <span class="txt-bold txt-black font-32">{{sellers}}</span> vendedores.</span>
    </template>
    <template v-slot:footer>
      <div class="padding-15">
        <r-button size="normal" state="active" @click="goToRace">Empezar</r-button>
      </div>
    </template>
  </r-modal>
  <r-card border="thin" background="white" border-color="primary">
    <div class="border-login">
      <h4 class="txt-primary txt-bold">CARRERA<br>IMAGENES</h4>
      <hr style="border: none; border-top: 0.3rem solid #ffa500"/>
      <div class="login-form flex column gap-1 padding-1">
        <r-control icon="user">
          <input class="input-control" type="text" placeholder="Ingrese Usuario" v-model="user">
        </r-control>
        <r-control icon="key">
          <input class="input-control" type="text" placeholder="Ingrese Token"
                 v-model="password">
        </r-control>
        <r-control icon="sellers" class="sellers-input">
          <input class="input-control" type="number" placeholder="Nº vendedores" v-model="sellers">
        </r-control>
      </div>
      <div class="full-w txt-error" v-if="error">
        Usuario y/o Token no validos.
      </div>
      <div class="inline-flex align-center gap-1 padding-1">
        <r-button class="clickeable" size="normal" @click="cleanData()">Limpiar</r-button>
        <r-button class="clickeable" size="normal" state="active" v-if="buttonAvailable" @click="login">Ingresar
        </r-button>
        <r-button class="clickeable" size="normal" state="disabled" v-if="!buttonAvailable">Ingresar</r-button>
      </div>
    </div>
  </r-card>
</template>

<script>
import RCard from "@/components/r-card.vue";
import RControl from "@/components/r-control.vue";
import RModal from "@/components/r-modal.vue";
import RButton from "@/components/r-button.vue";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import * as Alegra from "../services/alegraApi";
import router from "@/router";

export default {
  name: 'HelloWorld',
  components: {
    RCard,
    RControl,
    RButton,
    RModal,
  },
  setup() {
    const store = useStore()

    let token = store.getters["tokenState/getToken"]

    let user = ref('')
    let password = ref('')
    let error = ref(false)
    let sellers = ref(null)

    let showModal = ref(false)

    const buttonAvailable = computed(() => {
      return !!(user.value && user.value.trim() && password.value && password.value.trim() && sellers.value && sellers.value > 0);

    })

    const cleanData = () => {
      error.value = false
      user.value = ''
      password.value = ''
      sellers.value = null
    }

    const login = async () => {
      error.value = false
      const token = window.btoa(user.value.trim()+':'+ password.value.trim())
      await store.dispatch("tokenState/setToken", token)
      try {
        let respuesta = await Alegra.get("/items/1")
        if (respuesta.status === 200){
          error.value = false
          showModal.value = true
        }
      }catch (err){
          error.value = true
      }
    }

    const goToRace = () => {
      router.push(`/carrera-imagenes/${sellers.value}`)
    }

    const loginAction = () => {
      console.log(user.value.trim() + '-' + password.value.trim())
    }

    onMounted(() => {

    })

    return {
      token,
      sellers,
      user,
      password,
      error,
      showModal,

      buttonAvailable,

      cleanData,
      login,
      loginAction,
      goToRace,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="../styles/generals.scss"/>

<style scoped lang="sass">
@import "src/styles/variables.scss"
.input-control
  font-family: $font, sans-serif
  width: $full-v
  height: 22px

.login-form
  width: clamp(20rem, 30vw, 1000rem)

.sellers-input
  width: 200px
</style>
