<template>
  <div class="container" :class="{ outline: editor.enabled }" :style="elementCSS">
    <slot />
  </div>
</template>

<script>
import Margin from './styleSettings/Margin.vue';
import Padding from './styleSettings/Padding.vue';
import Alignment from './styleSettings/Alignment.vue';
import Dimensions from './styleSettings/Dimensions.vue';
import Decoration from './styleSettings/Decoration.vue';
import Background from './styleSettings/Background.vue';
import elementStyleMixin from './elementStyleMixin';

export default {
  mixins: [elementStyleMixin],
  inject: [
    'editor',
  ],
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
        'border-radius': 0,
        'box-shadow': {
          x: 0,
          y: 0,
          blur: 0,
          spread: 0,
          color: 'rgba(0,0,0,0)',
        },
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'background-attachment': 'scroll',
      },
    },
    settings: {
      Dimensions,
      Alignment,
      Margin,
      Padding,
      Decoration,
      Background,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &.outline {
    outline: 1px dashed rgb(22, 170, 238);
  }
}
</style>
