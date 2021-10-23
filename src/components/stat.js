import { dom, utils } from 'common';

import { CLASSNAMES } from './constants';

class Stat {
  containerClassName = CLASSNAMES.flexColumnCenter;
  detailsClassName = ['w-100', 'text--center'].join(' ');

  create = (description, stat) => {
    const container = this.container;

    const elements = [
      description
        ? [{ class: this.detailsClassName }, 'span', `${description}: `]
        : null,
      [{ class: this.detailsClassName }, 'span', utils.convertNumbers(stat)],
    ].filter(Boolean);

    elements.forEach((element) => {
      container.appendChild(dom.createElement(...element));
    });

    return container;
  };

  get container() {
    return dom.createElement({ class: this.containerClassName }, 'p');
  }
}

export const stat = new Stat();
