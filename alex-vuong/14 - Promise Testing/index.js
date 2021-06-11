import fetch from 'node-fetch';

export const LOCATION_ORIGIN = (() => {
  if (typeof window !== 'undefined' && window.location !== 'undefined') {
    const url = window.location.origin ||
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
    if (url.toString() !== 'null') {
      return url;
    }
  }
  return 'http://localhost';
})();

export const defaultFetchHeaders = {
  compress: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const camelCase = input => {
  // TODO: implement
  //  If input is an array
  if (Array.isArray(input)) {
    for (const e of input)
      camelCase(e);
  }
  //  If input is an object
  //  look into input's keys
  else if (typeof input == "object") {
    // camelCase for all propeties in input
    // and normalize the value of each key
    for (const property in input) {
      const camelCaseKey = normalizeCasing(property);

      //  camelCase the property if it hasn't been cameled
      if (camelCaseKey != property) {
        input[camelCaseKey] = input[property];
        delete input[property];
      }

      //  normalise the value of the property
      camelCase(input[camelCaseKey]);
    }
  }
  return input;
};

const normalizeCasing = value => {
  const firstChar = value.charAt(0);
  return value.replace(firstChar, firstChar.toLowerCase());
};

const callApi = (url = LOCATION_ORIGIN, options = defaultFetchHeaders) => {
  // TODO: implement
  if (url[0] == "/") url = LOCATION_ORIGIN + url;
  const response = fetch(url, options);
  return response.then(
    res => {
      return {
        'resp': res,
        'json': res.status != 204 ? camelCase(JSON.parse(res.body)) : null,
      }
    }
  );
  ;
};

export default callApi;