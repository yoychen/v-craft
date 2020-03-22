export default {
  props: {
    elementStyle: Object,
  },
  computed: {
    elementCSS() {
      const style = {};

      Object.entries(this.elementStyle).forEach(([key, value]) => {
        if (typeof value === 'number') {
          style[key] = `${value}px`;
        } else {
          style[key] = value;
        }
      });

      return style;
    },
  },
};
