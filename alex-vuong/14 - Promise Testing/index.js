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
  const firstChar = input.charAt(0);
  return input.replace(firstChar, firstChar.toLowerCase());
};

const normalizeCasing = value => {
  //  If value is an array
  if (Array.isArray(value)) {
    for (const e of value)
      normalizeCasing(e);
  }
  //  If value is an object
  //  look into value's keys
  else if (typeof value == "object") {
    // camelCase for all propeties in value
    // and normalize the value of each key
    for (const property in value) {
      const camelCaseKey = camelCase(property);

      //  camelCase the property if it hasn't been cameled
      if (camelCaseKey != property) {
        value[camelCaseKey] = value[property];
        delete value[property];
      }

      //  normalise the value of the property
      normalizeCasing(value[camelCaseKey]);
    }
  }
  return value;
};

const callApi = (url = LOCATION_ORIGIN, options = defaultFetchHeaders) => {
  // TODO: implement
  if (url[0] == "/") url = LOCATION_ORIGIN + url;
  const response = fetch(url, options);
  return response.then(
    res => {
      return {
        'resp': res,
        'json': res.status != 204 ? normalizeCasing(JSON.parse(res.body)) : null,
      }
    }
  );
  ;
};

export default callApi;
