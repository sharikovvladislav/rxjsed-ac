import allCountries from './countries.js';

const countriesNames = allCountries.map(country => country.name);

let counter = 0;

const request = (query = '') => {
	const defer = promiseDefer();

	const timer = setTimeout(() => {
		const result =
		  query.length > 0 ? countriesNames.filter(filter(query)) : [];
		defer.resolve(result);
	// }, 5000);
	}, counter === 0 ? 5000 : 100);

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
}

function promiseDefer() {
	var reject = void 0;
	var resolve = void 0;
	var promise = new Promise(function (givenResolve, givenReject) {
	  resolve = givenResolve;
	  reject = givenReject;
	});
	// $FlowIgnore: We have set the values in promise constructor, but flow doesn't know
	return { promise: promise, resolve: resolve, reject: reject };
}

export { request, clearResult, showResult, debounce };
