<template>
  <the-calendar @select-day="setSelectedDay" />
  <tasks-list :selectedDay="selectedDay" />
</template>

<script>
import TasksList from "../components/Tasks/TasksList.vue";
import TheCalendar from "../components/TheCalendar.vue";
export default {
  components: {
    TasksList,
    TheCalendar,
  },
  data() {
    return {
      selectedDay: new Date(),
    };
  },
  methods: {
    setSelectedDay(day) {
      this.selectedDay = day;
    },
  },
};
</script>
