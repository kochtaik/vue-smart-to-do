export class Scroll {
  constructor(element) {
    this.el = element;
    this.isOngoing = false;
  }

  detectScrollBoundary() {
    const { el } = this;
    // console.log('offsetWidth', el.offsetWidth, 'scrollLeft', el.scrollLeft, 'scrollWidth', el.scrollWidth)
    if (el.offsetWidth + el.scrollLeft >= el.scrollWidth) {
      return "scrollEnd";
    }

    if (el.scrollLeft === 0) {
      return "scrollStart";
    }
  }

  scrollBy(value) {
    const { el } = this;
    el.scrollLeft = value;
  }
}
