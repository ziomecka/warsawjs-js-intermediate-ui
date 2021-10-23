import { dom } from 'common';

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

  youtubeUrl = 'https://www.youtube.com/c';

  altAttribute = 'image presenting';

  sizeDefault = 'default';

  sizes = new Map([
    [
      'medium',
      `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${
        BREAKPOINTS.xl - 1
      }px)`,
    ],
    ['high', `(min-width: ${BREAKPOINTS.xl}px)`],
  ]);

  create = (options) => {
    const container = this.container;

    const {
      snippet: { title, thumbnails, customUrl },
    } = options;

    const linkWrapper = dom.createElement(
      {
        href: [this.youtubeUrl, customUrl].join('/'),
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      'a',
    );

    const picture = dom.createElement(null, 'picture');

    for (let media of this.sizes.keys()) {
      picture.appendChild(
        dom.createElement(
          {
            media: this.sizes.get(media),
            srcset: thumbnails[media].url,
          },
          'source',
        ),
      );
    }

    picture.appendChild(
      dom.createElement(
        {
          alt: `${this.altAttribute} ${title}`,
          class: this.imageClassName,
          src: thumbnails[this.sizeDefault].url,
        },
        'img',
      ),
    );

    linkWrapper.appendChild(picture);
    container.appendChild(linkWrapper);

    container.appendChild(
      dom.createElement(
        { class: this.descriptionClassName },
        'figCaption',
        title,
      ),
    );

    return container;
  };

  get container() {
    return dom.createElement({ class: this.containerClassName }, 'figure');
  }
}

export const image = new Image();
