import { dom } from 'common';
import { store } from 'store';

import { CLASSNAMES } from './constants';
import { stat } from './stat';

class Stats {
  containerClassName = [CLASSNAMES.flexRowSpaceAround, 'w-100'].join(' ');

  create = (stats) => {
    const localized = store.getState('localized');

    if (!stats || !localized) {
      return null;
    }

    const container = this.container;

    const elements = [
      [localized.subscribers, stats.subscriberCount],
      [localized.videos, stats.videoCount],
      [localized.views, stats.viewCount],
    ];

    elements.forEach((element) => {
      container.appendChild(stat.create(...element));
    });

    return container;
  };

  get container() {
    return dom.createElement({ class: this.containerClassName }, 'summary');
  }
}

export const stats = new Stats();
