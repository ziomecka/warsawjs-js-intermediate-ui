import { dom } from 'common';
import { store } from 'store';

class Sort {
  selector = '#radioContainer';

  init = () => {
    store.subscribe('sortBy', this.clear);

    return dom.add({
      event: 'change',
      listener: ({ target: { value } }) => this.listener(value),
      selector: this.selector,
    });
  };

  listener = async (value) => {
    store.setState('sortBy', value);
  };

  clear = (value) => {
    if (value) {
      return;
    }

    const checkedElement = Array.from(
      this.container.querySelectorAll('input'),
    ).find(({ checked }) => checked);

    if (checkedElement) {
      checkedElement.checked = false;
    }
  };

  get container() {
    return document.querySelector(this.selector);
  }
}

export const sort = new Sort();
