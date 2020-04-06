<template>
  <div
    v-if="this.indicator.show"
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

      const style = {
        top: `${top}px`,
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
  background-color: rgb(15, 177, 88);
  transition: all 0.3s;
  z-index: 1000;

  &.forbidden {
    background-color: rgb(255, 24, 93);
  }
}
</style>
