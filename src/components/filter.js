class Filter {
  selector = '#filter-title';

  init = () => {};

  listener = () => {};

  clear = () => {};

  get container() {
    return document.querySelector(this.selector);
  }
}

export const filter = new Filter();
