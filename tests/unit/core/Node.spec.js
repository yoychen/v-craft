import Node from '@/core/Node';
import { createNode, createSecondLevelNode, createEditor } from '../helpers';

describe('setProps', () => {
  it('updates its props', () => {
    const node = createNode('node', { count: 0 });

    node.setProps({ count: 1 });

    expect(node.props.count).toBe(1);
  });
});

describe('makeOrphan', () => {
  it('is separated from its parent node', () => {
    const node = createSecondLevelNode();
    const { parent } = node;

    node.makeOrphan();

    expect(node.parent).toBe(null);
    expect(parent.children).toStrictEqual([]);
  });

  it('do nothing when its parent does not exist', () => {
    const node = createNode('node');

    node.makeOrphan();
  });
});

describe('setParent', () => {
  it('sets parent node when parent node is droppable', () => {
    const parent = createNode('parent');
    const node = createNode('node');

    parent.isDroppable = () => true;

    node.setParent(parent);

    expect(node.parent).toBe(parent);
    expect(parent.children).toEqual(expect.arrayContaining([node]));
  });

  it('throw error when parent node is not droppable', () => {
    const parent = createNode('parent');
    const node = createNode('node');

    parent.isDroppable = () => false;

    expect(() => node.setParent(parent)).toThrow();
  });

  it('calls makeOrphan() before sets parent node', () => {
    const parent = createNode('parent');
    const node = createNode('node');
    node.makeOrphan = jest.fn();

    parent.isDroppable = () => true;

    node.setParent(parent);

    expect(node.makeOrphan.mock.calls.length).toBe(1);
  });
});

describe('inCanvas', () => {
  it('returns true when it is in the Canvas', () => {
    const node = createSecondLevelNode();
    node.parent.isCanvas = () => true;

    const inCanvas = node.inCanvas();

    expect(inCanvas).toBe(true);
  });

  it('returns true when it is in the Canvas', () => {
    const node = createSecondLevelNode();
    node.parent.isCanvas = () => false;

    const inCanvas = node.inCanvas();

    expect(inCanvas).toBe(false);
  });
});

describe('isDraggable', () => {
  it('returns true when rule does not exist and inCanvas() returns true', () => {
    const node = createNode('node');
    node.inCanvas = () => true;

    const isDraggable = node.isDraggable();

    expect(isDraggable).toBe(true);
  });

  it('returns true when rule is passed', () => {
    const node = createNode('node');
    node.inCanvas = () => true;
    node.rules.canDrag = () => true;

    const isDraggable = node.isDraggable();

    expect(isDraggable).toBe(true);
  });

  it('returns false when rule is not passed', () => {
    const node = createNode('node');
    node.inCanvas = () => true;
    node.rules.canDrag = () => false;

    const isDraggable = node.isDraggable();

    expect(isDraggable).toBe(false);
  });

  it('returns false when inCanvas() returns false', () => {
    const node = createNode('node');
    node.inCanvas = () => false;

    const isDraggable = node.isDraggable();

    expect(isDraggable).toBe(false);
  });
});

describe('isAncestor', () => {
  it('returns true when the target node is its ancestry', () => {
    const node = createSecondLevelNode();
    const { parent } = node;

    const isAncestor = node.isAncestor(parent);

    expect(isAncestor).toBe(true);
  });

  it('returns true when the target node is its ancestry', () => {
    const node = createNode();
    const target = createNode();

    const isAncestor = node.isAncestor(target);

    expect(isAncestor).toBe(false);
  });
});

