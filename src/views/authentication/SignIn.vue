<template>
  <base-authentication
    cardCaption="Sign in"
    :isAuthPending="isAuthPending"
    @submit-data="signIn"
  ></base-authentication>
</template>

<script>
import { mapActions } from "vuex";
import BaseAuthentication from "../../components/BaseAuthentication.vue";

export default {
  components: {
    BaseAuthentication,
  },
  data() {
    return {
      isAuthPending: false,
    };
  },
  methods: {
    ...mapActions("authModule", { logIn: "signIn" }),

    async signIn(inputData) {
      this.isAuthPending = true;
      try {
        await this.logIn(inputData);
      } catch (err) {
        this.$toast.error(err.message);
      }
      this.isAuthPending = false;
    },
  },
};
</script>
