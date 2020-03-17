import { shallowMount } from '@vue/test-utils';
import EditorComponent from '@/components/Editor.vue';
import Editor from '@/core/Editor';

jest.mock('@/core/Editor.js');

function shallowMountEditor(props, defaultSlot = []) {
  return shallowMount(EditorComponent, {
    propsData: props,
    slots: {
      default: defaultSlot,
    },
  });
}

describe('initialization', () => {
  it('instantiates Editor object', () => {
    Editor.mock.instances = [];

    shallowMountEditor({
      component: 'div',
    });

    expect(Editor.mock.instances.length).toBe(1);
  });
});

describe('view', () => {
  it('renders root element by component prop', () => {
    const wrapper = shallowMountEditor({
      component: 'div',
    });
    expect(wrapper.contains('div')).toBe(true);
  });

  it('renders default slots into the root element', () => {
    const wrapper = shallowMountEditor({
      component: 'div',
    }, [
      '<span>content</span>',
    ]);
    expect(wrapper.contains('div span')).toBe(true);
  });
});
