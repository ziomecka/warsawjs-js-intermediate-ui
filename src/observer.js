export class Observer {
  observers = null;

  subscribe = (eventName, subscriber) => {
    if (!this.observers) {
      return;
    }

    if (!this.observers.has(eventName)) {
      this.observers.set(eventName, []);
    }

    this.observers.get(eventName).push(subscriber);

    return this.unsubscribe(eventName, subscriber);
  };

  unsubscribe = (eventName, subscriber) => () => {
    if (!this.observers) {
      return;
    }

    const subscribers = this.observers.get(eventName) || [];

    const index = subscribers.findIndex((item) => item === subscriber);

    if (index === -1) {
      return;
    }

    subscribers.splice(index, 1);
  };

  emit = (key, value) => {
    if (!this.observers) {
      return;
    }

    const observers = this.observers.get(key) || [];

    observers.forEach((subscriber) => subscriber(value));
  };

  initSubscribers = (initialState) => {
    if (this.observers || initialState !== Object(initialState)) {
      return;
    }

    this.observers = new Map();

    Object.keys(initialState).forEach((key) => this.observers.set(key, []));
  };
}
