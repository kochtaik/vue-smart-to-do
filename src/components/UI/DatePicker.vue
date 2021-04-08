<template>
  <section class="date-picker">
    <div class="date-picker__grid-containers grid-containers">
      <div class="grid-container months">
        <!-- TODO: reduce code repetition -->
        <div
          class="grid-container__cell"
          :class="{ 'grid-container__cell--active': date.month === monthIdx }"
          v-for="(monthName, monthIdx) in monthsList"
          :key="monthIdx"
          @click="setMonth(monthIdx)"
        >
          <span class="grid-container__cell__content">{{ monthName }}</span>
        </div>
      </div>
      <div class="grid-container years">
        <div
          class="grid-container__cell"
          :class="{ 'grid-container__cell--active': date.year === year }"
          v-for="(year, idx) in years"
          :key="idx"
          @click="setYear(year)"
        >
          <span class="grid-container__cell__content">{{ year }}</span>
        </div>
      </div>
    </div>
    <base-button @click="setDate" class="date-picker__button">
      Set date
    </base-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      date: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
    };
  },

  props: {
    monthsList: {
      type: Array,
      required: false,
    },
  },

  computed: {
    years() {
      const centuryBegin = 2000;
      const years = [];
      for (let year = centuryBegin; year < 2100; year += 1) {
        years.push(year);
      }
      return years;
    },
  },

  methods: {
    setMonth(month) {
      this.date.month = month;
    },

    setYear(year) {
      this.date.year = year;
    },

    setDate() {
      this.$emit("date-select", this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.date-picker {
  width: 95%;
  position: fixed;
  left: 50%;
  z-index: 30;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: $dark-contrast;

  &__grid-containers {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1em;

    .grid-container {
      height: 40vh;
      width: 50%;
      position: relative;
      display: grid;
      justify-items: center;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1em;
      z-index: 30;

      &__cell {
        cursor: pointer;
        padding: 0.2em 0.3em;
        border-radius: 7px;

        &__content {
          width: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        &--active {
          background: $selection;
        }
      }
    }

    .years {
      overflow-y: scroll;
    }
  }

  &__button {
    background: $dark-contrast;
    justify-self: center;
  }
}
</style>
