<template>
  <div class="sidebar">
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
  </div>
</template>

<script>
import Blueprint from '@/components/Blueprint.vue';
import Canvas from '@/components/Canvas.vue';
import ElementBlock from './ElementBlock.vue';
import Paragraph from './elements/Paragraph.vue';
import Heading from './elements/Heading.vue';
import Picture from './elements/Picture.vue';
import Carousel from './elements/Carousel.vue';

export default {
  components: {
    Blueprint, Canvas, Paragraph, Heading, Picture, Carousel,
  },
  data() {
    return {
      ElementBlock,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 60px;
  padding: 10px 0;
  overflow-y: auto;
  background-color: #171717;
}
</style>
