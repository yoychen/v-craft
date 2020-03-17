<template>
  <component
    :is="editor.findResolver(node.componentName)"
    v-bind="node.props"
    :draggable="node.isDraggable()"
    @dragstart.native="handleDragStart"
    @dragover.native="handleDragOver"
    @drop.native="handleDrop"
    @dragend.native="handleDragEnd"
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
      nodeService: new NodeService(this),
    };
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
    handleDrop(event) {
      this.cancelDefault(event);

      this.nodeService.handleDrop({
        clientX: event.clientX,
        clientY: event.clientY,
      });
    },
    handleDragEnd(event) {
      event.stopPropagation();

      this.editor.dragNode(null);
      this.editor.indicator.hide();
    },
  },
};
</script>
