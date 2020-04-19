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

describe('setIsForbidden', () => {
  it('sets isForbidden attribute', () => {
    const indicator = createIndicator();

    indicator.setIsForbidden(true);

    expect(indicator.isForbidden).toBe(true);
  });
});

function createStubElement() {
  return {
    getBoundingClientRect: () => ({
      top: 50,
      left: 40,
      height: 200,
      width: 600,
    }),
  };
}

describe('pointBefore', () => {
  it('shows indicator on the left side of the element', () => {
    const indicator = createIndicator();
    const element = createStubElement();

    indicator.pointBefore(element);

    expect(indicator.show).toBe(true);
    expect(indicator.position).toStrictEqual({
      top: 50, // element.offsetTop
      left: 40, // element.offsetLeft
    });
    expect(indicator.size).toStrictEqual({
      width: 2,
      height: 200, // element.offsetHeight
    });
  });
});

describe('pointAfter', () => {
  it('shows indicator on the right side of the element', () => {
    const indicator = createIndicator();
    const element = createStubElement();

    indicator.pointAfter(element);

    expect(indicator.show).toBe(true);
    expect(indicator.position).toStrictEqual({
      top: 50, // element.offsetTop
      left: 640, // element.offsetLeft + element.offsetWidth
    });
    expect(indicator.size).toStrictEqual({
      width: 2,
      height: 200, // element.offsetHeight
    });
  });
});

function stubGetComputedStyle(style) {
  const defaultStyle = {
    paddingTop: '2px',
    paddingLeft: '20px',
    paddingRight: '25px',
    paddingBottom: '15px',
  };
  jest.spyOn(global, 'getComputedStyle').mockImplementation(
    () => style || defaultStyle,
  );
}

afterEach(() => {
  if (global.getComputedStyle.mockRestore) {
    global.getComputedStyle.mockRestore();
  }
});

describe('pointInside', () => {
  it('shows indicator on the bottom of the content of the element', () => {
    const indicator = createIndicator();
    const element = createStubElement();
    stubGetComputedStyle();

    indicator.pointInside(element);

    expect(indicator.show).toBe(true);
    expect(indicator.position).toStrictEqual({
      top: 235, // element.offsetTop + element.offsetHeight - element.paddingBottom
      left: 60, // element.offsetLeft + element.paddingLeft
    });
    expect(indicator.size).toStrictEqual({
      width: 555, // element.offsetWidth - element.paddingLeft - element.paddingRight
      height: 2,
    });
  });
});

describe('pointInsideTop', () => {
  it('shows indicator on the top of the content of the element', () => {
    const indicator = createIndicator();
    const element = createStubElement();
    stubGetComputedStyle();

    indicator.pointInsideTop(element);

    expect(indicator.show).toBe(true);
    expect(indicator.position).toStrictEqual({
      top: 52, // element.offsetTop + element.paddingTop
      left: 60, // element.offsetLeft + element.paddingLeft
    });
    expect(indicator.size).toStrictEqual({
      width: 555, // element.offsetWidth - element.paddingLeft - element.paddingRight
      height: 2,
    });
  });
});
