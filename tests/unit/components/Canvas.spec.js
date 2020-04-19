import { shallowMount } from '@vue/test-utils';
import CanvasComponent from '@/components/Canvas.vue';
import {
  createFakeEditor,
} from '../helpers';

function shallowMountCanvas(props = {}, defaultSlot = [], mocks) {
  const defaultMocks = {
    editor: createFakeEditor(),
  };

  return shallowMount(CanvasComponent, {
    propsData: props,
    slots: {
      default: defaultSlot,
    },
    provide: mocks || defaultMocks,
  });
}

describe('view', () => {
  it('renders root element by the result of findResolver() of editor', () => {
    const editor = createFakeEditor();
    editor.findResolver = () => 'header';

    const wrapper = shallowMountCanvas({}, [], { editor });

    expect(wrapper.contains('header')).toBe(true);
  });

  it('renders default slots into the root element', () => {
    const editor = createFakeEditor();
    editor.findResolver = () => 'header';

    const wrapper = shallowMountCanvas({}, [
      '<span>content</span>',
    ], { editor });

    expect(wrapper.contains('header span')).toBe(true);
  });
});
