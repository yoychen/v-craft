import Node from '../core/Node';

function getCraftConfigFromResolver(resolver) {
  const config = {
    defaultProps: {},
    rules: {},
    addition: {},
  };

  if (resolver.craft) {
    Object.keys(config).forEach((key) => {
      if (resolver.craft[key]) {
        config[key] = resolver.craft[key];
      }
    });
  }

  return config;
}

function createNodeFromVNode(editor, vnode, parentNode = null) {
  if (!vnode.componentInstance) {
    return null;
  }

  const componentName = vnode.componentOptions.tag;
  const props = vnode.componentInstance.$props;

  const resolver = editor.findResolver(componentName);
  const { rules, addition } = getCraftConfigFromResolver(resolver);

  const node = new Node(componentName, props, parentNode, [], rules, addition);

  const defaultSlots = vnode.componentInstance.$slots.default;
  const children = defaultSlots
    ? defaultSlots
      .map((childVNode) => createNodeFromVNode(editor, childVNode, node))
      .filter((childNode) => !!childNode)
    : [];
  node.children = children;

  return node;
}

export default createNodeFromVNode;
