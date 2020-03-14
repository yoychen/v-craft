import Vue from 'vue';
import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import FrameComponent from '@/components/Frame.vue';
import Editor from '@/core/Editor';
import createNodeFromVNode from '@/utils/createNodeFromVNode';
import {
  createNode,
} from '../helpers';

jest.mock('@/utils/createNodeFromVNode.js');
createNodeFromVNode.mockReturnValue(createNode());

function createFakeEditor() {
  const fakeEditor = sinon.createStubInstance(Editor);
  fakeEditor.nodes = [];

  return fakeEditor;
}

function shallowMountFrame(props, defaultSlot = [], mocks) {
  const defaultMocks = {
    editor: createFakeEditor(),
  };

  return shallowMount(FrameComponent, {
    propsData: props,
    slots: {
      default: defaultSlot,
    },
    mocks: mocks || defaultMocks,
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

  it('sets showSlots attribute to false after called setTopLevelNodes() of editor', () => {
    const wrapper = shallowMountFrame({
      component: 'div',
    }, []);

    expect(wrapper.vm.showSlots).toBe(false);
  });
});

describe('view', () => {
  it('renders root element by component props', () => {
    const wrapper = shallowMountFrame({
      component: 'div',
    });
    expect(wrapper.contains('div')).toBe(true);
  });

  it('renders default slots into the root element', () => {
    const wrapper = shallowMountFrame({
      component: 'div',
    }, [
      '<span>content</span>',
    ]);
    expect(wrapper.contains('div span')).toBe(true);
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
    expect(wrapper.vm.$children.length).toBe(3);
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
