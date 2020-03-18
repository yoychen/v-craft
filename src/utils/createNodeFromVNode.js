import Node from '../core/Node';

function getCraftConfigFromResolver(resolver) {
  const config = {
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
  if (!vnode.componentOptions) {
    return null;
  }

  const componentName = vnode.componentOptions.tag;
  const props = vnode.componentOptions.propsData;

  const resolver = editor.findResolver(componentName);
  const { rules, addition } = getCraftConfigFromResolver(resolver);

  const node = new Node(componentName, props, parentNode, [], rules, addition);

  const vnodeChildren = vnode.componentOptions.children;
  const children = vnodeChildren
    ? vnodeChildren.map((childVNode) => createNodeFromVNode(editor, childVNode, node))
      .filter((childNode) => !!childNode)
    : [];
  node.children = children;

  return node;
}

export default createNodeFromVNode;
