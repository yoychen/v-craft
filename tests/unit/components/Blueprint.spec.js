import { shallowMount } from '@vue/test-utils';
import BlueprintComponent from '@/components/Blueprint.vue';
import createNodeFromVNode from '@/utils/createNodeFromVNode';
import {
  createNode, createFakeEditor,
} from '../helpers';

jest.mock('@/utils/createNodeFromVNode.js');

beforeEach(() => {
  createNodeFromVNode.mockReturnValue(createNode());
});

function shallowMountBlueprint(props, defaultSlot = [], blueprintSlot = ['<span>content</span>'], mocks) {
  const defaultProps = {
    component: 'div',
  };

  const defaultMocks = {
    editor: createFakeEditor(),
  };

  return shallowMount(BlueprintComponent, {
    propsData: props || defaultProps,
    slots: {
      default: defaultSlot,
      blueprint: blueprintSlot,
    },
    mocks: mocks || defaultMocks,
  });
}

describe('initialization', () => {
  it('throws error when v-slot:blueprint has more then one element', () => {
    expect(() => {
      shallowMountBlueprint(null, [], [
        '<span>content</span>',
        '<span>content</span>',
      ]);
    }).toThrow();
  });

  it('throws error when the element in v-slot:blueprint is not a valid vue component', () => {
    createNodeFromVNode.mockReturnValue(null);

    expect(() => {
      shallowMountBlueprint();
    }).toThrow();
  });
});

describe('view', () => {
  it('renders root element by component prop', () => {
    const wrapper = shallowMountBlueprint({
      component: 'div',
    });
    expect(wrapper.contains('div')).toBe(true);
  });

  it('renders default slots into the root element', () => {
    const wrapper = shallowMountBlueprint({
      component: 'div',
    }, [
      '<span>content</span>',
    ]);
    expect(wrapper.contains('div span')).toBe(true);
  });
});
