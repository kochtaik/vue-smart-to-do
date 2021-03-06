<template>
  <section class="tasks">
    <template v-if="tasksNumber">
      <header class="tasks__header">
        <h2 class="tasks__header__number">
          {{ tasksNumber }} task(-s) for this day
        </h2>
        <base-button class="tasks__header__new-task">
          <router-link :to="`/add/${selectedDay.toDateString()}`">
            New task
          </router-link>
        </base-button>
      </header>
      <ul class="tasks__task-list task-list">
        <li
          class="task-list__item"
          v-for="(info, id, idx) in getTasksByDayAsObject"
          :key="id"
        >
          <label
            :for="id"
            class="task-list__item__label"
            :class="{ 'task-list__item__label--done': info.completed }"
          >
            {{ info.taskContent }}
          </label>
          <div class="options">
            <i
              class="options__icon far fa-trash-alt"
              @click="deleteTask(id)"
            ></i>
            <router-link :to="`/edit/${id}`">
              <i class="options__icon fas fa-pen"></i>
            </router-link>
            <input
              class="options__checkbox"
              type="checkbox"
              :id="idx"
              :checked="info.completed"
              @change="changeTaskStatus({ id, info })"
            />
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="tasks__header">
        <h2>No tasks for this day</h2>
        <base-button class="tasks__header__new-task">
          <router-link :to="`/add/${selectedDay.toDateString()}`">
            New task
          </router-link>
        </base-button>
      </div>
    </template>
    <div class="tasks__loader">
      <pulse-loader :loading="isTaskListLoading"></pulse-loader>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    selectedDay: {
      type: Object,
      default: new Date(),
    },
  },
  computed: {
    ...mapState("taskModule", {
      isTaskListLoading: "isTaskListLoading",
      tasksList: "userTasks",
    }),
    ...mapGetters("taskModule", ["tasksByDate", "isTaskListEmpty"]),

    getTasksByDayAsObject() {
      if (!this.tasksByDate || !this.tasksByDate(this.selectedDay)) return {};
      return Object.fromEntries(this.tasksByDate(this.selectedDay));
    },

    tasksNumber() {
      if (!this.getTasksByDayAsObject) return;

      return Object.keys(this.getTasksByDayAsObject).length;
    },
  },
  methods: {
    ...mapActions("taskModule", {
      updateTask: "updateTask",
      removeTask: "deleteTask",
    }),

    async changeTaskStatus(task) {
      task.info.completed = !task.info.completed;
      try {
        await this.updateTask(task);
      } catch (error) {
        console.error(error);
        this.$toast.error("Cannot update task");
      }
    },

    async deleteTask(taskId) {
      try {
        await this.removeTask(taskId);
        this.$toast.success("Task has been deleted");
      } catch (error) {
        console.error(error);
        this.$toast.error("Cannot delete task");
      }
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

      &__label--done {
        text-decoration: line-through;
      }

      .options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 30%;

        &__checkbox {
          cursor: pointer;
          transform: scale(1.2);
        }

        &__icon {
          color: $base-gray;
          cursor: pointer;
        }
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
