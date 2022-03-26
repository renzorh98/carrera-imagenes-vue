<template>
  <div class="r-card" :class="classes">
    <slot>
    </slot>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";

let BorderWidth = [undefined,'thin','regular','huge']
let Color = [undefined,'none','white','primary','secondary','snuff','orange','black','gray']

export default defineComponent({
  name: "r-card",
  props: {
    background: {
      type: String,
      default: undefined,
      validator: (value) => {
        if(Color.indexOf(value) === -1){
          console.warn(`r-card: Background prop ${value} is not admitted`);
          return false;
        }
        return true;
      }
    },
    border: {
      type: String,
      default: undefined,
      validator: (value) => {
        if(BorderWidth.indexOf(value) === -1){
          console.warn(`r-card: border prop ${value} is not admitted`);
          return false;
        }
        return true;
      }
    },
    borderColor: {
      type: String,
      default: 'white',
      validator: (value) => {
        if(Color.indexOf(value) === -1){
          console.warn(`r-card: borderColor prop ${value} is not admitted`);
          return false;
        }
        return true;
      }
    },
  },
  setup(props){
    const classes = computed(()=>{
      return[
          props.border && `${props.border}-border`,
          props.background && `bg-${props.background}`,
          props.borderColor && `border-${props.borderColor}`,
      ]
    })

    return{
      classes
    }
  }
})
</script>

<style lang="scss" src="../styles/variables.scss" />
<style lang="sass" scoped>
@import "../styles/generals.scss"
@import "../styles/variables.scss"
.r-card
  width: fit-content
  padding: 1.5rem
  border-radius: $b-radius
  border-style: solid

  &.thin-border
    border-width: 4px
  &.regular-border
    border-width: 8px
  &.huge-border
    border-width: 16px

  &.border-white
    border-color: $white
  &.border-primary
    border-color: $primary
  &.border-secondary
    border-color: $secondary
  &.border-snuff
    border-color: $snuff
  &.border-orange
    border-color: $orange
  &.border-black
    border-color: $black
  &.border-gray
    border-color: $gray
</style>