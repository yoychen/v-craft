<template>
  <div class="sidebar" :class="{ disable: !this.editor.enabled }">
    <Blueprint :component="ElementBlock" icon="crop_square">
      <template v-slot:blueprint>
        <Canvas component='Container' />
      </template>
    </Blueprint>

    <Blueprint :component="ElementBlock" icon="title">
      <template v-slot:blueprint>
        <Heading />
      </template>
    </Blueprint>

    <Blueprint :component="ElementBlock" icon="notes">
      <template v-slot:blueprint>
        <Paragraph />
      </template>
    </Blueprint>

    <Blueprint :component="ElementBlock" icon="crop_original">
      <template v-slot:blueprint>
        <Picture />
      </template>
    </Blueprint>

    <Blueprint :component="ElementBlock" icon="view_carousel">
      <template v-slot:blueprint>
        <Carousel />
      </template>
    </Blueprint>

    <Blueprint :component="ElementBlock" icon="view_column">
      <template v-slot:blueprint>
        <Canvas component='Container' v-bind="rowProps">
          <Canvas component='Container' />
          <Canvas component='Container' />
          <Canvas component='Container' />
        </Canvas>
      </template>
    </Blueprint>
  </div>
</template>

<script>
import { Blueprint, Canvas } from '@';
import ElementBlock from './ElementBlock.vue';
import Paragraph from './elements/Paragraph.vue';
import Heading from './elements/Heading.vue';
import Picture from './elements/Picture.vue';
import Carousel from './elements/Carousel.vue';
import Container from './elements/Container.vue';

export default {
  components: {
    Blueprint, Canvas, Paragraph, Heading, Picture, Carousel,
  },
  inject: [
    'editor',
  ],
  data() {
    return {
      ElementBlock,
      rowProps: {
        elementStyle: {
          ...Container.craft.defaultProps.elementStyle,
          'flex-direction': 'row',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../app.scss';

.sidebar {
  position: absolute;
  top: $navbar-height;
  left: 0;
  bottom: 0;
  width: $element-sidebar-width;
  padding: 10px 0;
  overflow: auto;
  background-color: $color-black;

  transition: 0.2s transform;
  transition-timing-function: ease-in-out;
  &.disable {
    transform: translateX(-100%);
  }

  @include scrollbar();
}
</style>
