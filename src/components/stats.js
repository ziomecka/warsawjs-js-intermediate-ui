import { CLASSNAMES } from './constants';

class Stats {
  containerClassName = [CLASSNAMES.flexRowSpaceAround, 'w-100'].join(' ');

  create = () => {};
}

export const stats = new Stats();
