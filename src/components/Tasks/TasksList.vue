<template>
  <section class="tasks">
    <template v-if="tasksNumber">
      <h2 class="tasks__number">{{ tasksNumber }} task(-s) for this day</h2>
      <ul class="tasks__task-list task-list">
        <li
          class="task-list__item"
          v-for="(task, idx) in tasksByDay"
          :key="idx"
        >
          {{ task.taskContent }}
        </li>
      </ul>
    </template>
    <template v-else>
      <h1>No tasks for this day</h1>
    </template>
    <router-link to="/add">New task</router-link>
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
    tasksList() {
      return this.$store.state.tasksModule.userTasks;
    },
    tasksByDay() {
      const selectedDay = this.selectedDay;
      const { year, month, day } = destructureDate(selectedDay);
      console.log(year, month, day);
      return this.tasksList?.[year]?.[month]?.[day]; // WTF
    },
    tasksNumber() {
      if (!this.tasksByDay) return;
      return Object.keys(this.tasksByDay).length;
    },
  },
};
</script>
