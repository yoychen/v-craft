function getPadding(e) {
  const {
    paddingTop, paddingLeft, paddingRight, paddingBottom,
  } = getComputedStyle(e);
  const padding = {
    paddingTop, paddingLeft, paddingRight, paddingBottom,
  };

  Object.keys(padding).forEach((key) => {
    padding[key] = parseInt(padding[key].slice(0, -2), 10);
  });

  return padding;
}

class Indicator {
  constructor(barSize = 2) {
    this.barSize = barSize;
    this.show = false;
    this.position = {
      top: 0,
      left: 0,
    };
    this.size = {
      width: 0,
      height: 0,
    };
    this.isForbidden = false;
  }

  hide() {
    this.show = false;
    this.isForbidden = false;
  }

  setIsForbidden(bool) {
    this.isForbidden = bool;
  }

  showIndicator() {
    this.show = true;
  }

  pointBefore(element) {
    this.showIndicator();

    const { top, left, height } = element.getBoundingClientRect();

    this.position.top = top;
    this.position.left = left;

    this.size.width = this.barSize;
    this.size.height = height;
  }

  pointAfter(element) {
    this.showIndicator();

    const {
      top, left, width, height,
    } = element.getBoundingClientRect();

    this.position.top = top;
    this.position.left = left + width;

    this.size.width = this.barSize;
    this.size.height = height;
  }

  pointInside(element) {
    this.showIndicator();

    const padding = getPadding(element);
    const {
      top, left, width, height,
    } = element.getBoundingClientRect();

    this.position.top = top + height - padding.paddingBottom;
    this.position.left = left + padding.paddingLeft;

    this.size.width = width - padding.paddingLeft - padding.paddingRight;
    this.size.height = this.barSize;
  }

  pointInsideTop(element) {
    this.showIndicator();

    const padding = getPadding(element);
    const {
      top, left, width,
    } = element.getBoundingClientRect();

    this.position.top = top + padding.paddingTop;
    this.position.left = left + padding.paddingLeft;

    this.size.width = width - padding.paddingLeft - padding.paddingRight;
    this.size.height = this.barSize;
  }
}

export default Indicator;
