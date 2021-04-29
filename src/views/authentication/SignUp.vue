<template>
  <base-authentication
    cardCaption="Sign up"
    :isAuthPending="isAuthPending"
    @submit-data="signUp"
  ></base-authentication>
</template>

<script>
import { mapActions } from "vuex";
import BaseAuthentication from "../../components/BaseAuthentication.vue";

export default {
  data() {
    return {
      isAuthPending: false,
    };
  },
  components: {
    BaseAuthentication,
  },
  methods: {
    ...mapActions("authModule", { createUser: "signUp" }),

    async signUp(inputData) {
      this.isAuthPending = true;
      try {
        await this.createUser(inputData);
      } catch (err) {
        this.$toast.error(err.message);
      }
      this.isAuthPending = false;
    },
  },
};
</script>
