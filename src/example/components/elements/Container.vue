<template>
  <div class="container" :style="elementCSS">
    <slot />
  </div>
</template>

<script>
import Margin from './styleSettings/Margin.vue';
import Padding from './styleSettings/Padding.vue';
import Alignment from './styleSettings/Alignment.vue';
import Dimensions from './styleSettings/Dimensions.vue';
import elementStyleMixin from './elementStyleMixin';

export default {
  mixins: [elementStyleMixin],
  craft: {
    defaultProps: {
      elementStyle: {
        'margin-top': 0,
        'margin-left': 0,
        'margin-bottom': 0,
        'margin-right': 0,
        'padding-top': 30,
        'padding-left': 30,
        'padding-bottom': 30,
        'padding-right': 30,
        width: '100%',
        height: 'auto',
        'flex-direction': 'column',
        'justify-content': 'flex-start',
        'align-items': 'flex-start',
      },
    },
    addition: {
      settingComponents: {
        Dimensions,
        Alignment,
        Margin,
        Padding,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed rgb(22, 170, 238);
}
</style>
