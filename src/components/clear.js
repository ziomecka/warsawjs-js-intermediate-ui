import { dom } from 'common';
import { store } from 'store';

class Clear {
  selector = '#clearButton';

  init = () =>
    dom.add({
      event: 'click',
      listener: this.listener,
      selector: this.selector,
    });

  listener = () => {
    store.setState('sortBy', null);
    store.setState('filterText', null);
  };
}

export const clear = new Clear();
