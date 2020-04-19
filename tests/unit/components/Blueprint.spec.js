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
    provide: mocks || defaultMocks,
  });
}

describe('initialization', () => {
  // Disable vue error log temporarily
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    global.console.error.mockRestore();
  });

  it('throws error when v-slot:blueprint has more then one element', () => {
    expect(() => {
      shallowMountBlueprint(null, [], [
        '<span>content</span>',
        '<span>content</span>',
      ]);
    }).toThrow(/must to have only one root element/);
  });

  it('throws error when the element in v-slot:blueprint is not a valid vue component', () => {
    createNodeFromVNode.mockReturnValue(null);

    expect(() => {
      shallowMountBlueprint();
    }).toThrow(/is not a valid vue component/);
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
