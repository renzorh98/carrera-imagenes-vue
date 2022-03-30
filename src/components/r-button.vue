<template>
  <button class="button is-button slim" :class="classes">
    <slot />
  </button>
</template>
<script>
import { computed, defineComponent } from "vue";

let ButtonSize = [undefined, "normal", "big"];
let StateType = ["default","normal", "active", "disabled"];
export default defineComponent({
  props: {
    size: {
      type: String,
      default: undefined,
      validator: (value) => {
        if (ButtonSize.indexOf(value) === -1) {
          console.warn(
              `v-button: Invalid '${value}' size. Should be normal, big, or undefined`
          );
          return false;
        }
        return true;
      },
    },
    state: {
      type: String,
      default: "default",
      validator: (value) => {
        if (StateType.indexOf(value) === -1) {
          console.warn(
              `v-button: Invalid '${value}' state. Should be default, active or disabled`
          );
          return false;
        }
        return true;
      },
    },
  },
  setup(props) {
    const classes = computed(() => {
      return [
        props.size && `is-${props.size}`,
        props.state && `is-${props.state}`,
      ];
    });

    return {
      classes,
    };
  },
});

</script>

<style lang="sass" scoped>
@import "../styles/variables.scss"
$height-44px: 44px
$padding: 11px 20px
$line-height-22: 1.375rem

.button
  display: inline-flex
  align-items: center
  justify-content: center

  border: 0
  border-radius: $b-radius

  height: $height-44px
  padding: $padding
  color: $white
  font-family: $font
  font-weight: bold
  font-size: 1.2rem
  line-height: $line-height-22
  font-style: normal
  cursor: pointer

  &.is-normal
    width: 155px

  &.is-default
    background: $orange

  &.is-active
    background: $primary

  &.is-disabled
    background: $gray

@media screen and (max-width: $media-screen)
  .button
    &.is-big
      width: 150px


@media screen and (min-width: $media-screen)
  .button
    &.is-big
      width: 275px

.is-disabled
  cursor: default
  &:hover
    filter: none

</style>