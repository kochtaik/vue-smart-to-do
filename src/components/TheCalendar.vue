<template>
  <section class="calendar">
    <h1>{{ monthName }} {{ year }}</h1>
    <section class="calendar__heading">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </section>
    <section class="calendar__body">
      <!-- the first loop renders "empy" cells -->
      <div v-for="cell in firstWeekdayOfMonth" :key="cell"></div>
      <div
        v-for="(day, idx) in daysInMonth"
        :key="idx"
        @click="selectDay(day)"
        class="day"
        :class="{ 'day--active': selectedDay === day }"
      >
        {{ day }}
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

<style lang="scss" scoped>
.calendar {
  max-width: 50%;
  &__heading,
  &__body {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.5em;
    .day {
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

<script>
// сделать ивент эмиттер, передающий данные о дне в родительский компонент;
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
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstWeekdayOfMonth() {
      const weekday = new Date(this.year, this.month, 1).getDay();
      return weekday === 0 ? 7 - 1 : weekday - 1;
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
      const dateObj = new Date(this.year, this.month, selected);
      this.$emit("select-day", dateObj);
      console.log(dateObj);
    },
  },
};
</script>
