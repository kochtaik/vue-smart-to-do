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
    <div class="add-task__date-picker">
      <label for="date">Choose date</label>
      <input v-model="chosenDate" type="date" id="date" />
    </div>
    <base-button class="add-task__button" @click="validateInput">
      Add task
    </base-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      taskContent: "",
      chosenDate: "",
    };
  },
  methods: {
    clearTaskContent() {
      if (this.taskContent === "What are you planing?") {
        this.taskContent = "";
      }
    },
    async prepareDataBeforeSending() {
      const user = this.$store.state.authModule.currentUser;
      const taskRecord = {
        user,
        info: {
          creationDate: this.dateAsObject,
          taskContent: this.taskContent,
          completed: false,
        },
      };
      try {
        await this.$store.dispatch("tasksModule/putTaskToServer", taskRecord);
        this.$toast.success(
          `Task has been saved for ${this.dateAsObject.toDateString()}!`
        );
      } catch (err) {
        this.$toast.error("Something went wrong. Please, retry later");
        console.log(err);
      }
    },
    validateInput() {
      if (this.taskContent === "") {
        this.$toast.error("Empty task is not allowed! Please, enter something");
        return;
      }
      this.prepareDataBeforeSending();
    },
  },
  computed: {
    dateAsObject() {
      return this.chosenDate === "" ? new Date() : new Date(this.chosenDate);
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
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid $base-gray;
  border-radius: 7px;
  &__input {
    height: 1.5em;
    margin: 0.8em 0;
  }
  &__date-picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__button {
    background: $base-blue;
    color: $dark-contrast;
  }
}
</style>
