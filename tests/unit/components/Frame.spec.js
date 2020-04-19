import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import FrameComponent from '@/components/Frame.vue';
import createNodeFromVNode from '@/utils/createNodeFromVNode';
import {
  createNode, createFakeEditor,
} from '../helpers';

jest.mock('@/utils/createNodeFromVNode.js');
createNodeFromVNode.mockReturnValue(createNode());

function shallowMountFrame(props, defaultSlot = [], mocks) {
  const defaultMocks = {
    editor: createFakeEditor(),
  };

  return shallowMount(FrameComponent, {
    propsData: props,
    slots: {
      default: defaultSlot,
    },
    provide: mocks || defaultMocks,
  });
}

describe('initialization', () => {
  it('converts default slots to Node instants and calls setTopLevelNodes() of editor', () => {
    const editor = createFakeEditor();
    editor.setTopLevelNodes = jest.fn();

    shallowMountFrame({
      component: 'div',
    }, [], { editor });

    expect(editor.setTopLevelNodes.mock.calls.length).toBe(1);
  });
});

describe('view', () => {
  it('renders root element by component prop', () => {
    const wrapper = shallowMountFrame({
      component: 'div',
    });
    expect(wrapper.contains('div')).toBe(true);
  });

  it('renders top level nodes', () => {
    const editor = createFakeEditor();
    editor.nodes = [
      createNode(),
      createNode(),
      createNode(),
    ];

    const wrapper = shallowMountFrame({
      component: 'div',
    }, [], { editor });
    expect(wrapper.vm.$children.length).toBe(4); // contains <Indicator />
  });

  it('hides default slots after mounted life cycle', async () => {
    const wrapper = shallowMountFrame({
      component: 'div',
    }, [
      '<span>content</span>',
    ]);

    await Vue.nextTick();
    expect(wrapper.contains('div span')).toBe(false);
  });
});
