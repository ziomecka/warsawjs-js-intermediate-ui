class Utils {
  convertNumbers = (number, separator = ',') => {
    if (typeof number === 'string' && !Number.isNaN(Number(number))) {
      const { length } = number;

      if (length < 3) {
        return number;
      }

      let result = '';

      // insert comma between 10^3 groups (the US/British notation))
      const modulo = length % 3;

      if (modulo) {
        result += `${number.substring(0, modulo)}${separator}`;
      }

      result += number
        .substring(modulo)
        .replace(/(\d{3})(?=\d+)/g, (letters) => `${letters}${separator}`);

      return result;
    }
  };

  compose =
    (...args) =>
    (value) =>
      args.reduceRight((result, fn) => fn(result), value);

  curry = (fn) => {
    function curryFn(fnLength, ...alreadyReceivedArgs) {
      return (...args) => {
        const total = args.length + alreadyReceivedArgs.length;

        if (total >= fnLength) {
          return fn(...alreadyReceivedArgs, ...args);
        }

        return curryFn(fnLength, ...alreadyReceivedArgs, ...args);
      };
    }

    return typeof fn === 'function' ? curryFn(fn.length) : fn;
  };

  cloneDeep = (object) => {
    if (Object(object) !== object) {
      return object;
    }

    return Array.isArray(object)
      ? object.reduce(cloneDeepArrayReducer.bind(this), [...object])
      : Object.entries(object).reduce(cloneDeepObjectReducer.bind(this), {
          ...object,
        });
  };
}

export const utils = new Utils();

function cloneDeepObjectReducer(result, [key, value]) {
  result[key] = value === Object(value) ? this.cloneDeep(value) : value;

  return result;
}

function cloneDeepArrayReducer(result, item, index) {
  result[index] = Object(item) === item ? this.cloneDeep(item) : item;

  return result;
}
