import {request, clearResult, showResult, debounce} from './common.js';
import SETTINGS from './settings.js';

const className = 'non-rxjsed-ac';
const input = document.querySelector(`div.${className} > input`);
const results = document.querySelector(`div.${className} > .results`);
const loader = document.querySelector(`div.${className} > span`);

let ongoingRequest = null;
let lastValue;

input.addEventListener('keyup', debounce(function (event) {
  if (ongoingRequest) {
    console.log('cancel ongoing request!');
    ongoingRequest.cancel();
  }

  if (event.target.value === lastValue) {
    return;
  }

  lastValue = event.target.value;

  if (event.target.value.length < 1) {
    return;
  }

  loader.classList.remove('hidden');

  ongoingRequest = request(event.target.value);

  console.log('process request...');
  ongoingRequest.promise
      .then((items) => {
        console.log('request finished, payload: ', items);
        clearResult(results);
        showResult(items, results);

        ongoingRequest = null;

        loader.classList.add('hidden');
      })
      .catch((code) => {
        if (code !== 'CANCELED') {
          loader.classList.add('hidden');
        }
        // just for log
        if (code === 'CANCELED') {
          console.log('request canceled');
        }
      })

}, SETTINGS.DEBOUNCE_TIME));
