import Node from '@/core/Node';

export const createNode = (componentName = 'node') => new Node(componentName);

export const createSecondLevelNode = () => {
  const node = createNode();
  const parent = createNode();
  node.parent = parent;
  parent.children = [node];

  return node;
};
