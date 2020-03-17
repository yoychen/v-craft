class NodeService {
  constructor(currentNode, editor, element) {
    this.currentNode = currentNode;
    this.editor = editor;
    this.element = element;
  }

  onLeftHelf({ clientX }) {
    const { offsetLeft, offsetWidth } = this.element;

    if (clientX < (offsetLeft + (offsetWidth / 2))) {
      return true;
    }

    return false;
  }

  onEdge({ clientX, clientY }, edgeThickness = 5) {
    const {
      offsetTop, offsetLeft, offsetWidth, offsetHeight,
    } = this.element;

    const { scrollTop } = document.querySelector('html');
    const clientTop = offsetTop - scrollTop;

    if (
      clientX < (offsetLeft + offsetWidth - edgeThickness)
      && clientX > (offsetLeft + edgeThickness)
      && clientY > (clientTop + edgeThickness)
      && clientY < (clientTop + offsetHeight - edgeThickness)
    ) {
      return false;
    }

    return true;
  }

  handleElementDragOver(cursor) {
    const { clientX } = cursor;

    this.editor.indicator.setIsForbidden(!this.editor.draggedNode.canBeSibling(this.currentNode));

    if (this.onLeftHelf(clientX)) {
      this.editor.indicator.pointBefore(this.element);
    } else {
      this.editor.indicator.pointAfter(this.element);
    }
  }

  handleCanvasDragOver(cursor) {
    const { clientX, clientY } = cursor;

    if (this.onEdge({ clientX, clientY })) {
      this.handleElementDragOver(cursor);
    } else {
      this.editor.indicator.setIsForbidden(!this.currentNode.isDroppable(this.editor.draggedNode));
      this.editor.indicator.pointInside(this.element);
    }
  }

  handleDragOver(cursor) {
    if (this.currentNode.isCanvas()) {
      this.handleCanvasDragOver(cursor);
    } else {
      this.handleElementDragOver(cursor);
    }
  }
}

export default NodeService;
