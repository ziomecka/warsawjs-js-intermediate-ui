export class Observer {
  observers = null;

  subscribe = () => {};

  unsubscribe = () => () => {};

  emit = () => {};

  initSubscribers = () => {};
}
