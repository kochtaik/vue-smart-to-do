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
import { mapState, mapActions } from "vuex";
import { toValidHTMLDateFormat } from "../../utils/calendarHelpers";

export default {
  data() {
    return {
      taskContent: "",
      chosenDate: toValidHTMLDateFormat(this.$route.params.date),
    };
  },
  methods: {
    ...mapActions("taskModule", ["putTaskToServer"]),
    clearTaskContent() {
      if (this.taskContent === "What are you planing?") {
        this.taskContent = "";
      }
    },
    async prepareDataBeforeSending() {
      const user = this.currentUser;
      const taskRecord = {
        user,
        info: {
          creationDate: new Date(this.chosenDate),
          taskContent: this.taskContent,
          completed: false,
        },
      };
      try {
        await this.putTaskToServer(taskRecord);
        this.$toast.success(`Task has been saved for ${this.chosenDate}!`);
      } catch (err) {
        this.$toast.error(err.message);
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
    ...mapState("authModule", ["currentUser"]),
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
