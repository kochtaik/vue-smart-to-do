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
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapMutations("taskModule", ["setUserTasks"]),
    ...mapActions("authModule", { logOut: "signOut" }),
    async signOut() {
      try {
        await this.logOut();
        this.setUserTasks({});
      } catch (error) {
        console.error(error.message);
        this.$toast.error(
          "Something went wrong. Please, check your internet connection and retry"
        );
      }
    },
  },
  computed: {
    ...mapGetters("authModule", ["isUserSignedIn"]),
  },
};
</script>
