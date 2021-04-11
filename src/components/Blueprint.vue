<template>
  <component
    :is="component"
    v-bind="$attrs"
    :draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @dragstart.native="handleDragStart"
    @dragend.native="handleDragEnd"
  >
    <slot></slot>
  </component>
</template>

<script>
import createNodeFromVNode from '../utils/createNodeFromVNode';

export default {
  props: {
    component: [Object, String],
  },
  inject: [
    'editor',
  ],
  created() {
    if (!this.editor) {
      throw new Error('<Blueprint/> must be wrapped with <Editor/>.');
    }
  },
  mounted() {
    if (!this.$slots.blueprint) {
      throw new Error('v-slot:blueprint is required.');
    }
    if (this.$slots.blueprint.length !== 1) {
      throw new Error('v-slot:blueprint must to have only one root element.');
    }
    if (!createNodeFromVNode(this.editor, this.$slots.blueprint[0])) {
      throw new Error('The element in v-slot:blueprint is not a valid vue component.');
    }
  },
  methods: {
    handleDragStart(event) {
      event.stopPropagation();

      const node = createNodeFromVNode(this.editor, this.$slots.blueprint[0]);
      this.editor.dragNode(node);
    },
    handleDragEnd(event) {
      event.stopPropagation();

      this.editor.dragNode(null);
      this.editor.indicator.hide();
    },
  },
};
</script>
