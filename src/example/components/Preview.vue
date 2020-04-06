<template>
  <div class="preview" :class="{ disable: !this.editor.enabled }">
    <Paper>
      <Frame component='div'>
        <Canvas component='Container' />
      </Frame>
    </Paper>
  </div>
</template>

<script>
import { Frame, Canvas } from '@';
import Paper from './Paper.vue';

export default {
  components: {
    Frame, Canvas, Paper,
  },
  inject: [
    'editor',
  ],
};
</script>

<style lang="scss" scoped>
@import '../app.scss';

.preview {
  position: absolute;
  top: $navbar-height;
  left: $element-sidebar-width;
  right: $setting-sidebar-width;
  bottom: 0;
  padding: 2em 3em;
  overflow: auto;

  transition: 0.2s left, 0.2s right;
  transition-timing-function: ease-in-out;
  &.disable {
    left: 0;
    right: 0;
  }

  @include scrollbar();
}
</style>
