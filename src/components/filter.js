import { dom } from 'common';
import { store } from 'store';

class Filter {
  selector = '#filter-title';

  init = () => {
    store.subscribe('filter', this.clear);

    return dom.add({
      event: 'input',
      listener: ({ target: { value } }) => this.listener(value),
      selector: this.selector,
    });
  };

  listener = (value) => {
    store.setState('filter', { 'snippet.title': value });
  };

  clear = (filter) => {
    if (filter) {
      return;
    }

    const input = this.container;

    if (!input || !input.value) {
      return;
    }

    input.value = '';
  };

  get container() {
    return document.querySelector(this.selector);
  }
}

export const filter = new Filter();
