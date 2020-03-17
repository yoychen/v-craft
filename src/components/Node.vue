<template>
  <component
    :is="editor.findResolver(node.componentName)"
    v-bind="node.props"
    :draggable="node.isDraggable()"
    @dragstart.native="handleDragStart"
    @dragover.native="handleDragOver"
  >
    <Node
      v-for="(node, index) in node.children" :key="index"
      :node="node"
    />
  </component>
</template>

<script>
import Node from '../core/Node';
import NodeService from '../core/services/NodeService';

export default {
  name: 'Node',
  props: {
    node: Node,
  },
  inject: [
    'editor',
  ],
  data() {
    return {
      nodeService: null,
    };
  },
  mounted() {
    this.nodeService = new NodeService(this.node, this.editor, this.$el);
  },
  methods: {
    cancelDefault(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    handleDragStart(event) {
      event.stopPropagation();

      this.editor.dragNode(this.node);
    },
    handleDragOver(event) {
      this.cancelDefault(event);

      this.nodeService.handleDragOver({
        clientX: event.clientX,
        clientY: event.clientY,
      });
    },
  },
};
</script>
