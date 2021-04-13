<template>
  <section v-if="tasksList" class="edit-task">
    <h1 class="edit-task__heading">Edit task</h1>
    <input
      class="edit-task__input"
      type="text"
      name=""
      id=""
      placeholder="Enter your task..."
      v-model="taskContent"
    />
    <div class="edit-task__date-picker">
      <label for="date">Choose date</label>
      <input v-model="validDateString" type="date" id="date" />
    </div>
    <base-button class="edit-task__button" @click="saveTask">
      Save task
    </base-button>
  </section>
</template>

<script>
export default {
  methods: {
    async saveTask() {
      try {
        await this.$store.dispatch("tasksModule/updateTask", this.taskById);
        this.$router.push("/");
        this.$toast.success("Task has been successfully updated!");
      } catch (error) {
        this.$toast.error("Cannot update task");
        console.error("Cannot update task:", error.message);
      }
    },
    handleTimezone(dateString) {
      let taskCreationDate = new Date(dateString);
      const offset = taskCreationDate.getTimezoneOffset();

      taskCreationDate = new Date(
        taskCreationDate.getTime() - offset * 60 * 1000
      );
      return taskCreationDate.toISOString().split("T")[0];
    },
  },
  computed: {
    tasksList() {
      return this.$store.state.tasksModule.userTasks;
    },

    taskById() {
      const taskId = this.$route.params.taskId;
      const taskEntry = Object.entries(this.tasksList).find(
        ([id]) => id === taskId
      );
      // taskEntry has form [id, taskObj]
      return taskEntry;
    },

    // computed properties with implemented two-way data binding
    taskContent: {
      get() {
        if (!this.taskById) return;
        const [, task] = this.taskById;
        return task.taskContent;
      },
      set(newContent) {
        const [, task] = this.taskById;
        task.taskContent = newContent;
      },
    },

    // retrieve valid date string for input[type="date"]
    validDateString: {
      get() {
        if (!this.taskById) return;
        const [, task] = this.taskById;
        return this.handleTimezone(task.creationDate);
      },
      set(dateString) {
        const [, task] = this.taskById;
        task.creationDate = new Date(dateString).toDateString();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors";

.edit-task {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  padding: 1em;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid $base-gray;
  border-radius: 7px;

  &__heading {
    font-size: 1.2em;
    font-weight: 700;
  }

  &__input {
    height: 1.5em;
    margin: 0.8em 0;
  }

  &__date-picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.8em 0;

    > input {
      margin-left: 0.5em;
    }
  }

  &__button {
    background: $base-blue;
    color: $dark-contrast;
  }
}
</style>
