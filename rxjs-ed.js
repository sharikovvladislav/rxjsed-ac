import {request, clearResult, showResult} from './common.js';
import SETTINGS from './settings.js';

const className = 'rxjsed-ac';
const input = document.querySelector(`div.${className} > input`);
const results = document.querySelector(`div.${className} > .results`);
const loader = document.querySelector(`div.${className} > span`);


Rx.Observable.fromEvent(input, 'keyup')
    .debounceTime(SETTINGS.DEBOUNCE_TIME)
    .map(event => event.target.value)
    .filter(value => value.length >= 1)
/*
    .distinctUntilChanged()
*/
    .do(() => loader.classList.remove('hidden'))
    .mergeMap(value => Rx.Observable.fromPromise(request(value).promise))
/*
    .switchMap(value => Rx.Observable.fromPromise(request(value).promise))
*/
    .do(() => loader.classList.add('hidden'))
    .subscribe(items => {
      clearResult(results);
      showResult(items, results);
    });





































/*


const input$ = Rx.Observable.fromEvent(input, 'keyup');

// input$.subscribe(data => console.log(data));

const values$ = input$.map(event => event.target.value);

// values$.subscribe(data => console.log(data));

const debouncedValues$ = values$.debounceTime(SETTINGS.DEBOUNCE_TIME);

// debouncedValues$.subscribe(debouncedValue => console.log(debouncedValue));

const onlyNeededLengthValues$ = debouncedValues$.filter(value => value.length >= 1);

// onlyNeededLengthValues$.subscribe(value => console.log(value));

const unique$ = onlyNeededLengthValues$.distinctUntilChanged();

const items$ = unique$
    .do(() => loader.classList.remove('hidden'))
    .mergeMap(value => Rx.Observable.fromPromise(request(value).promise));

items$
    .do(() => loader.classList.add('hidden'))
    .subscribe(items => {
      clearResult(results);
      showResult(items, results);
    });


*/








/*

Rx.Observable.fromEvent(input, 'keyup')
    .do(event => console.log('keyup', event))
    .debounceTime(SETTINGS.DEBOUNCE_TIME)
    .do(event => console.log('debounced event', event))
    .map(event => event.target.value)
    .do(value => console.log('mapped value', value))
    .filter(value => value.length >= 1)
    .distinctUntilChanged()
    .do(value => console.log('filtered value', value))
    .do(() => loader.classList.remove('hidden'))
    .switchMap(value => Rx.Observable.fromPromise(request(value).promise))
    .do(items => console.log('items', items))
    .do(() => loader.classList.add('hidden'))
    .subscribe(items => {
      clearResult(results);
      showResult(items, results);
    });
*/
