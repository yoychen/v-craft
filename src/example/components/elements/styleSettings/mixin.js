import { settingMixin } from '@';

export default {
  mixins: [settingMixin],
  methods: {
    styleExist(name) {
      return this.elementProps.elementStyle[name] !== undefined;
    },
    getStyle(name) {
      return this.elementProps.elementStyle[name];
    },
    setStyle(name, value) {
      this.elementPropsSetter({
        elementStyle: {
          ...this.elementProps.elementStyle,
          [name]: value,
        },
      });
    },
  },
};
