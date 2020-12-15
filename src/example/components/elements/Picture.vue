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
import defaultImageUrl from './assets/default_picture_image.jpg';

export default {
  mixins: [elementStyleMixin],
  props: {
    imageUrl: String,
  },
  craft: {
    defaultProps: {
      imageUrl: defaultImageUrl,
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
    settings: {
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
