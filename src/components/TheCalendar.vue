<template>
  <section class="calendar">
    <h2 class="calendar__year-month year-month" @click="toggleDatePicker(true)">
      {{ monthName }}
      {{ year }}
    </h2>
    <section
      class="calendar__body"
      @scroll="simulateInfiniteScroll()"
      ref="calendar"
    >
      <div
        v-for="(day, idx) in daysInMonth"
        :key="idx"
        @click="selectDay(day)"
        class="calendar__body__day day"
        :class="{ 'day--active': selectedDay === day }"
      >
        <span class="day__monthday">{{ day.getDate() }}</span>
        <!-- Place weekdays computations into a separate comp. property -->
        <span class="day__weekday">{{ weekdays[day.getDay()] }}</span>
      </div>
    </section>
    <date-picker
      v-show="isDatePickerShown"
      :monthsList="monthsList"
      @date-select="setMonthAndYear"
    ></date-picker>
    <div class="calendar__overlay" v-show="isDatePickerShown"></div>
  </section>
</template>

<script>
import DatePicker from "./UI/DatePicker.vue";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      // is it OK to store static data like here?
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
      availableYears: 100,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      selectedDay: null,
      isDatePickerShown: false,
    };
  },
  computed: {
    monthName() {
      return this.monthsList[this.month];
    },
    daysInMonth() {
      const { month, year } = this;
      const date = new Date(year, month, 1);
      const days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    },
  },
  methods: {
    showNextMonth() {
      this.year = this.month === 11 ? this.year + 1 : this.year;
      this.month = (this.month + 1) % 12;
      this.selectedDay = null;
    },

    showPreviousMonth() {
      this.year = this.month === 0 ? this.year - 1 : this.year;
      this.month = this.month === 0 ? 11 : this.month - 1;
      this.selectedDay = null;
    },

    selectDay(selected) {
      this.selectedDay = selected;
      this.$emit("select-day", selected);
    },

    toggleDatePicker(isShown) {
      this.isDatePickerShown = isShown;
    },

    setMonthAndYear(date) {
      const { month, year } = date;
      this.month = month;
      this.year = year;
      this.toggleDatePicker(false);
    },

    // TODO: place scroll functions into a separate module

    simulateInfiniteScroll() {
      const { calendar } = this.$refs;
      const scrollBoundary = this.detectScrollBoundary();
      if (scrollBoundary === "scrollEnd") {
        this.showNextMonth();
        this.scrollCalendarBy(1);
      }
      if (scrollBoundary === "scrollStart") {
        this.showPreviousMonth();
        this.scrollCalendarBy(calendar.scrollWidth);
      }
    },

    detectScrollBoundary() {
      const { calendar } = this.$refs;
      // console.log('offsetWidth', calendar.offsetWidth, 'scrollLeft', calendar.scrollLeft, 'scrollWidth', calendar.scrollWidth)
      if (calendar.offsetWidth + calendar.scrollLeft >= calendar.scrollWidth) {
        return "scrollEnd";
      }

      if (calendar.scrollLeft === 0) {
        return "scrollStart";
      }
    },

    scrollCalendarBy(value) {
      const { calendar } = this.$refs;
      calendar.scrollLeft = value;
    },
  },
  mounted() {
    // this serves to the possibility
    // of initially scrolling calendar left
    // and rendering previous month.
    this.scrollCalendarBy(1);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.calendar {
  max-width: 95%;

  &__year-month {
    font-size: 1.5em;
    font-weight: 700;
  }

  &__body {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(1, minmax(0, 1fr));
    gap: 0.5em;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .day {
      width: 100px;
      height: 100px;
      font-size: 1.4em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      &--active {
        background: #4198d4;
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
    background: $base-blue;
  }

  .navigation {
    margin: 1em 0;
    &__buttons {
      margin: 0.5em 0;
      button {
        margin: 0 0.5em;
      }
    }
    &__jump-to > * {
      margin: 0 0.5em;
    }
  }
}
</style>
