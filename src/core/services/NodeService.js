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

  onLeftHelf({ clientX }) {
    const { left, width } = this.getElementBoundingClientRect();

    if (clientX < (left + (width / 2))) {
      return true;
    }

    return false;
  }

  onEdge({ clientX, clientY }, edgeThickness = 8) {
    const {
      top, left, width, height,
    } = this.getElementBoundingClientRect();

    const { scrollTop } = document.querySelector('html');
    const clientTop = top - scrollTop;

    if (
      clientX < (left + width - edgeThickness)
      && clientX > (left + edgeThickness)
      && clientY > (clientTop + edgeThickness)
      && clientY < (clientTop + height - edgeThickness)
    ) {
      return false;
    }

    return true;
  }

  handleElementDragOver(cursor) {
    const editor = this.getEditor();

    editor.indicator.setIsForbidden(!editor.draggedNode.canBeSibling(this.getCurrentNode()));

    if (this.onLeftHelf(cursor)) {
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
    } else {
      editor.indicator.setIsForbidden(!this.getCurrentNode().isDroppable(editor.draggedNode));
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

    if (this.onLeftHelf(cursor)) {
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

    if (currentNode.isDroppable(draggedNode)) {
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
