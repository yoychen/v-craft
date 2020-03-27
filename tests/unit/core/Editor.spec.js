import {
  createNode, createSecondLevelNode, createEditor, createNodeMap,
} from '../helpers';

describe('findNode', () => {
  it('finds the node by the uuid of the node', () => {
    const editor = createEditor();
    editor.nodeMap = createNodeMap(5);

    const target = createNode();
    editor.nodeMap[target.uuid] = target;

    const node = editor.findNode(target.uuid);

    expect(node).toEqual(target);
  });
});

describe('setTopLevelNodes', () => {
  it('sets top level nodes', () => {
    const editor = createEditor();
    const nodes = [
      createNode(),
      createNode(),
      createNode(),
    ];

    editor.setTopLevelNodes(nodes);

    expect(editor.nodes).toEqual(nodes);
  });

  it('initializes node map when sets new nodes', () => {
    const editor = createEditor();
    const nodes = [
      createNode(),
      createNode(),
      createSecondLevelNode().parent,
    ];

    editor.setTopLevelNodes(nodes);

    expect(Object.keys(editor.nodeMap).length).toEqual(4);
  });
});

describe('selectNode', () => {
  it('sets selectedNode attribute', () => {
    const editor = createEditor();
    const node = createNode();

    editor.selectNode(node);

    expect(editor.selectedNode).toEqual(node);
  });
});

describe('dragNode', () => {
  it('sets draggedNode attribute', () => {
    const editor = createEditor();
    const node = createNode();

    editor.dragNode(node);

    expect(editor.draggedNode).toEqual(node);
  });
});

describe('findResolver', () => {
  it('finds the resolver by the name of the resolver', () => {
    const resolverMap = {
      Heading: { name: 'Heading' },
      Card: { name: 'Card' },
      Button: { name: 'Button' },
    };
    const editor = createEditor([], resolverMap);

    const component = editor.findResolver('Card');

    expect(component).toEqual(resolverMap.Card);
  });
});

describe('removeNode', () => {
  it('calls makeOrphan() of the node paramenter', () => {
    const editor = createEditor();
    const node = createNode();
    node.makeOrphan = jest.fn();

    editor.removeNode(node);

    expect(node.makeOrphan.mock.calls.length).toEqual(1);
  });

  it('sets the selectedNode attribute to null when the selectedNode attribute is equal to the node paramenter', () => {
    const editor = createEditor();
    const node = createNode();
    node.makeOrphan = jest.fn();
    editor.selectNode(node);

    editor.removeNode(node);

    expect(editor.selectedNode).toEqual(null);
  });
});
