import { CLASSNAMES } from './constants';

class Stat {
  containerClassName = CLASSNAMES.flexColumnCenter;
  detailsClassName = ['w-100', 'text--center'].join(' ');

  create = () => {};
}

export const stat = new Stat();
