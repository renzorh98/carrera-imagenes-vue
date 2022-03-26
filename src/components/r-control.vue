<template>
  <div class="control">
    <div class="content-wrap">
      <div class="icon-wrap" v-if="icon">
        <img alt="icon" :src="require('@/assets/icons/'+icon+'.svg')"/>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: undefined,
    },
  },
});
</script>

<style lang="sass" scoped>
@import "../styles/variables.scss"
.control
  width: 100%
  display: inline-flex
  align-items: center
  border: 0.1rem solid $snuff
  border-radius: $b-radius
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04)
  height: 50px


  .content-wrap
    width: $full-v
    margin: 14px 15px

    display: flex
    align-items: center

    .icon-wrap
      margin: auto
      padding-right: 0.5rem
      img
        width: 1.5rem
        height: 1.5rem
</style>