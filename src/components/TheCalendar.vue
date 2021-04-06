<template>
  <section class="calendar">
    <h1>{{ monthName }} {{ year }}</h1>
    <section
      class="calendar__body"
      @scroll="simulateInfiniteScroll()"
      ref="calendar"
    >
      <!-- the first loop renders "empy" cells -->
      <!-- <div v-for="cell in firstWeekdayOfMonth" :key="cell"></div> -->
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
    <nav class="calendar__navigation navigation">
      <div class="navigation__buttons">
        <button @click="showPreviousMonth">Prev</button>
        <button @click="showNextMonth">Next</button>
      </div>
      <div class="navigation__jump-to">
        <span>Jump to</span>
        <select name="month" id="month" v-model="month">
          <option v-for="(month, idx) in monthsList" :key="idx" :value="idx">
            {{ month }}
          </option>
        </select>
        <select name="year" id="year" v-model="year">
          <!-- remove 2000 magic number -->
          <option
            v-for="(year, idx) in availableYears"
            :key="idx"
            :value="year + 2000"
          >
            {{ year + 2000 }}
          </option>
        </select>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
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
        // console.log(new Date(date))
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
      // const selectedElement = this.$refs[selected.toDateString()];
      // console.log(selectedElement);
      // selectedElement.scrollIntoView({ inline: 'nearest', block: 'nearest'});
      console.log(selected);
      this.$emit("select-day", selected);
    },
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
.calendar {
  max-width: 90%;

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
