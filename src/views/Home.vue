<template>
  <div class="inline-flex align-center">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
<style lang="scss" src="../styles/generals.scss" />
