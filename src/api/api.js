class Api {
  baseUrl = 'http://localhost';
  port = process.env.SERVER_PORT;

  constructor() {
    this.endpoints = new Map([
      ['localized', { path: '/localized', method: 'GET' }],
      ['channels', { path: '/channels', method: 'GET' }],
    ]);
  }

  get url() {
    return [this.baseUrl, this.port].join(':');
  }

  queryParams = (params) => {
    if (params !== Object(params)) {
      return null;
    }

    const str = Object.entries(params)
      .reduce((result, [key, value]) => {
        if (!value) {
          return result;
        }

        return [
          ...result,
          [key, Array.isArray(value) ? value.join(',') : value].join('='),
        ];
      }, [])
      .join('&');

    return str ? ['?', str].join('') : '';
  };

  req = async (key, queryParams) => {
    const { path, method } = this.endpoints.get(key);
    const qp = this.queryParams(queryParams);

    try {
      return fetch([this.url, path, qp].filter(Boolean).join(''), {
        method,
      });
    } catch (err) {
      console.warn('[API] ', err);
    }
  };
}

export const api = new Api();
