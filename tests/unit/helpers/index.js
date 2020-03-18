import sinon from 'sinon';
import Node from '@/core/Node';
import Editor from '@/core/Editor';
import Indicator from '@/core/Indicator';

export const createNode = (componentName = 'node') => new Node(componentName);

export const createSecondLevelNode = () => {
  const node = createNode();
  const parent = createNode();
  node.parent = parent;
  parent.children = [node];

  return node;
};

export const createEditor = (nodes = [], resolverMap = {}) => new Editor(nodes, resolverMap);

export const createNodeMap = (amount) => {
  const nodeMap = {};

  for (let i = 0; i < amount; i += 1) {
    const node = createNode();
    nodeMap[node.uuid] = node;
  }

  return nodeMap;
};

export const createIndicator = () => new Indicator();

export const createFakeEditor = () => {
  const fakeEditor = sinon.createStubInstance(Editor);
  fakeEditor.nodes = [];
  fakeEditor.findResolver = () => 'div';
  fakeEditor.indicator = sinon.createStubInstance(Indicator);
  fakeEditor.draggedNode = sinon.createStubInstance(Node);

  return fakeEditor;
};
