<template>
  <section class="tasks">
    <template v-if="tasksNumber">
      <h2 class="tasks__number">{{ tasksNumber }} task(-s) for this day</h2>
      <ul class="tasks__task-list task-list">
        <li
          class="task-list__item"
          v-for="(info, id, idx) in tasksByDay"
          :key="id"
        >
          <label :for="id">{{ info.taskContent }}</label>
          <input
            type="checkbox"
            name=""
            :id="idx"
            :value="createJSONString({ id, info })"
            @change="changeTaskStatus($event.target.value)"
          />
        </li>
      </ul>
    </template>
    <template v-else>
      <h1>No tasks for this day</h1>
    </template>
    <base-button class="tasks__new-task">
      <router-link to="/add">New task</router-link>
    </base-button>
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
      console.log(this.$store.state.tasksModule.userTasks);
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
  methods: {
    changeTaskStatus(task) {
      const taskObject = JSON.parse(task);
      taskObject.info.completed = !taskObject.info.completed;
      this.$store.dispatch("tasksModule/updateTask", taskObject);
    },
    createJSONString(taskObj) {
      return JSON.stringify(taskObj);
    },
  },
  // watch: {
  //   completedTasks(tasks) {
  //     this.changeTaskStatus(tasks);
  //   },
  // },
};
</script>