describe('isDroppable', () => {
  it('returns true when rule does not exist', () => {
    const node = createNode('Canvas');
    const target = createSecondLevelNode();
    node.isAncestor = () => false;

    const isDroppable = node.isDroppable(target);

    expect(isDroppable).toBe(true);
  });

  it('returns false when its component name is not Canvas', () => {
    const node = createNode('node');

    const isDroppable = node.isDroppable();

    expect(isDroppable).toBe(false);
  });

  it('returns true when rule is passed', () => {
    const node = createNode('Canvas');
    const target = createNode();
    node.isAncestor = () => false;
    node.rules.canMoveIn = () => true;

    const isDroppable = node.isDroppable(target);

    expect(isDroppable).toBe(true);
  });

  it('returns false when rule is not passed', () => {
    const node = createNode('Canvas');
    const target = createNode();
    node.isAncestor = () => false;
    node.rules.canMoveIn = () => false;

    const isDroppable = node.isDroppable(target);

    expect(isDroppable).toBe(false);
  });

  it('returns false when the incomming node is ancestry', () => {
    const node = createNode('Canvas');
    const target = createNode();
    node.isAncestor = () => true;

    const isDroppable = node.isDroppable(target);

    expect(isDroppable).toBe(false);
  });

  it('returns false when the incomming node is itself', () => {
    const node = createNode('Canvas');

    const isDroppable = node.isDroppable(node);

    expect(isDroppable).toBe(false);
  });

  it('returns false when the result of canMoveOut() of the incomming node\'s parent is false', () => {
    const node = createNode('Canvas');
    const target = createSecondLevelNode();
    node.isAncestor = () => false;
    target.parent.rules.canMoveOut = () => false;

    const isDroppable = node.isDroppable(target);

    expect(isDroppable).toBe(false);
  });
});

describe('isCanvas', () => {
  it('returns true when its componemt name is Canvas', () => {
    const node = createNode('Canvas');

    const isCanvas = node.isCanvas();

    expect(isCanvas).toBe(true);
  });

  it('returns false when its component name is not Canvas', () => {
    const node = createNode('node');

    const isCanvas = node.isCanvas();

    expect(isCanvas).toBe(false);
  });
});

describe('append', () => {
  it('adds the incomming node into its children when it is droppable', () => {
    const node = createNode();
    const incommingNode = createNode();

    node.isDroppable = () => true;

    node.append(incommingNode);

    expect(node.children).toEqual(expect.arrayContaining([incommingNode]));
    expect(incommingNode.parent).toEqual(node);
  });

  it('calls makeOrphan() of the incomming node when adds the incomming node into its children', () => {
    const node = createNode();
    const incommingNode = createNode();

    node.isDroppable = () => true;

    incommingNode.makeOrphan = jest.fn();

    node.append(incommingNode);

    expect(incommingNode.makeOrphan.mock.calls.length).toBe(1);
  });

  it('throws error when it is not droppable', () => {
    const node = createNode();
    const incommingNode = createNode();

    node.isDroppable = () => false;

    expect(() => node.append(incommingNode)).toThrow();

    expect(node.children).not.toEqual(expect.arrayContaining([incommingNode]));
    expect(incommingNode.parent).not.toEqual(node);
  });
});

describe('prepend', () => {
  it('prepends the incomming node into its children when it is droppable', () => {
    const node = createNode();
    node.children = [createNode(), createNode()];
    const incommingNode = createNode();

    node.isDroppable = () => true;

    node.prepend(incommingNode);

    expect(node.children.length).toEqual(3);
    expect(node.children[0]).toEqual(incommingNode);
    expect(incommingNode.parent).toEqual(node);
  });

  it('calls makeOrphan() of the incomming node when prepends the incomming node into its children', () => {
    const node = createNode();
    const incommingNode = createNode();

    node.isDroppable = () => true;

    incommingNode.makeOrphan = jest.fn();

    node.prepend(incommingNode);

    expect(incommingNode.makeOrphan.mock.calls.length).toBe(1);
  });

  it('throws error when it is not droppable', () => {
    const node = createNode();
    const incommingNode = createNode();

    node.isDroppable = () => false;

    expect(() => node.prepend(incommingNode)).toThrow();

    expect(node.children).not.toEqual(expect.arrayContaining([incommingNode]));
    expect(incommingNode.parent).not.toEqual(node);
  });
});

describe('canBeSibling', () => {
  it('returns false when the parent of the target node does not exist', () => {
    const node = createNode();
    const targetNode = createNode();

    const canBeSibling = node.canBeSibling(targetNode);

    expect(canBeSibling).toBe(false);
  });

  it('returns false when the parent of the target node is not droppable', () => {
    const node = createNode();
    const targetNode = createSecondLevelNode();
    targetNode.parent.isDroppable = () => false;

    const canBeSibling = node.canBeSibling(targetNode);

    expect(canBeSibling).toBe(false);
  });

  it('returns false when the target node is itself', () => {
    const node = createSecondLevelNode();
    const targetNode = node;
    targetNode.parent.isDroppable = () => true;

    const canBeSibling = node.canBeSibling(targetNode);

    expect(canBeSibling).toBe(false);
  });
});

