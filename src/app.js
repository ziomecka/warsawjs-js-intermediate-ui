import { api } from 'api';
import { sort, filter, clear, channels } from 'components';
import { store } from 'store';

class App {
  langDefault = 'en';

  init = async () => {
    store.init({
      channels: null,
      localized: null,
      orderBy: 'asc',
      sortBy: null,
      filter: null,
    });

    channels.init();
    sort.init();
    filter.init();
    clear.init();

    try {
      const res = await api.req('localized', { lang: this.langDefault });

      store.setState('localized', (await res.json())[this.langDefault]);
    } catch {
      store.setState('localized', null);
    }

    try {
      const res = await api.req('channels');

      const { channels } = await res.json();

      store.setState('channels', channels);
    } catch (err) {
      store.setState('channels', null);
    }
  };
}

export const app = new App();
