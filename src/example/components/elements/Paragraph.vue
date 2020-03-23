<template>
  <p
    :class="{ 'node-selected': nodeState.isSelected }"
    :style="elementCSS"
  >{{ content }}</p>
</template>

<script>
import ParagraphSetting from './ParagraphSetting.vue';
import Typography from './styleSettings/Typography.vue';
import Margin from './styleSettings/Margin.vue';
import Padding from './styleSettings/Padding.vue';
import elementStyleMixin from './elementStyleMixin';

export default {
  mixins: [elementStyleMixin],
  props: {
    content: String,
    nodeState: Object,
  },
  inject: [
    'editor',
  ],
  craft: {
    defaultProps: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices non orci nec eleifend. Sed scelerisque lobortis neque eget feugiat. Curabitur ullamcorper ex at porttitor mollis. Curabitur varius lorem nisl, non egestas leo feugiat at. Curabitur volutpat sagittis arcu, ut blandit velit sagittis vel. Vivamus erat mauris, mattis a neque vel, pretium varius ipsum. Phasellus non mauris in dolor luctus suscipit vel ac massa. Sed fringilla lorem sed metus bibendum faucibus. Pellentesque ipsum mauris, auctor ut varius at, aliquam sed quam. Nullam fringilla felis at odio convallis mattis.',
      elementStyle: {
        'font-size': 14,
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
      },
    },
    addition: {
      settingComponents: {
        Properties: ParagraphSetting,
        Typography,
        Margin,
        Padding,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  width: 100%;
  box-sizing: border-box;
  white-space: pre-wrap;
}
</style>
