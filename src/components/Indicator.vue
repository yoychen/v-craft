<template>
  <div
    class="indicator"
    :class="{ forbidden: this.indicator.isForbidden }"
    :style="getIndicatorStyle()"
  />
</template>

<script>
import Indicator from '../core/Indicator';

export default {
  props: {
    indicator: Indicator,
  },
  methods: {
    getIndicatorStyle() {
      const { top, left } = this.indicator.position;
      const { width, height } = this.indicator.size;

      const { scrollTop } = document.querySelector('html');

      const style = {
        top: `${top - scrollTop}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`,
      };

      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.indicator {
  position: fixed;
  background-color: rgb(24, 255, 178);
  transition: all 0.3s;

  &.forbidden {
    background-color: rgb(255, 24, 93);
  }
}
</style>
