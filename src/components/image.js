import { CLASSNAMES, BREAKPOINTS } from './constants';

import './image.css';

class Image {
  containerClassName = ['image', 'w-100', CLASSNAMES.flexColumnCenter].join(
    ' ',
  );

  descriptionClassName = [
    'w-100',
    'image',
    'image__heading',
    'text--center',
  ].join(' ');

  imageClassName = ['image', 'image--round'].join(' ');

  sizes = new Map([
    [
      'medium',
      `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${
        BREAKPOINTS.xl - 1
      }px)`,
    ],
    ['high', `(min-width: ${BREAKPOINTS.xl}px)`],
  ]);

  create = () => {};
}

export const image = new Image();
