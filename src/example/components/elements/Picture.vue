<template>
  <img
    class="image"
    :src="imageUrl"
    :style="elementCSS"
  />
</template>

<script>
import PictureSetting from './PictureSetting.vue';
import Margin from './styleSettings/Margin.vue';
import Decoration from './styleSettings/Decoration.vue';
import elementStyleMixin from './elementStyleMixin';

export default {
  mixins: [elementStyleMixin],
  props: {
    imageUrl: String,
  },
  craft: {
    defaultProps: {
      imageUrl: 'https://i.picsum.photos/id/419/500/400.jpg',
      elementStyle: {
        'margin-top': 0,
        'margin-left': 0,
        'margin-bottom': 0,
        'margin-right': 0,
        'border-radius': 0,
        'box-shadow': {
          x: 0,
          y: 0,
          blur: 0,
          spread: 0,
          color: 'rgba(0,0,0,0)',
        },
      },
    },
    settingComponents: {
      Properties: PictureSetting,
      Margin,
      Decoration,
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  max-width: 100%;
}
</style>
