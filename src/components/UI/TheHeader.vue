<template>
  <header class="header">
    <h1 class="header__app-name">Tasker</h1>
    <signout-button></signout-button>
  </header>
</template>

<script>
import SignoutButton from "../SignoutButton.vue";

export default {
  components: {
    SignoutButton,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  background: $header;

  &__app-name {
    font-weight: 700;
    margin: 0;
  }
}
</style>
