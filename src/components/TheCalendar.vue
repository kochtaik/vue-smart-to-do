<template>
  <section class="calendar">
    <h2 class="calendar__year-month year-month" @click="toggleDatePicker(true)">
      {{ monthName }}
      {{ year }}
    </h2>
    <section class="calendar__body" ref="calendar">
      <div class="calendar__body__shadow left-shadow"></div>
      <div
        v-for="(day, idx) in daysInMonth"
        :key="idx"
        :ref="day.toDateString()"
        @click="selectDay(day)"
        class="calendar__body__day day"
        :class="{ 'day--active': day.toDateString() === selectedDay }"
      >
        <span class="day__monthday">{{ day.getDate() }}</span>
        <span class="day__weekday">{{ getWeekday(day) }}</span>
        <div class="tasks-status">
          <span
            class="tasks-status__completed"
            v-show="getTasksStatusByDate(day)?.hasCompleted"
            title="This day has completed tasks"
          ></span>
          <span
            class="tasks-status__incompleted"
            v-show="getTasksStatusByDate(day)?.hasIncompleted"
            title="This day has incompleted tasks"
          ></span>
        </div>
      </div>
      <div class="calendar__body__shadow right-shadow"></div>
    </section>
    <nav class="calendar__navigation">
      <base-button @click="showPreviousMonth">Previous month</base-button>
      <base-button @click="showToday">Today</base-button>
      <base-button @click="showNextMonth">Next month</base-button>
    </nav>
    <date-picker
      v-show="isDatePickerShown"
      :monthsList="monthsList"
      @date-select="setMonthAndYear"
      @keyup.esc="toggleDatePicker(false)"
    ></date-picker>
    <div class="calendar__overlay" v-show="isDatePickerShown"></div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import DatePicker from "./UI/DatePicker.vue";
import { getDaysInMonth } from "../utils/calendarHelpers";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      monthsList: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      selectedDay: new Date().toDateString(),
      isDatePickerShown: false,
    };
  },

  computed: {
    ...mapState("taskModule", ["userTasks"]),
    ...mapGetters("taskModule", ["tasksByDate"]),

    monthName() {
      return this.monthsList[this.month];
    },

    daysInMonth() {
      return getDaysInMonth(this.month, this.year);
    },
  },

  methods: {
    showNextMonth() {
      const { calendar } = this.$refs;

      this.year = this.month === 11 ? this.year + 1 : this.year;
      this.month = (this.month + 1) % 12;
      this.selectedDay = null;
      calendar.scrollLeft = 0;
    },

    showPreviousMonth() {
      const { calendar } = this.$refs;

      this.year = this.month === 0 ? this.year - 1 : this.year;
      this.month = this.month === 0 ? 11 : this.month - 1;
      this.selectedDay = null;
      calendar.scrollLeft = calendar.scrollWidth;
    },

    showToday() {
      const today = new Date();
      this.month = today.getMonth();
      this.year = today.getFullYear();

      this.$nextTick(() => {
        const todayElem = this.$refs[today.toDateString()];
        todayElem.scrollIntoView({ inline: "center" });
        this.selectDay(today);
      });
    },

    selectDay(selected) {
      this.selectedDay = selected.toDateString();
      this.$emit("select-day", selected);
    },

    toggleDatePicker(isShown) {
      const bodyEl = document.body;

      bodyEl.style.overflowY = isShown ? "hidden" : "auto";
      this.isDatePickerShown = isShown;
    },

    setMonthAndYear(date) {
      const { month, year } = date;

      this.month = month;
      this.year = year;
      this.toggleDatePicker(false);
    },

    getWeekday(date) {
      return this.weekdays[date.getDay()];
    },

    getTasksStatusByDate(date) {
      const tasksByDate = this.tasksByDate(date);
      if (!tasksByDate) return;

      return tasksByDate.reduce(
        (acc, [, task]) => {
          if (task.completed) acc.hasCompleted = true;
          if (!task.completed) acc.hasIncompleted = true;
          return acc;
        },
        { hasCompleted: false, hasIncompleted: false }
      );
    },
  },
  mounted() {
    this.$nextTick(() => this.showToday());
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.calendar {
  width: 100%;
  margin: 1em 0;

  &__year-month {
    font-size: 1.5em;
    font-weight: 700;
    margin: 0.5em 0 1.3em 1em;
  }

  &__body {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(1, minmax(0, 1fr));
    gap: 0.5em;
    margin: 1em 0;
    padding: 0 0.5em;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &__shadow {
      position: sticky;
      width: 4.2em;
      height: 4.2em;
      pointer-events: none;
    }

    .right-shadow {
      right: -5%;
      background-image: linear-gradient(
        to left,
        white 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    .left-shadow {
      left: -5%;
      background-image: linear-gradient(
        to right,
        white 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    .day {
      width: 4.2em;
      height: 4.2em;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      border: 1px solid $base-gray;
      border-radius: 20%;
      font-weight: 700;

      cursor: pointer;

      &--active {
        border: 1px solid $selection;
        color: $selection;
      }

      .tasks-status {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 30%;

        span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        &__completed {
          background: $base-blue;
        }
        &__incompleted {
          background: $red-alert;
        }
      }
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    height: 120vh;
    background: $base-blue;
  }

  &__navigation {
    margin: 1.3em 0.5em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      background: $base-blue;
      color: $dark-contrast;
    }
  }
}
</style>
