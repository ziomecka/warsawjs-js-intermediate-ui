import { dom, utils } from 'common';
import { api } from 'api';
import { store } from 'store';

import { CLASSNAMES } from './constants';
import { image } from './image';
import { stats } from './stats';

import './channels.css';

class Channels {
  rootSelector = '#main';

  className = ['channel__container', CLASSNAMES.flexColumnCenter].join(' ');

  init = () => {
    store.subscribe('channels', this.onChannelsChange);

    store.subscribe('filter', this.requestChannels);
    store.subscribe('sortBy', this.requestChannels);
  };

  requestChannels = async () => {
    try {
      const res = await api.req('channels', {
        ...store.getState('filter'),
        orderBy: store.getState('orderBy'),
        sortBy: store.getState('sortBy'),
      });

      const { channels } = await res.json();

      store.setState('channels', channels);
    } catch (err) {
      store.setState('channels', null);

      console.warn('[Channels] ', err);
    }
  };

  onChannelsChange = (data) => {
    channels.remove();
    channels.create(data);
  };

  createChannel = (channelData) => {
    const container = this.container;

    [image.create(channelData), stats.create(channelData.statistics)]
      .filter(Boolean)
      .forEach((element) => element && container.appendChild(element));

    return container;
  };

  remove = () => {
    const root = this.root;

    if (root) {
      root.replaceChildren([]);
    }
  };

  create = (channels) => {
    const root = this.root;

    if (!root || !channels || !Array.isArray(channels)) {
      return;
    }

    channels.forEach(
      utils.compose(
        (element) => element && root.appendChild(element),
        this.createChannel,
      ),
    );
  };

  get container() {
    return dom.createElement({ class: this.className }, 'section');
  }

  get root() {
    return document.querySelector(this.rootSelector);
  }
}

export const channels = new Channels();
