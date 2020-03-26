<template>
  <component
    :is="editor.findResolver(node.componentName)"
    v-bind="node.props"
    :class="{ 'cf-node-selected': isSelected }"
    :draggable="node.isDraggable()"
    @dragstart.native="handleDragStart"
    @dragover.native="handleDragOver"
    @drop.native="handleDrop"
    @dragend.native="handleDragEnd"
    @click.native="selectNode"
  >
    <Node
      v-for="node in node.children" :key="node.uuid"
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
  computed: {
    isSelected() {
      return this.node === this.editor.selectedNode;
    },
  },
  provide() {
    return {
      node: this.node,
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
    selectNode(event) {
      event.stopPropagation();

      this.editor.selectNode(this.node);
    },
  },
};
</script>
