class NodeService {
  constructor(vm) {
    this.vm = vm;
  }

  getElement() {
    return this.vm.$el;
  }

  getElementBoundingClientRect() {
    return this.vm.$el.getBoundingClientRect();
  }

  getEditor() {
    return this.vm.editor;
  }

  getCurrentNode() {
    return this.vm.node;
  }

  onLeftHalf({ clientX }) {
    const { left, width } = this.getElementBoundingClientRect();

    if (clientX < (left + (width / 2))) {
      return true;
    }

    return false;
  }

  onTopHalf({ clientY }) {
    const { top, height } = this.getElementBoundingClientRect();

    if (clientY < (top + (height / 2))) {
      return true;
    }

    return false;
  }

  onEdge({ clientX, clientY }, edgeThickness = 8) {
    const {
      top, left, width, height,
    } = this.getElementBoundingClientRect();

    if (
      clientX < (left + width - edgeThickness)
      && clientX > (left + edgeThickness)
      && clientY > (top + edgeThickness)
      && clientY < (top + height - edgeThickness)
    ) {
      return false;
    }

    return true;
  }

  handleElementDragOver(cursor) {
    const editor = this.getEditor();

    editor.indicator.setIsForbidden(!editor.draggedNode.canBeSibling(this.getCurrentNode()));

    if (this.onLeftHalf(cursor)) {
      editor.indicator.pointBefore(this.getElement());
    } else {
      editor.indicator.pointAfter(this.getElement());
    }
  }

  handleCanvasDragOver(cursor) {
    const editor = this.getEditor();
    const { clientX, clientY } = cursor;

    if (this.onEdge({ clientX, clientY })) {
      this.handleElementDragOver(cursor);
      return;
    }

    editor.indicator.setIsForbidden(!this.getCurrentNode().isDroppable(editor.draggedNode));
    if (this.onTopHalf(cursor)) {
      editor.indicator.pointInsideTop(this.getElement());
    } else {
      editor.indicator.pointInside(this.getElement());
    }
  }

  handleDragOver(cursor) {
    if (this.getCurrentNode().isCanvas()) {
      this.handleCanvasDragOver(cursor);
    } else {
      this.handleElementDragOver(cursor);
    }
  }

  handleElementDrop(cursor) {
    const currentNode = this.getCurrentNode();
    const { draggedNode } = this.getEditor();

    if (!draggedNode.canBeSibling(currentNode)) {
      return;
    }

    if (this.onLeftHalf(cursor)) {
      draggedNode.insertBefore(currentNode);
    } else {
      draggedNode.insertAfter(currentNode);
    }
  }

  handleCanvasDrop(cursor) {
    const currentNode = this.getCurrentNode();
    const { draggedNode } = this.getEditor();

    if (this.onEdge(cursor)) {
      this.handleElementDrop(cursor);
      return;
    }

    if (!currentNode.isDroppable(draggedNode)) {
      return;
    }

    if (this.onTopHalf(cursor)) {
      currentNode.prepend(draggedNode);
    } else {
      currentNode.append(draggedNode);
    }
  }

  handleDrop(cursor) {
    const currentNode = this.getCurrentNode();
    const editor = this.getEditor();

    if (currentNode.isCanvas()) {
      this.handleCanvasDrop(cursor);
    } else {
      this.handleElementDrop(cursor);
    }

    editor.dragNode(null);
    editor.indicator.hide();
  }
}

export default NodeService;
