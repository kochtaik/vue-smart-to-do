<template>
  <base-authentication
    cardCaption="Sign up"
    @submit-data="signUp"
  ></base-authentication>
</template>

<script>
import { mapActions } from "vuex";
import BaseAuthentication from "../../components/BaseAuthentication.vue";

export default {
  components: {
    BaseAuthentication,
  },
  methods: {
    ...mapActions("authModule", { createUser: "signUp" }),

    async signUp(inputData) {
      try {
        await this.createUser(inputData);
      } catch (err) {
        console.error(err.message);
        this.$toast.error(
          "Something went wrong. Please, check your internet connection and retry"
        );
      }
    },
  },
};
</script>
