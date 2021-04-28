<template>
  <base-authentication
    cardCaption="Sign in"
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
  methods: {
    ...mapActions("authModule", { logIn: "signIn" }),

    async signIn(inputData) {
      try {
        await this.logIn(inputData);
      } catch (err) {
        console.error(err.message);
        this.$toast.error("This user doesn't exist");
      }
    },
  },
}
</script>
