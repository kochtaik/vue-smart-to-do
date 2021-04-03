<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
@import "./assets/colors.scss";

body {
  margin: 0;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $base-font;
  }
  #app,
  button,
  input,
  select {
    font-size: 22px;
  }
}

@media (min-width: 768px) {
  #app,
  button,
  input,
  select {
    font-size: 20px;
  }
}
</style>
