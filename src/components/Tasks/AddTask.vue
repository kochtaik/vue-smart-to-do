<template>
  <section class="add-task">
    <h1 class="add-task__heading">Add new task</h1>
    <div
      class="add-task__content"
      contenteditable="true"
      @focus="clearTaskContent"
      @blur="setDefaultPlaceholder"
      @input="setInput($event.target.textContent)"
    >
      {{ taskContent }}
    </div>
    <base-button class="add-task__button" @click="prepareDataBeforeSending">
      Add task
    </base-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      taskContent: "What are you planing?",
    };
  },
  methods: {
    clearTaskContent() {
      if (this.taskContent === "What are you planing?") {
        this.taskContent = "";
      }
    },
    setDefaultPlaceholder() {
      if (this.taskContent === "") {
        this.taskContent = "What are you planing?";
      }
    },
    setInput(inputValue) {
      this.taskContent = inputValue;
    },
    prepareDataBeforeSending() {
      const user = this.$store.state.authModule.currentUser;
      const taskRecord = {
        user,
        info: {
          creationDate: new Date(),
          taskContent: this.taskContent,
          completed: false,
        },
      };
      this.$store.dispatch("tasksModule/putTaskToServer", taskRecord);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors";

.add-task {
  &__content {
    height: 30vh;
    width: 50%;
    margin: 0.5em 0;
  }
  &__button {
    background: $base-blue;
    color: $dark-contrast;
  }
}
</style>
