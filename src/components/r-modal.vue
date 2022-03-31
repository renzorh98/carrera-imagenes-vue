<template>
  <div class="modal-mask" v-if="show">
    <template v-if="image">
      <slot name="image"></slot>
    </template>
    <template v-if="!image">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <slot name="header"></slot>
          </div>
          <div>
            <slot name="body"></slot>
          </div>
          <div>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    image: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="sass" scoped>
@import "src/styles/variables.scss"
.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: $full-v
  height: $full-v
  background-color: $modal-background
  display: table
  transition: opacity 0.3s ease

  .modal-wrapper
    display: table-cell
    vertical-align: middle

    .modal-container
      display: inline-block
      margin: auto
      background: $white
      border-radius: $b-radius
      border: 0.2rem solid $primary
      transition: all 0.3s ease

@media screen and (max-width: $media-screen)
  .modal-container
    min-width: 315px

@media screen and (min-width: $media-screen)
  .modal-container
   min-width: 570px
</style>