<template>
  <r-modal :show="showModal">
    <template v-slot:header>
      <div class="padding-1">
        <span class="header-title txt-primary font-32 txt-bold">Ganador: Vendedor {{id+1}}</span>
      </div>
    </template>
    <template v-slot:body>
      <r-card class="margin-1" border="thin" :background="'white'" border-color="primary">
        <span class="body-text txt-black font-24">Ingresa Usuario y Token para poder emitir la factura.</span>
        <div class="border-login">
          <div class="login-form flex column gap-1 padding-1">
            <r-control icon="user">
              <input class="input-control" type="text" placeholder="Ingrese Usuario" v-model="user">
            </r-control>
            <r-control icon="key">
              <input class="input-control" type="text" placeholder="Ingrese Token"
                     v-model="password">
            </r-control>
          </div>
          <div class="full-w txt-error" v-if="error">
            Usuario y/o Token no validos.
          </div>
          <div class="inline-flex align-center gap-1 padding-1">
            <r-button class="clickeable" size="normal" @click="cleanData()">Limpiar</r-button>
            <r-button class="clickeable" size="normal" state="active" v-if="buttonAvailable" @click="emitir">Emitir
            </r-button>
            <r-button class="clickeable" size="normal" state="disabled" v-if="!buttonAvailable">Emitir</r-button>
          </div>
        </div>
      </r-card>
    </template>
  </r-modal>

</template>

<script>
import RCard from "@/components/r-card.vue";
import RControl from "@/components/r-control.vue";
import RModal from "@/components/r-modal.vue";
import RButton from "@/components/r-button.vue";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import * as Alegra from "../../services/alegraApi";

export default {
  name: 'HelloWorld',
  components: {
    RCard,
    RControl,
    RButton,
    RModal,
  },
  props: {
    id: {
      type: Number,
      default: -1,
    },
    showModal:{
      type: Boolean,
      default: false,
    },
    data:{
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const token = store.getters["tokenState/getToken"]

    const user = ref('')
    const password = ref('')
    const error = ref(false)


    const buttonAvailable = computed(() => {
      return !!(user.value && user.value.trim() && password.value && password.value.trim());

    })

    const cleanData = () => {
      error.value = false
      user.value = ''
      password.value = ''
    }

    const emitir = async () => {
      error.value = false
      const token = window.btoa(user.value.trim()+':'+ password.value.trim())
      await store.dispatch("tokenState/setToken", token)

      const date = new Date()
      const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      const dueDate = date.getFullYear()+'-'+(date.getMonth()+2)+'-'+date.getDate()
      const items = props.data.map((value, index) => {
        return {'id': index+1, 'price':1, 'quantity': value}
      })

      const form = {
        'date': today,
        'dueDate': dueDate,
        'client': props.id+2,
        'items': items,
        "operationType": "INTERNAL_SALE"
      }

      try {
        let respuesta = await Alegra.post("/invoices",form)
        if (respuesta.status === 200 || respuesta.status === 201 ||respuesta.status === 202){
          emit('responseService', respuesta)
        }
      }catch (err){
          error.value = true
      }
    }




    return {
      token,
      user,
      password,
      error,

      buttonAvailable,

      cleanData,
      emitir,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="../../styles/generals.scss"/>

<style scoped lang="sass">
@import "../../styles/variables"
.login-form
  width: clamp(20rem, 30vw, 1000rem)

.sellers-input
  width: 200px
</style>
