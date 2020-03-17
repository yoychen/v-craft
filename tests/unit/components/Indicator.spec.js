import { shallowMount } from '@vue/test-utils';
import IndicatorComponent from '@/components/Indicator.vue';

function createFakeIndicator() {
  return {
    position: {
      top: 20,
      left: 15,
    },
    size: {
      width: 200,
      height: 300,
    },
    isForbidden: false,
  };
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
  it('renders .indicator whose style is computed from indicator prop', async () => {
    document.querySelector = () => ({
      scrollTop: 15,
    });

    const wrapper = shallowMountIndicator();

    expect(wrapper.element.style.top).toBe('5px');
    expect(wrapper.element.style.left).toBe('15px');
    expect(wrapper.element.style.width).toBe('200px');
    expect(wrapper.element.style.height).toBe('300px');
  });

  it('adds forbidden css class in .indicator when isForbidden attribute of indicator prop is true', async () => {
    const indicator = createFakeIndicator();
    indicator.isForbidden = true;

    const wrapper = shallowMountIndicator({ indicator });

    expect(wrapper.contains('.forbidden')).toBe(true);
  });
});
