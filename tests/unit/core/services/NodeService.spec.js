import NodeService from '@/core/services/NodeService';
import {
  createNode, createFakeEditor,
} from '../../helpers';

function createFakeElement() {
  return {
    offsetHeight: 200,
    offsetWidth: 200,
    offsetLeft: 200,
    offsetTop: 200,
  };
}

function createNodeService() {
  const node = createNode();
  const editor = createFakeEditor();
  const element = createFakeElement();

  return new NodeService(node, editor, element);
}

function createCursor(x, y) {
  return {
    clientX: x,
    clientY: y,
  };
}

describe('onLeftHelf', () => {
  it('returns true when the cursor is on the left hand of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(250, 300);

    const onLeftHelf = nodeService.onLeftHelf(cursor);

    expect(onLeftHelf).toBe(true);
  });

  it('returns false when the cursor is not on the left hand of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(301, 300);

    const onLeftHelf = nodeService.onLeftHelf(cursor);

    expect(onLeftHelf).toBe(false);
  });
});

describe('onEdge', () => {
  it('returns true when the cursor is on the edge of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(205, 300);

    const onEdge = nodeService.onEdge(cursor, 5);

    expect(onEdge).toBe(true);
  });

  it('returns false when the cursor is not on the edge of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(210, 210);

    const onEdge = nodeService.onEdge(cursor, 5);

    expect(onEdge).toBe(false);
  });
});

describe('handleCanvasDragOver', () => {
  it('calls handleElementDragOver() when the cursor is on the edge of element', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => true;
    nodeService.handleElementDragOver = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDragOver(cursor);

    expect(nodeService.handleElementDragOver.mock.calls.length).toBe(1);
  });

  it('calls pointInside() when the cursor is not on the edge of element', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.editor.indicator.pointInside = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDragOver(cursor);

    expect(nodeService.editor.indicator.pointInside.mock.calls.length).toBe(1);
  });
});

describe('handleElementDragOver', () => {
  it('calls pointBefore() when the cursor is on the left hand of element', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHelf = () => true;
    nodeService.editor.indicator.pointBefore = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDragOver(cursor);

    expect(nodeService.editor.indicator.pointBefore.mock.calls.length).toBe(1);
  });

  it('calls pointAfter() when the cursor is not on the left hand of element', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHelf = () => false;
    nodeService.editor.indicator.pointAfter = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDragOver(cursor);

    expect(nodeService.editor.indicator.pointAfter.mock.calls.length).toBe(1);
  });
});

describe('handleElementDrop', () => {
  it('calls insertBefore() when the cursor is on the left hand of element and the target node is allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHelf = () => true;
    nodeService.editor.draggedNode.canBeSibling = () => true;
    nodeService.editor.draggedNode.insertBefore = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.editor.draggedNode.insertBefore.mock.calls.length).toBe(1);
  });

  it('does not call insertBefore() when the cursor is on the left hand of element and the target node is not allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHelf = () => true;
    nodeService.editor.draggedNode.canBeSibling = () => false;
    nodeService.editor.draggedNode.insertBefore = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.editor.draggedNode.insertBefore.mock.calls.length).toBe(0);
  });

  it('calls insertAfter() when the cursor is not on the left hand of element and the target node is allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHelf = () => false;
    nodeService.editor.draggedNode.canBeSibling = () => true;
    nodeService.editor.draggedNode.insertAfter = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.editor.draggedNode.insertAfter.mock.calls.length).toBe(1);
  });

  it('does not call insertAfter() when the cursor is not on the left hand of element and the target node is not allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHelf = () => false;
    nodeService.editor.draggedNode.canBeSibling = () => false;
    nodeService.editor.draggedNode.insertAfter = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.editor.draggedNode.insertAfter.mock.calls.length).toBe(0);
  });
});

describe('handleCanvasDrop', () => {
  it('calls append() when the cursor is not on the edge of element and the current node is droppable', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.currentNode.isDroppable = () => true;
    nodeService.currentNode.append = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDrop(cursor);

    expect(nodeService.currentNode.append.mock.calls.length).toBe(1);
  });

  it('does not call append() when the cursor is not on the edge of element and the current node is not droppable', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.currentNode.isDroppable = () => false;
    nodeService.currentNode.append = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDrop(cursor);

    expect(nodeService.currentNode.append.mock.calls.length).toBe(0);
  });

  it('calls handleElementDrop() when the cursor is on the edge of element', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => true;
    nodeService.handleElementDrop = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDrop(cursor);

    expect(nodeService.handleElementDrop.mock.calls.length).toBe(1);
  });
});
