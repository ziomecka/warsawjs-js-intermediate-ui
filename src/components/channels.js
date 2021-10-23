import { CLASSNAMES } from './constants';

import './channels.css';

class Channels {
  rootSelector = '#main';

  className = ['channel__container', CLASSNAMES.flexColumnCenter].join(' ');

  init = () => {};

  requestChannels = async () => {};

  onChannelsChange = () => {};

  remove = () => {};

  create = () => {};
}

export const channels = new Channels();
