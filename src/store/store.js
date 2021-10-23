import { Observer } from 'observer';

class Store extends Observer {
  constructor(initialState) {
    super();

    this.initialState = initialState;

    window.getState = () => this.state;
  }

  get initialState() {
    return this._initialState;
  }

  set initialState(initialState) {
    if (!initialState) {
      return;
    }

    this._initialState = initialState;
    this.state = { ...initialState };
  }

  initSubscribers = () => {
    this.observers = new Map();

    Object.keys(this.state).forEach((key) => this.observers.set(key, []));
  };

  setState = (key, value) => {
    if (value === this.state[key] || !this.isValidKey(key)) {
      console.warn('[Store] incorrect key ', key);
      return;
    }

    this.state[key] = value;

    this.emit(key, value);
  };

  getState = (key) => (key ? this.state[key] : this.state);

  isValidKey = (key) => this.state && this.state.hasOwnProperty(key);

  init = (initialState) => {
    if (!initialState) {
      return;
    }

    this.initialState = initialState;

    this.initSubscribers(this.initialState);
  };
}

export const store = new Store();
