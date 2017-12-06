import allCountries from './countries.js';
import SETTINGS from './settings.js';

const countriesNames = allCountries.map(country => country.name);

const requestTime = SETTINGS.SLOW_MODE ? 5000 : 500;

let counter = 0;

console.log(SETTINGS.SIMULATE_REQUESTS_RACE ? (counter === 0 ? requestTime : 100) : requestTime)
const request = (query = '') => {
  const defer = promiseDefer();

  const timer = setTimeout(() => {
    const result =
        query.length > 0 ? countriesNames.filter(filter(query)) : [];
    defer.resolve(result);
  }, SETTINGS.SIMULATE_REQUESTS_RACE ? (counter === 0 ? requestTime : 100) : requestTime);

  counter++;

  return {
    promise: defer.promise,
    cancel: function () {
      clearTimeout(timer);
      defer.reject('CANCELED');
    }
  };

  function filter(query) {
    return function (countryName) {
      return countryName.toLowerCase().startsWith(query.toLowerCase())
    };
  }
};
const clearResult = element => element.innerHTML = '';

const showResult = (items, element) => {
  if (items.length === 0) {
    element.innerHTML = 'empty';
    return;
  }

  const ul = document.createElement('ul');

  for (let item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }

  element.appendChild(ul);
};


const debounce = (fn, timeout = 300) => {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    const ctx = this;
    timer = setTimeout(function () {
      fn.apply(this, args);
    }, timeout);
  }
};

function promiseDefer() {
  let reject = void 0;
  let resolve = void 0;
  const promise = new Promise(function (givenResolve, givenReject) {
    resolve = givenResolve;
    reject = givenReject;
  });

  return {promise: promise, resolve: resolve, reject: reject};
}

export {request, clearResult, showResult, debounce};
