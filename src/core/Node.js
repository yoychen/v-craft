import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

class Node {
  constructor(componentName, props = {}, parent = null, children = [], rules = {}, addition = {}) {
    this.componentName = componentName;
    this.props = props;
    this.parent = parent;
    this.children = children;
    this.rules = rules;
    this.addition = addition;
    this.uuid = uuidv4();
  }

  setProps(change) {
    this.props = { ...this.props, ...change };
  }

  makeOrphan() {
    const { parent } = this;

    if (!parent) {
      return;
    }

    const index = parent.children.indexOf(this);
    parent.children.splice(index, 1);
    this.parent = null;
  }

  setParent(parent) {
    if (!parent.isDroppable(this)) {
      throw new Error('Parent node is not droppable.');
    }

    this.makeOrphan();

    parent.children.push(this);
    this.parent = parent;
  }

  inCanvas() {
    let curentParent = this.parent;

    while (curentParent) {
      if (curentParent.isCanvas()) {
        return true;
      }
      curentParent = curentParent.parent;
    }

    return false;
  }

  isDraggable() {
    if (!this.inCanvas()) {
      return false;
    }

    if (this.rules.canDrag) {
      return this.rules.canDrag(this);
    }

    return true;
  }

  isAncestor(node) {
    let curentParent = this.parent;

    while (curentParent) {
      if (curentParent === node) {
        return true;
      }
      curentParent = curentParent.parent;
    }

    return false;
  }

  isDroppable(incommingNode) {
    if (!this.isCanvas()) {
      return false;
    }

    if (incommingNode === this) {
      return false;
    }

    if (incommingNode.parent
      && incommingNode.parent.rules.canMoveOut
      && !incommingNode.parent.rules.canMoveOut(incommingNode, incommingNode.parent)) {
      return false;
    }

    if (this.isAncestor(incommingNode)) {
      return false;
    }

    if (this.rules.canMoveIn) {
      return this.rules.canMoveIn(incommingNode, this);
    }

    return true;
  }

  isCanvas() {
    if (this.componentName === 'Canvas') {
      return true;
    }

    return false;
  }

  append(incommingNode) {
    if (!this.isDroppable(incommingNode)) {
      throw new Error(`${this.componentName} is not droppable with the incommingNode - ${incommingNode.componentName}.`);
    }

    incommingNode.makeOrphan();

    this.children.push(incommingNode);
    // eslint-disable-next-line no-param-reassign
    incommingNode.parent = this;
  }

  prepend(incommingNode) {
    if (!this.isDroppable(incommingNode)) {
      throw new Error(`${this.componentName} is not droppable with the incommingNode - ${incommingNode.componentName}.`);
    }

    incommingNode.makeOrphan();

    this.children.splice(0, 0, incommingNode);
    // eslint-disable-next-line no-param-reassign
    incommingNode.parent = this;
  }

  canBeSibling(targetNode) {
    if (targetNode === this) {
      return false;
    }

    if (!targetNode.parent) {
      return false;
    }

    return targetNode.parent.isDroppable(this);
  }

  insertBefore(targetNode) {
    if (!this.canBeSibling(targetNode)) {
      throw new Error('Can not be the sibling of the target node.');
    }

    this.makeOrphan();

    const parentOfTargetNode = targetNode.parent;
    const indexOfTargetNode = parentOfTargetNode.children.indexOf(targetNode);
    parentOfTargetNode.children.splice(indexOfTargetNode, 0, this);
    this.parent = parentOfTargetNode;
  }

  insertAfter(targetNode) {
    if (!this.canBeSibling(targetNode)) {
      throw new Error('Can not be the sibling of the target node.');
    }

    this.makeOrphan();

    const parentOfTargetNode = targetNode.parent;
    const indexOfTargetNode = parentOfTargetNode.children.indexOf(targetNode);
    parentOfTargetNode.children.splice(indexOfTargetNode + 1, 0, this);
    this.parent = parentOfTargetNode;
  }

  serialize() {
    return {
      componentName: this.componentName,
      props: this.props,
      children: this.children.map((node) => node.serialize()),
      addition: this.addition,
      uuid: this.uuid,
    };
  }

  duplicate() {
    return new Node(
      this.componentName,
      cloneDeep(this.props),
      null,
      this.children.map((node) => node.duplicate()),
      this.rules,
      cloneDeep(this.addition),
    );
  }
}

Node.unserialize = (editor, nodeData, parent = null) => {
  const node = new Node();
  Object.assign(node, nodeData);

  const craftConfig = editor.getCraftConfig(node);

  if (craftConfig.rules) {
    node.rules = craftConfig.rules;
  }

  node.parent = parent;
  node.children = nodeData.children.map((data) => Node.unserialize(editor, data, node));

  return node;
};

export default Node;
