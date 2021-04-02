<template>
  <the-calendar />
  <tasks-list />
</template>

<script>
import TasksList from "../components/Tasks/TasksList.vue";
import TheCalendar from "../components/TheCalendar.vue";
export default {
  components: {
    TasksList,
    TheCalendar,
  },
};
</script>
