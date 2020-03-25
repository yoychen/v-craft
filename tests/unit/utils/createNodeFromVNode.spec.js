import createNodeFromVNode from '@/utils/createNodeFromVNode';
import { createNode, createFakeEditor } from '../helpers';

describe('createNodeFromVNode', () => {
  function createVNodeStub(tag = 'div', props = {}, children = null) {
    return {
      data: {},
      componentOptions: {
        tag,
        propsData: props,
        children,
      },
    };
  }

  function createNgVNodeStub() {
    const ngVNode = createVNodeStub();
    ngVNode.componentOptions = null;

    return ngVNode;
  }

  let editor;
  let resolver;

  beforeEach(() => {
    editor = createFakeEditor();
    resolver = {
      craft: {
        rules: {
          canMoveIn: () => {},
          canMoveOut: () => {},
          canDrag: () => {},
        },
        addition: {},
        defaultProps: {},
      },
    };
    editor.findResolver = () => resolver;
  });

  it('creates Node instance from VNode instance', () => {
    const componentName = 'Counter';
    const props = { amount: 1 };
    const vnode = createVNodeStub(componentName, props);

    const node = createNodeFromVNode(editor, vnode);

    expect(node.componentName).toBe(componentName);
    expect(node.props).toStrictEqual(props);
    expect(node.rules).toStrictEqual(resolver.craft.rules);
    expect(node.addition).toStrictEqual(resolver.craft.addition);
  });

  it('creates Node instance whose props is the Union of the component\'s default props and VNode\'s props', () => {
    const componentName = 'Counter';
    const props = { amount: 1 };
    const vnode = createVNodeStub(componentName, props);

    resolver.craft.defaultProps = {
      amount: 0,
      color: 'green',
    };

    const node = createNodeFromVNode(editor, vnode);

    expect(node.props).toStrictEqual({
      amount: 1,
      color: 'green',
    });
  });

  test('the Node\'s props is the Union of the component\'s default props and the VNode\'s attrs when the component\'s name is Canvas', () => {
    const componentName = 'Canvas';
    const vnode = createVNodeStub(componentName);
    vnode.data.attrs = {
      amount: 1,
    };

    resolver.craft.defaultProps = {
      amount: 0,
      color: 'green',
    };

    const node = createNodeFromVNode(editor, vnode);

    expect(node.props).toStrictEqual({
      amount: 1,
      color: 'green',
    });
  });

  it('returns null when componentOptions of VNode instance is null', () => {
    const vnode = createNgVNodeStub();

    const node = createNodeFromVNode(editor, vnode);

    expect(node).toBe(null);
  });

  it('recursively creates child Node instances from slots of VNode', () => {
    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      createVNodeStub(),
    ]);

    const node = createNodeFromVNode(editor, vnode);

    expect(node.children.length).toBe(2);
  });

  it('filters off null when recursively creates child Node instances from slots of VNode', () => {
    const ngVNode = createNgVNodeStub();
    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      ngVNode,
    ]);

    const node = createNodeFromVNode(editor, vnode);

    expect(node.children.length).toBe(1);
  });

  it('sets parent of Node instance when given', () => {
    const vnode = createVNodeStub();
    const parentNode = createNode();

    const node = createNodeFromVNode(editor, vnode, parentNode);

    expect(node.parent).toBe(parentNode);
  });

  it('sets parents of child Node instances when recursively creates them from slots of VNode', () => {
    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      createVNodeStub(),
    ]);

    const node = createNodeFromVNode(editor, vnode);

    node.children.forEach((child) => {
      expect(child.parent).toBe(node);
    });
  });
});
