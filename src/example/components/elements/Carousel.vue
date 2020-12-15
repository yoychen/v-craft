<template>
  <el-carousel
    :height="`${height}px`"
    :interval="interval"
    :style="elementCSS"
  >
    <el-carousel-item
      v-for="(slide, index) in slides"
      :key="index"
      :style="{ 'background-image': `url('${slide.background}')` }"
    >
      <div class="content">
        <Editor
          tag="h3"
          class="title"
          v-model="slide.title"
          ></Editor>
        <Editor
          tag="h4"
          class="subtitle"
          v-model="slide.subtitle"
          ></Editor>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import CarouselSetting from './CarouselSetting.vue';
import Margin from './styleSettings/Margin.vue';
import Decoration from './styleSettings/Decoration.vue';
import Editor from './utils/Editor.vue';
import elementStyleMixin from './elementStyleMixin';
import defaultImageUrl from './assets/default_carousel_image.jpg';
import defaultImageUrl2 from './assets/default_carousel_image2.jpg';

export default {
  mixins: [elementStyleMixin],
  components: { Editor },
  props: {
    height: Number,
    interval: Number,
    slides: Array,
  },
  craft: {
    defaultProps: {
      height: 300,
      interval: 3000,
      slides: [
        {
          title: 'Lorem Ipsum Dolor Sit Amet',
          subtitle: 'Curabitur varius lorem nisl, non egestas leo feugiat at.',
          background: defaultImageUrl,
        },
        {
          title: 'Lorem Ipsum Dolor Sit Amet',
          subtitle: 'Curabitur varius lorem nisl, non egestas leo feugiat at.',
          background: defaultImageUrl2,
        },
      ],
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
      Properties: CarouselSetting,
      Margin,
      Decoration,
    },
  },
};
</script>

<style lang="scss" scope>
.el-carousel {
  width: 100%;

  .el-carousel__item {
    background-size: cover;
    background-position: center;
  }

  .content {
    position: absolute;
    bottom: 1.5em;
    left: 2em;
    padding: 20px;
    background: #16191982;
    .title {
      margin: 0;
      font-size: 24px;
      color: white;
      text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.65);
    }
    .subtitle {
      margin: 12px 0 0 0;
      color: rgba(255, 255, 255, 0.88);
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
