<template>
  <component :is="component">
    <slot v-if="showSlots"></slot>
    <Node
      v-for="(node, index) in editor.nodes" :key="index"
      :node="node"
    />
    <Indicator :indicator="editor.indicator" />
  </component>
</template>

<script>
import Node from './Node.vue';
import Indicator from './Indicator.vue';
import createNodeFromVNode from '../utils/createNodeFromVNode';

export default {
  components: {
    Node, Indicator,
  },
  props: {
    component: [Object, String],
  },
  inject: [
    'editor',
  ],
  data() {
    return {
      showSlots: true,
    };
  },
  created() {
    if (!this.editor) {
      throw new Error('<Frame/> must be wrapped with <Editor/>.');
    }
  },
  mounted() {
    const nodes = this.createNodesFromSlots();
    this.editor.setTopLevelNodes(this.editor.nodes.concat(nodes));
    this.showSlots = false;
  },
  methods: {
    createNodesFromSlots() {
      const defaultSlots = this.$slots.default || [];
      return defaultSlots
        .map((vnode) => createNodeFromVNode(vnode))
        .filter((node) => !!node);
    },
  },
};
</script>
