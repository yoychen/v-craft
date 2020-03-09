import {
  createNode, createSecondLevelNode, createEditor, createNodeMap,
} from '../helpers';

describe('findNode', () => {
  it('finds the node by the uuid of the node', () => {
    const editor = createEditor();
    editor.nodeMap = createNodeMap(5);

    const target = createNode();
    editor.nodeMap[target.uuid] = target;

    const node = editor.findNode(target.uuid);

    expect(node).toEqual(target);
  });
});

describe('setTopLevelNodes', () => {
  it('sets top level nodes', () => {
    const editor = createEditor();
    const nodes = [
      createNode(),
      createNode(),
      createNode(),
    ];

    editor.setTopLevelNodes(nodes);

    expect(editor.nodes).toEqual(nodes);
  });

  it('initializes node map when sets new nodes', () => {
    const editor = createEditor();
    const nodes = [
      createNode(),
      createNode(),
      createSecondLevelNode().parent,
    ];

    editor.setTopLevelNodes(nodes);

    expect(Object.keys(editor.nodeMap).length).toEqual(4);
  });
});

describe('selectNode', () => {
  it('sets selectedNode attribute', () => {
    const editor = createEditor();
    const node = createNode();

    editor.selectNode(node);

    expect(editor.selectedNode).toEqual(node);
  });
});

describe('dragNode', () => {
  it('sets draggedNode attribute', () => {
    const editor = createEditor();
    const node = createNode();

    editor.dragNode(node);

    expect(editor.draggedNode).toEqual(node);
  });
});

describe('findResolver', () => {
  it('finds the resolver by the name of the resolver', () => {
    const editor = createEditor();
    editor.resolverMap = {
      Heading: { name: 'Heading' },
      Card: { name: 'Card' },
      Button: { name: 'Button' },
    };

    const component = editor.findResolver('Card');

    expect(component).toEqual(editor.resolverMap.Card);
  });
});

describe('createNodeFromVNode', () => {
  function createVNodeStub(tag = 'div', props = {}, defaultSlots = null) {
    return {
      componentInstance: {
        $props: props,
        $slots: {
          default: defaultSlots,
        },
      },
      componentOptions: {
        tag,
      },
    };
  }

  function createNgVNodeStub() {
    const ngVNode = createVNodeStub();
    ngVNode.componentInstance = null;

    return ngVNode;
  }

  it('creates Node instance from VNode instance', () => {
    const editor = createEditor();

    const componentName = 'Counter';
    const props = { amount: 1 };
    const vnode = createVNodeStub(componentName, props);

    const node = editor.createNodeFromVNode(vnode);

    expect(node.componentName).toBe(componentName);
    expect(node.props).toBe(props);
  });

  it('returns null when componentInstance of VNode instance is null', () => {
    const editor = createEditor();

    const vnode = createNgVNodeStub();

    const node = editor.createNodeFromVNode(vnode);

    expect(node).toBe(null);
  });

  it('recursively creates child Node instances from slots of VNode', () => {
    const editor = createEditor();

    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      createVNodeStub(),
    ]);

    const node = editor.createNodeFromVNode(vnode);

    expect(node.children.length).toBe(2);
  });

  it('filters off null when recursively creates child Node instances from slots of VNode', () => {
    const editor = createEditor();

    const ngVNode = createNgVNodeStub();
    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      ngVNode,
    ]);

    const node = editor.createNodeFromVNode(vnode);

    expect(node.children.length).toBe(1);
  });

  it('sets parent of Node instance when given', () => {
    const editor = createEditor();

    const vnode = createVNodeStub();
    const parentNode = createNode();

    const node = editor.createNodeFromVNode(vnode, parentNode);

    expect(node.parent).toBe(parentNode);
  });

  it('sets parents of child Node instances when recursively creates them from slots of VNode', () => {
    const editor = createEditor();

    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      createVNodeStub(),
    ]);

    const node = editor.createNodeFromVNode(vnode);

    node.children.forEach((child) => {
      expect(child.parent).toBe(node);
    });
  });
});
