import NodeService from '@/core/services/NodeService';
import {
  createNode, createFakeEditor,
} from '../../helpers';

function createFakeElement() {
  return {
    getBoundingClientRect: () => ({
      height: 200,
      width: 200,
      left: 200,
      top: 200,
    }),
  };
}

function createNodeService() {
  const node = createNode();
  const editor = createFakeEditor();
  const element = createFakeElement();
  const vm = {
    node, editor, $el: element,
  };

  return new NodeService(vm);
}

function createCursor(x, y) {
  return {
    clientX: x,
    clientY: y,
  };
}

describe('onLeftHalf', () => {
  it('returns true when the cursor is on the left hand of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(250, 300);

    const onLeftHalf = nodeService.onLeftHalf(cursor);

    expect(onLeftHalf).toBe(true);
  });

  it('returns false when the cursor is not on the left hand of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(301, 300);

    const onLeftHalf = nodeService.onLeftHalf(cursor);

    expect(onLeftHalf).toBe(false);
  });
});

describe('onTopHalf', () => {
  it('returns true when the cursor is on the top half of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(300, 250);

    const onTopHalf = nodeService.onTopHalf(cursor);

    expect(onTopHalf).toBe(true);
  });

  it('returns false when the cursor is not on the top half of element', () => {
    const nodeService = createNodeService();
    const cursor = createCursor(300, 301);

    const onTopHalf = nodeService.onTopHalf(cursor);

    expect(onTopHalf).toBe(false);
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

  it('calls pointInside() when the cursor is not on the edge of element and not on the top half of element', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.onTopHalf = () => false;
    nodeService.getEditor().indicator.pointInside = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDragOver(cursor);

    expect(nodeService.getEditor().indicator.pointInside.mock.calls.length).toBe(1);
  });

  it('calls pointInsideTop() when the cursor is not on the edge of element and on the top half of element', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.onTopHalf = () => true;
    nodeService.getEditor().indicator.pointInsideTop = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDragOver(cursor);

    expect(nodeService.getEditor().indicator.pointInsideTop.mock.calls.length).toBe(1);
  });
});

describe('handleElementDragOver', () => {
  it('calls pointBefore() when the cursor is on the left hand of element', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHalf = () => true;
    nodeService.getEditor().indicator.pointBefore = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDragOver(cursor);

    expect(nodeService.getEditor().indicator.pointBefore.mock.calls.length).toBe(1);
  });

  it('calls pointAfter() when the cursor is not on the left hand of element', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHalf = () => false;
    nodeService.getEditor().indicator.pointAfter = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDragOver(cursor);

    expect(nodeService.getEditor().indicator.pointAfter.mock.calls.length).toBe(1);
  });
});

describe('handleElementDrop', () => {
  it('calls insertBefore() when the cursor is on the left hand of element and the target node is allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHalf = () => true;
    nodeService.getEditor().draggedNode.canBeSibling = () => true;
    nodeService.getEditor().draggedNode.insertBefore = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.getEditor().draggedNode.insertBefore.mock.calls.length).toBe(1);
  });

  it('does not call insertBefore() when the cursor is on the left hand of element and the target node is not allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHalf = () => true;
    nodeService.getEditor().draggedNode.canBeSibling = () => false;
    nodeService.getEditor().draggedNode.insertBefore = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.getEditor().draggedNode.insertBefore.mock.calls.length).toBe(0);
  });

  it('calls insertAfter() when the cursor is not on the left hand of element and the target node is allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHalf = () => false;
    nodeService.getEditor().draggedNode.canBeSibling = () => true;
    nodeService.getEditor().draggedNode.insertAfter = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.getEditor().draggedNode.insertAfter.mock.calls.length).toBe(1);
  });

  it('does not call insertAfter() when the cursor is not on the left hand of element and the target node is not allow to be inserted', () => {
    const nodeService = createNodeService();
    nodeService.onLeftHalf = () => false;
    nodeService.getEditor().draggedNode.canBeSibling = () => false;
    nodeService.getEditor().draggedNode.insertAfter = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleElementDrop(cursor);

    expect(nodeService.getEditor().draggedNode.insertAfter.mock.calls.length).toBe(0);
  });
});

describe('handleCanvasDrop', () => {
  it('calls append() when the cursor is not on the edge of element and not on the top half of element and the current node is droppable', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.onTopHalf = () => false;
    nodeService.getCurrentNode().isDroppable = () => true;
    nodeService.getCurrentNode().append = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDrop(cursor);

    expect(nodeService.getCurrentNode().append.mock.calls.length).toBe(1);
  });

  it('calls prepend() when the cursor is not on the edge of element and on the top half of element and the current node is droppable', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.onTopHalf = () => true;
    nodeService.getCurrentNode().isDroppable = () => true;
    nodeService.getCurrentNode().prepend = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDrop(cursor);

    expect(nodeService.getCurrentNode().prepend.mock.calls.length).toBe(1);
  });

  it('does nothing when the cursor is not on the edge of element and the current node is not droppable', () => {
    const nodeService = createNodeService();
    nodeService.onEdge = () => false;
    nodeService.getCurrentNode().isDroppable = () => false;
    nodeService.getCurrentNode().append = jest.fn();
    nodeService.getCurrentNode().prepend = jest.fn();
    const cursor = createCursor(210, 210);

    nodeService.handleCanvasDrop(cursor);

    expect(nodeService.getCurrentNode().append.mock.calls.length).toBe(0);
    expect(nodeService.getCurrentNode().prepend.mock.calls.length).toBe(0);
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
