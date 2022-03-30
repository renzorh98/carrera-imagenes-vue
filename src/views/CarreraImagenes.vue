<template>
  <div class="inline-flex align-center">
    <Carrera />
  </div>
</template>
<script>
import Carrera from "@/components/Carrera.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components:{Carrera}
})

</script>