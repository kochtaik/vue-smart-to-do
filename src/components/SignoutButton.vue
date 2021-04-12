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
      try {
        await this.$store.dispatch("authModule/signOut");
        this.$store.commit("tasksModule/setUserTasks", {});
      } catch (error) {
        console.error(error.message);
        this.$toast.error(
          "Something went wrong. Please, check your internet connection and retry"
        );
      }
    },
  },
  computed: {
    isUserSignedIn() {
      return this.$store.state.authModule.currentUser !== null;
    },
  },
};
</script>
