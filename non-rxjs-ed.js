import {request, clearResult, showResult, debounce} from './common.js';

const className = 'non-rxjsed-ac';
const input = document.querySelector(`div.${className} > input`);
const results = document.querySelector(`div.${className} > .results`);


let ongoingRequest = null;

input.addEventListener('keyup', debounce(function (event) {
  if (ongoingRequest) {
    console.log('cancel ongoing request!');
    ongoingRequest.cancel();
  }

  if (event.target.value.length < 1) {
    return;
  }

  ongoingRequest = request(event.target.value);

  console.log('process request...');
  ongoingRequest.promise
      .then(function (items) {
        console.log('request finished, payload: ', items);
        clearResult(results);
        showResult(items, results);

        ongoingRequest = null;
      })
      .catch(function (code) {
        if (code === 'CANCELED') {
          console.log('request canceled');
        }
      });
}, 1000));
