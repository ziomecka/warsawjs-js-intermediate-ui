class Dom {
  validTags = [
    'a',
    'div',
    'figCaption',
    'figure',
    'img',
    'input',
    'label',
    'li',
    'p',
    'picture',
    'source',
    'span',
    'section',
    'summary',
  ];

  createElement = (attributes = {}, tag, textContent) => {
    if (!this.validTags.includes(tag)) {
      return null;
    }

    const element = document.createElement(tag);

    Object.keys(Object(attributes)).forEach((key) =>
      element.setAttribute(key, attributes[key]),
    );

    if (typeof textContent === 'string') {
      element.textContent = textContent;
    }

    return element;
  };

  add = (options) => {
    const { event, listener, selector } = options;

    const element = document.querySelector(selector);

    if (!element) {
      return null;
    }

    element.addEventListener(event, listener);

    return () => element.removeEventListener(event, listener);
  };
}

export const dom = new Dom();
