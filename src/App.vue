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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font: inherit;
}

body {
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
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  body {
    #app,
    button,
    input,
    select {
      font-size: 22px;
    }
  }
}
</style>
