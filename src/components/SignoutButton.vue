<template>
  <base-button v-if="isUserSignedIn" class="signout-btn" @click="signOut"
    >Sign out
  </base-button>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.signout-btn {
  background: $red-alert;
  color: $dark-contrast;
}
</style>

<script>
export default {
  methods: {
    async signOut() {
      await this.$store.dispatch("authModule/signOut");
    },
  },
  computed: {
    isUserSignedIn() {
      return this.$store.state.authModule.currentUser !== null;
    },
  },
};
</script>
