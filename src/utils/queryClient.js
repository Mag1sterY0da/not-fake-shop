const getUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export class QueryClient {
  #listeners = new Map();
  updaters = new Map();
  #cache = new Map();

  async invalidate(key) {
    if (!this.#listeners.has(key)) {
      return;
    }

    const updaters = this.updaters.get(key);

    try {
      if (updaters) {
        updaters.forEach(({ updater }) => {
          updater({ data: undefined, isLoading: true, error: undefined });
        });
      }
      const f = this.#listeners.get(key);
      const result = await f();

      this.#cache.set(key, { data: result, error: undefined });

      if (updaters) {
        updaters.forEach(({ updater }) => {
          updater({ data: result, isLoading: false, error: undefined });
        });
      }
    } catch (error) {
      this.#cache.set(key, { data: undefined, error });

      if (updaters) {
        updaters.forEach(({ updater }) => {
          updater({ data: undefined, isLoading: false, error });
        });
      }
    }
  }

  run(key, f, updater) {
    const uuid = getUuid();
    const unsubscribe = () => {
      const updaters = this.updaters.get(key);
      if (updaters) {
        this.updaters.set(
          key,
          updaters.filter(({ uuid: it }) => it !== uuid)
        );
      }
    };

    if (this.#listeners.has(key)) {
      this.#listeners.delete(key);
    }

    const updaters = this.updaters.get(key) ?? [];

    this.updaters.set(key, [...updaters, { updater, uuid }]);

    this.#listeners.set(key, f);

    if (this.#cache.has(key)) {
      const { data } = this.#cache.get(key);

      if (data) {
        updater({ data, isLoading: false, error: undefined });
        return unsubscribe;
      }
    }

    updater({ data: undefined, isLoading: true, error: undefined });

    f()
      .then(result => {
        updater({ data: result, isLoading: false, error: undefined });
        this.#cache.set(key, { data: result, error: null });
      })
      .catch(error => updater({ data: undefined, isLoading: false, error }));

    return unsubscribe;
  }
}
