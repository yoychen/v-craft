<template>
  <img
    class="image"
    :src="imageUrl"
    :class="{ 'node-selected': nodeState.isSelected }"
    :style="elementCSS"
  />
</template>

<script>
import PictureSetting from './PictureSetting.vue';
import Margin from './styleSettings/Margin.vue';
import elementStyleMixin from './elementStyleMixin';

export default {
  mixins: [elementStyleMixin],
  props: {
    imageUrl: String,
    nodeState: Object,
  },
  craft: {
    defaultProps: {
      imageUrl: 'https://i.picsum.photos/id/419/500/400.jpg',
      elementStyle: {
        'margin-top': 0,
        'margin-left': 0,
        'margin-bottom': 0,
        'margin-right': 0,
      },
    },
    addition: {
      settingComponents: {
        Properties: PictureSetting,
        Margin,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  max-width: 100%;
}
</style>
