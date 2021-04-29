<template>
  <section class="auth">
    <template v-if="!isAuthPending">
      <h2 class="auth__title">{{ cardCaption }}</h2>
      <form @submit.prevent="submitInputData" class="auth__form form">
        <label for="email">Email</label>
        <input
          class="form__email-field"
          title="Email must be of the form username@domain.com"
          reqiured
          type="email"
          id="email"
          v-model.trim="email"
        />
        <label for="password">Password</label>
        <input
          class="form__password-field"
          title="Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          reqiured
          :type="passFieldType"
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
          cardCaption
        }}</base-button>
      </form>
      <p class="auth__change-action">
        <router-link :to="oppositeAuthAction.link">{{
          oppositeAuthAction.name
        }}</router-link>
      </p>
    </template>
    <pulse-loader class="auth__loader" :loading="isAuthPending"></pulse-loader>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passFieldType: "password",
    };
  },

  emits: ["submit-data"],
  props: {
    cardCaption: {
      type: String,
      required: true,
    },
    isAuthPending: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    oppositeAuthAction() {
      const authActionData = { link: "/sign-up", name: "Sign up" };
      if (this.cardCaption === "Sign up") {
        authActionData.link = "/sign-in";
        authActionData.name = "Sign in";
      }
      return authActionData;
    },
  },

  methods: {
    submitInputData() {
      const { email, password } = this;
      const inputData = { email, password };

      this.$emit("submit-data", inputData);
    },

    togglePassVisibility() {
      this.passFieldType =
        this.passFieldType === "password" ? "text" : "password";
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

  &__change-action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__loader {
    margin: 0 auto;
    width: max-content;
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
