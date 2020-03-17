import { shallowMount } from '@vue/test-utils';
import NodeComponent from '@/components/Node.vue';
import {
  createNode, createFakeEditor,
} from '../helpers';

function shallowMountNode(props, mocks) {
  const defaultProps = {
    node: createNode('div'),
  };

  const defaultMocks = {
    editor: createFakeEditor(),
  };

  return shallowMount(NodeComponent, {
    propsData: props || defaultProps,
    mocks: mocks || defaultMocks,
  });
}

describe('view', () => {
  it('renders root element by the result of findResolver() of editor', () => {
    const editor = createFakeEditor();
    editor.findResolver = () => 'header';

    const wrapper = shallowMountNode(null, { editor });

    expect(wrapper.contains('header')).toBe(true);
  });
});

describe('handling drag', () => {
  it('sets draggable attribute of the root element to true when the node is draggable', () => {
    const node = createNode();
    node.isDraggable = () => true;

    const wrapper = shallowMountNode({
      node,
    });

    expect(wrapper.element.draggable).toBe(true);
  });
});