describe('insertBefore', () => {
  it('is moved to the place in front of the target node', () => {
    const node = createNode();
    const targetNode = createSecondLevelNode();
    const parentOfTargetNode = targetNode.parent;
    node.canBeSibling = () => true;

    node.insertBefore(targetNode);

    expect(parentOfTargetNode.children).toEqual([node, targetNode]);
    expect(node.parent).toEqual(parentOfTargetNode);
  });

  it('called makeOrphan() before it is moved', () => {
    const node = createNode();
    const targetNode = createSecondLevelNode();
    node.canBeSibling = () => true;

    node.makeOrphan = jest.fn();

    node.insertBefore(targetNode);

    expect(node.makeOrphan.mock.calls.length).toEqual(1);
  });

  it('throws error when the return value of canBeSibling() is false', () => {
    const node = createNode();
    const targetNode = createSecondLevelNode();

    node.canBeSibling = () => false;

    expect(() => node.insertBefore(targetNode)).toThrow();
  });
});

describe('insertAfter', () => {
  it('is moved to the place in front of the target node', () => {
    const node = createNode();
    const targetNode = createSecondLevelNode();
    const parentOfTargetNode = targetNode.parent;
    node.canBeSibling = () => true;

    node.insertAfter(targetNode);

    expect(parentOfTargetNode.children).toEqual([targetNode, node]);
    expect(node.parent).toEqual(parentOfTargetNode);
  });

  it('called makeOrphan() before it is moved', () => {
    const node = createNode();
    const targetNode = createSecondLevelNode();
    node.canBeSibling = () => true;

    node.makeOrphan = jest.fn();

    node.insertAfter(targetNode);

    expect(node.makeOrphan.mock.calls.length).toEqual(1);
  });

  it('throws error when the return value of canBeSibling() is false', () => {
    const node = createNode();
    const targetNode = createSecondLevelNode();

    node.canBeSibling = () => false;

    expect(() => node.insertAfter(targetNode)).toThrow();
  });
});

describe('serialize', () => {
  it('serializes itself to plain object', () => {
    const expectedData = {
      componentName: 'Counter',
      props: { amount: 1 },
      children: [],
      uuid: '123',
      addition: { additionalConfigKey: 'additionalConfigValue' },
    };

    const node = createNode();
    Object.assign(node, expectedData);

    const data = node.serialize();

    expect(data).toStrictEqual(expectedData);
  });
});

describe('unserialize', () => {
  const createNodeData = () => ({
    componentName: 'Counter',
    props: { amount: 1 },
    children: [],
    uuid: '123',
    addition: { additionalConfigKey: 'additionalConfigValue' },
  });

  it('unserializes inputed plain object to Node', () => {
    const nodeData = createNodeData();

    const editor = createEditor();
    editor.getCraftConfig = () => ({});
    const parent = createNode();

    const node = Node.unserialize(editor, nodeData, parent);

    expect(node).toMatchObject(nodeData);
    expect(node.parent).toEqual(parent);
  });

  it('extracts rules from craft config and assigns into Node', () => {
    const nodeData = createNodeData();

    const editor = createEditor();
    const rules = {
      canDrag: () => {},
      canMoveIn: () => {},
      canMoveOut: () => {},
    };
    editor.getCraftConfig = () => ({
      rules,
    });

    const node = Node.unserialize(editor, nodeData);

    expect(node.rules).toEqual(rules);
  });
});

describe('duplicate', () => {
  it('returns new node instance with different uuid', () => {
    const node = createSecondLevelNode().parent;

    const duplicatedNode = node.duplicate();

    expect(duplicatedNode.uuid).not.toBe(node.uuid);
  });

  it('returns new node instance with deep cloned props and addition', () => {
    const node = createSecondLevelNode().parent;

    const duplicatedNode = node.duplicate();

    expect(duplicatedNode.props).not.toBe(node.props);
    expect(duplicatedNode.props).toMatchObject(node.props);

    expect(duplicatedNode.addition).not.toBe(node.addition);
    expect(duplicatedNode.addition).toMatchObject(node.addition);
  });

  it('copies its children', () => {
    const node = createSecondLevelNode().parent;

    const duplicatedNode = node.duplicate();

    expect(duplicatedNode.children.length).toBe(node.children.length);
  });
});
