<template>
  <section class="auth">
    <h1 class="auth__title">{{ pageDestination }}</h1>
    <form @submit.prevent="defineAction" class="auth__form form">
      <label for="email">Email</label>
      <input reqiured type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input
        ref="pass"
        reqiured
        type="password"
        id="password"
        v-model="password"
      />
      <label for="showPassword">Show password</label>
      <input
        type="checkbox"
        name="showPassword"
        id="showPassword"
        @input="togglePassVisibility"
      />
      <base-button class="form__submit" type="submit">{{
        pageDestination
      }}</base-button>
    </form>
    <p v-if="pageDestination === 'Sign up'" class="auth__change-action">
      Already have an account?
      <router-link to="/sign-in">Sign in</router-link>
    </p>
    <p v-else class="auth__change-action">
      Don't have an account yet?
      <router-link to="/sign-up">Sign up</router-link>
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    defineAction() {
      if (this.pageDestination === "Sign in") {
        this.signIn();
      } else this.signUp();
    },
    async signUp() {
      const { email, password } = this;
      try {
        const isUserCreated = await this.$store.dispatch("authModule/signUp", {
          email,
          password,
        });
        if (isUserCreated) {
          await this.$router.push("/");
        }
      } catch (err) {
        console.err(err.message);
      }
    },
    async signIn() {
      const { email, password } = this;
      try {
        const authenticationStatus = await this.$store.dispatch(
          "authModule/signIn",
          { email, password }
        );
        if (authenticationStatus) {
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
    togglePassVisibility() {
      const passwordInput = this.$refs.pass;
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    },
  },
  computed: {
    isSignedIn() {
      return this.$store.state.authModule.isSignedIn;
    },
    pageDestination() {
      return this.$route.meta.pageDestination;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5em;
    &__submit {
      grid-area: 4 / span 2;
    }
  }
  &__change-action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .auth {
    width: 50%;
    &__change-action {
      text-align: start;
    }
  }
}
</style>
