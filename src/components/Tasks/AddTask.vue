<template>
  <section class="add-task">
    <h1 class="add-task__heading">Add new task</h1>
    <input
      class="add-task__input"
      type="text"
      name=""
      id=""
      placeholder="Enter your task..."
      v-model="taskContent"
    />
    <base-button class="add-task__button" @click="prepareDataBeforeSending">
      Add task
    </base-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      taskContent: "",
    };
  },
  methods: {
    clearTaskContent() {
      if (this.taskContent === "What are you planing?") {
        this.taskContent = "";
      }
    },
    async prepareDataBeforeSending() {
      if (this.taskContent === "") return;
      const user = this.$store.state.authModule.currentUser;
      const taskRecord = {
        user,
        info: {
          creationDate: new Date(),
          taskContent: this.taskContent,
          completed: false,
        },
      };
      await this.$store.dispatch("tasksModule/putTaskToServer", taskRecord);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors";

.add-task {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  padding: 0.3em;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid $base-gray;
  border-radius: 7px;
  &__input {
    height: 1.5em;
    margin: 0.8em 0;
  }
  &__button {
    background: $base-blue;
    color: $dark-contrast;
  }
}
</style>
