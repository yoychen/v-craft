import createNodeFromVNode from '@/utils/createNodeFromVNode';
import { createNode } from '../helpers';

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
    const componentName = 'Counter';
    const props = { amount: 1 };
    const vnode = createVNodeStub(componentName, props);

    const node = createNodeFromVNode(vnode);

    expect(node.componentName).toBe(componentName);
    expect(node.props).toBe(props);
  });

  it('returns null when componentInstance of VNode instance is null', () => {
    const vnode = createNgVNodeStub();

    const node = createNodeFromVNode(vnode);

    expect(node).toBe(null);
  });

  it('recursively creates child Node instances from slots of VNode', () => {
    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      createVNodeStub(),
    ]);

    const node = createNodeFromVNode(vnode);

    expect(node.children.length).toBe(2);
  });

  it('filters off null when recursively creates child Node instances from slots of VNode', () => {
    const ngVNode = createNgVNodeStub();
    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      ngVNode,
    ]);

    const node = createNodeFromVNode(vnode);

    expect(node.children.length).toBe(1);
  });

  it('sets parent of Node instance when given', () => {
    const vnode = createVNodeStub();
    const parentNode = createNode();

    const node = createNodeFromVNode(vnode, parentNode);

    expect(node.parent).toBe(parentNode);
  });

  it('sets parents of child Node instances when recursively creates them from slots of VNode', () => {
    const vnode = createVNodeStub('div', {}, [
      createVNodeStub(),
      createVNodeStub(),
    ]);

    const node = createNodeFromVNode(vnode);

    node.children.forEach((child) => {
      expect(child.parent).toBe(node);
    });
  });
});
