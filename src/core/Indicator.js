class Indicator {
  constructor(barSize = 3) {
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

    this.position.top = element.offsetTop;
    this.position.left = element.offsetLeft;

    this.size.width = this.barSize;
    this.size.height = element.offsetHeight;
  }

  pointAfter(element) {
    this.showIndicator();

    this.position.top = element.offsetTop;
    this.position.left = element.offsetLeft + element.offsetWidth;

    this.size.width = this.barSize;
    this.size.height = element.offsetHeight;
  }

  pointInside(element) {
    this.showIndicator();

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

    const padding = getPadding(element);

    this.position.top = element.offsetTop + element.offsetHeight - padding.paddingBottom;
    this.position.left = element.offsetLeft + padding.paddingLeft;

    this.size.width = element.offsetWidth - padding.paddingLeft - padding.paddingRight;
    this.size.height = this.barSize;
  }
}

export default Indicator;
