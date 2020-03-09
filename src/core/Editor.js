import Node from '@/core/Node';

class Editor {
  constructor(nodes = [], resolverMap) {
    this.nodeMap = {};
    this.selectedNode = null;
    this.draggedNode = null;
    this.resolverMap = resolverMap;

    this.setTopLevelNodes(nodes);
  }

  initializeNodeMap(nodes) {
    nodes.forEach((node) => {
      this.nodeMap[node.uuid] = node;
      this.initializeNodeMap(node.children);
    });
  }

  setTopLevelNodes(nodes) {
    this.nodes = nodes;
    this.initializeNodeMap(nodes);
  }

  findNode(uuid) {
    return this.nodeMap[uuid];
  }

  selectNode(node) {
    this.selectedNode = node;
  }

  dragNode(node) {
    this.draggedNode = node;
  }

  findResolver(name) {
    return this.resolverMap[name];
  }

  createNodeFromVNode(vnode, parentNode = null) {
    if (!vnode.componentInstance) {
      return null;
    }

    const componentName = vnode.componentOptions.tag;
    const props = vnode.componentInstance.$props;

    const node = new Node(componentName, props, parentNode);

    const defaultSlots = vnode.componentInstance.$slots.default;
    const children = defaultSlots
      ? defaultSlots
        .map((childVnode) => this.createNodeFromVNode(childVnode, node))
        .filter((childNode) => !!childNode)
      : [];
    node.children = children;

    return node;
  }
}

export default Editor;
