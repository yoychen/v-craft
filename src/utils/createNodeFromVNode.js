import Node from '../core/Node';

function createNodeFromVNode(vnode, parentNode = null) {
  if (!vnode.componentInstance) {
    return null;
  }

  const componentName = vnode.componentOptions.tag;
  const props = vnode.componentInstance.$props;

  const node = new Node(componentName, props, parentNode);

  const defaultSlots = vnode.componentInstance.$slots.default;
  const children = defaultSlots
    ? defaultSlots
      .map((childVNode) => createNodeFromVNode(childVNode, node))
      .filter((childNode) => !!childNode)
    : [];
  node.children = children;

  return node;
}

export default createNodeFromVNode;
