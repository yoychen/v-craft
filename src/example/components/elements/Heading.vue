<template>
  <Editor
    :tag="headingType"
    class="heading"
    :style="elementCSS"
    :value="content"
    @input="updateContent"
    ></Editor>
</template>

<script>
import HeadingSetting from './HeadingSetting.vue';
import Typography from './styleSettings/Typography.vue';
import Margin from './styleSettings/Margin.vue';
import Padding from './styleSettings/Padding.vue';
import Editor from './utils/Editor.vue';
import elementStyleMixin from './elementStyleMixin';

export default {
  mixins: [elementStyleMixin],
  components: { Editor },
  props: {
    headingType: String,
    content: String,
  },
  inject: [
    'node',
  ],
  methods: {
    updateContent(content) {
      this.node.setProps({ content });
    },
  },
  craft: {
    defaultProps: {
      headingType: 'h1',
      content: 'Lorem Ipsum Dolor Sit Amet',
      elementStyle: {
        'font-size': 24,
        'font-weight': 'normal',
        'text-align': 'left',
        color: 'rgb(0,0,0)',
        'margin-top': 0,
        'margin-left': 0,
        'margin-bottom': 0,
        'margin-right': 0,
        'padding-top': 0,
        'padding-left': 0,
        'padding-bottom': 0,
        'padding-right': 0,
        'text-shadow': {
          x: 0,
          y: 0,
          blur: 0,
          color: 'rgba(0,0,0,0)',
        },
      },
    },
    settings: {
      Properties: HeadingSetting,
      Typography,
      Margin,
      Padding,
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
  width: 100%;
  box-sizing: border-box;
}
</style>
