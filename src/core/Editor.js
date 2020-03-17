import Indicator from './Indicator';

class Editor {
  constructor(nodes = [], resolverMap) {
    this.nodeMap = {};
    this.selectedNode = null;
    this.draggedNode = null;
    this.resolverMap = resolverMap;
    this.indicator = new Indicator();

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
}

export default Editor;
