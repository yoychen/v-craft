import { shallowMount } from '@vue/test-utils';
import IndicatorComponent from '@/components/Indicator.vue';
import Indicator from '@/core/Indicator';

function createFakeIndicator() {
  const fakeIndicator = {
    position: {
      top: 20,
      left: 15,
    },
    size: {
      width: 200,
      height: 300,
    },
    isForbidden: false,
    show: true,
  };
  Object.setPrototypeOf(fakeIndicator, Indicator.prototype);

  return fakeIndicator;
}

function shallowMountIndicator(props) {
  const defaultProps = {
    indicator: createFakeIndicator(),
  };

  return shallowMount(IndicatorComponent, {
    propsData: props || defaultProps,
  });
}

describe('view', () => {
  it('renders .indicator whose style is computed from indicator prop', () => {
    const wrapper = shallowMountIndicator();

    expect(wrapper.element.style.top).toBe('20px');
    expect(wrapper.element.style.left).toBe('15px');
    expect(wrapper.element.style.width).toBe('200px');
    expect(wrapper.element.style.height).toBe('300px');
  });

  it('adds forbidden css class in .indicator when isForbidden attribute of indicator prop is true', () => {
    const indicator = createFakeIndicator();
    indicator.isForbidden = true;

    const wrapper = shallowMountIndicator({ indicator });

    expect(wrapper.contains('.forbidden')).toBe(true);
  });

  it('hides .indicator when show attribue of of indicator prop is false', () => {
    const indicator = createFakeIndicator();
    indicator.show = false;

    const wrapper = shallowMountIndicator({ indicator });

    expect(wrapper.contains('.indicator')).toBe(false);
  });
});
