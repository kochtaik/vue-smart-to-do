<template>
  <section class="auth">
    <h2 class="auth__title">{{ pageDestination }}</h2>
    <form @submit.prevent="defineAction" class="auth__form form">
      <label for="email">Email</label>
      <input
        class="form__email-field"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
        title="Email must be of the form username@domain.com"
        reqiured
        type="email"
        id="email"
        v-model.trim="email"
      />
      <label for="password">Password</label>
      <input
        class="form__password-field"
        pattern="(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        reqiured
        ref="pass"
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
      return this.pageDestination === "Sign in" ? this.signIn() : this.signUp();
    },
    async signUp() {
      const { email, password } = this;
      try {
        await this.$store.dispatch("authModule/signUp", {
          email,
          password,
        });
      } catch (err) {
        console.error(err.message);
        this.$toast.error(
          "Something went wrong. Please, check your internet connection and retry"
        );
      }
    },
    async signIn() {
      const { email, password } = this;
      try {
        await this.$store.dispatch("authModule/signIn", { email, password });
      } catch (err) {
        console.error(err.message);
        this.$toast.error("This user doesn't exist");
      }
    },
    togglePassVisibility() {
      const passwordInput = this.$refs.pass;
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    },
  },
  computed: {
    pageDestination() {
      return this.$route.meta.pageDestination;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.auth {
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__title {
    font-weight: 700;
    font-size: 1.5em;
  }

  .form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1em;
    margin: 0.7em 0;

    &__email-field:invalid,
    &__password-field:invalid {
      border: 1px solid $red-alert;
    }

    &__submit {
      grid-area: 4 / span 2;
      background: $base-blue;
      color: $dark-contrast;
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
