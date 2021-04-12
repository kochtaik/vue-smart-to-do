<template>
  <section class="tasks">
    <template v-if="tasksNumber">
      <header class="tasks__header">
        <h2 class="tasks__header__number">
          {{ tasksNumber }} task(-s) for this day
        </h2>
        <base-button class="tasks__header__new-task">
          <router-link to="/add">New task</router-link>
        </base-button>
      </header>
      <ul class="tasks__task-list task-list">
        <li
          class="task-list__item"
          v-for="(info, id, idx) in tasksByDay"
          :key="id"
        >
          <label
            :for="id"
            class="task-list__item__label"
            :class="{ 'task-list__item__label--done': info.completed }"
          >
            {{ info.taskContent }}
          </label>
          <input
            class="task-list__item__checkbox"
            type="checkbox"
            name=""
            :id="idx"
            :value="createJSONString({ id, info })"
            :checked="info.completed"
            @change="changeTaskStatus($event.target.value)"
          />
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="tasks__header">
        <h2>No tasks for this day</h2>
        <base-button class="tasks__header__new-task">
          <router-link to="/add">New task</router-link>
        </base-button>
      </div>
    </template>
    <div class="tasks__loader">
      <pulse-loader :loading="isTasksListLoading"></pulse-loader>
    </div>
  </section>
</template>

<script>
import { destructureDate } from "../../utils/DateParser";

export default {
  props: {
    selectedDay: {
      type: Object,
      default: new Date(),
    },
  },
  computed: {
    isTasksListEmpty() {
      return this.$store.getters["tasksModule/isTaskListEmpty"];
    },
    isTasksListLoading() {
      return this.$store.getters["tasksModule/isTasksListLoading"];
    },
    tasksList() {
      return this.$store.state.tasksModule.userTasks;
    },
    tasksByDay() {
      const selectedDay = this.selectedDay;
      const { year, month, day } = destructureDate(selectedDay);

      return this.isTasksListEmpty ? {} : this.tasksList[year]?.[month]?.[day];
    },
    tasksNumber() {
      if (!this.tasksByDay) return;
      return Object.keys(this.tasksByDay).length;
    },
  },
  methods: {
    async changeTaskStatus(task) {
      const taskObject = JSON.parse(task);

      taskObject.info.completed = !taskObject.info.completed;
      try {
        await this.$store.dispatch("tasksModule/updateTask", taskObject);
      } catch (error) {
        console.error(error);
        this.$toast.error("Cannot update task");
      }
    },
    createJSONString(taskObj) {
      return JSON.stringify(taskObj);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors";

.tasks {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    align-items: center;
    margin: 0.5em 0 1.3em 1em;

    &__new-task {
      padding: 0.5em;
      margin-left: 0.5em;
      background: $base-blue;
      height: 2em;

      & > a {
        color: $dark-contrast;
        text-decoration: none;
      }
    }
  }

  &__loader {
    align-self: center;
  }

  h2 {
    font-size: 1.2em;
    font-weight: 700;
  }

  .task-list {
    list-style: none;
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__item {
      width: 95%;
      font-size: 1.2em;
      padding: 0.5em;
      border-bottom: 1px solid $base-gray;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__checkbox {
        cursor: pointer;
        transform: scale(1.2);
        margin-right: 1.3em;
      }
      &__label--done {
        text-decoration: line-through;
      }
    }
  }
}

@media (min-width: 768px) {
  .task-list {
    width: 75%;
  }
}
</style>
