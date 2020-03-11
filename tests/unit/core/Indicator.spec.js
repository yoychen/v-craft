import { createIndicator } from '../helpers';

describe('hide', () => {
  it('resets show and isForbidden attributes', () => {
    const indicator = createIndicator();
    indicator.show = true;
    indicator.isForbidden = true;

    indicator.hide();

    expect(indicator.show).toBe(false);
    expect(indicator.isForbidden).toBe(false);
  });
});

describe('setForbidden', () => {
  it('sets isForbidden attribute to true', () => {
    const indicator = createIndicator();

    indicator.setForbidden();

    expect(indicator.isForbidden).toBe(true);
  });
});

function createElementStub() {
  return {
    offsetTop: 50,
    offsetLeft: 40,
    offsetHeight: 200,
    offsetWidth: 600,
  };
}

describe('pointBefore', () => {
  it('shows indicator on the left side of the element', () => {
    const indicator = createIndicator();
    const element = createElementStub();

    indicator.pointBefore(element);

    expect(indicator.show).toBe(true);
    expect(indicator.position).toStrictEqual({
      top: 50, // element.offsetTop
      left: 40, // element.offsetLeft
    });
    expect(indicator.size).toStrictEqual({
      width: 3,
      height: 200, // element.offsetHeight
    });
  });
});

describe('pointAfter', () => {
  it('shows indicator on the right side of the element', () => {
    const indicator = createIndicator();
    const element = createElementStub();

    indicator.pointAfter(element);

    expect(indicator.show).toBe(true);
    expect(indicator.position).toStrictEqual({
      top: 50, // element.offsetTop
      left: 640, // element.offsetLeft + element.offsetWidth
    });
    expect(indicator.size).toStrictEqual({
      width: 3,
      height: 200, // element.offsetHeight
    });
  });
});

describe('pointInside', () => {
  it('shows indicator on the bottom of the content of the element', () => {
    const indicator = createIndicator();
    const element = createElementStub();

    const style = {
      paddingTop: '2px',
      paddingLeft: '20px',
      paddingRight: '25px',
      paddingBottom: '15px',
    };
    window.getComputedStyle = () => style;

    indicator.pointInside(element);

    expect(indicator.show).toBe(true);
    expect(indicator.position).toStrictEqual({
      top: 235, // element.offsetTop + element.offsetHeight - element.paddingBottom
      left: 60, // element.offsetLeft + element.paddingLeft
    });
    expect(indicator.size).toStrictEqual({
      width: 555, // element.offsetWidth - element.paddingLeft - element.paddingRight
      height: 3,
    });
  });
});
