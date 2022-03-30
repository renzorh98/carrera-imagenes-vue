<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<style lang="scss">
@import "styles/variables.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html{
  width: $full-v;
  height: 100%;
  margin: 0;
  background: linear-gradient($orange, $primary) no-repeat fixed;
  font-size: 16px;
}

p{
  margin: 0;
}

h1{
  font-size: 6rem;
}
h2{
  font-size: 5rem;
}
h3{
  font-size: 4rem;
}
h4{
  font-size: 3rem;
}
h5{
  font-size: 2rem;
}
h6{
  font-size: 1rem;
}

input{
  border: none !important;
  padding: 0 !important;
  font-size: 1.4rem;
  &:focus{
    outline: none
  }

  &::placeholder{
    color: $gray;
    font-size: 1.4rem;
  }
}

@media (max-width: $media-screen) {
  html{
    font-size: 13px;
  }
}

</style>
