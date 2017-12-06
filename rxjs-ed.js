import { request, clearResult, showResult } from './common.js';

const className = 'rxjsed-ac';
const input = document.querySelector(`div.${className} > input`);
const results = document.querySelector(`div.${className} > .results`);

// const input$ = Rx.Observable.fromEvent(input, 'keyup');

// // input$.subscribe(data => console.log(data));

// const values$ = input$.map(event => event.target.value);

// // values$.subscribe(data => console.log(data));

// const debouncedValues$ = values$.debounceTime(300);

// // debouncedValues$.subscribe(debouncedValue => console.log(debouncedValue));

// const onlyNeededLengthValues$ = debouncedValues$.filter(value => value.length >= 1);

// // onlyNeededLengthValues$.subscribe(value => console.log(value));

// const items$ = onlyNeededLengthValues$
// 	.mergeMap(value => Rx.Observable.fromPromise(request(value).promise));

// items$
// 	.subscribe(items => {
// 		clearResult(results);
// 		showResult(items, results);
// 	});


// Rx.Observable.fromEvent(input, 'keyup')
//     .do(event => console.log('keyup', event))
// 	.debounceTime(300)
// 	.do(event => console.log('debounced event', event))
// 	.map(event => event.target.value)
// 	.do(value => console.log('mapped value', value))
// 	.filter(value => value.length >= 1)
// 	.do(value => console.log('filtered value', value))
// 	.switchMap(value => Rx.Observable.fromPromise(request(value).promise))
// 	.do(items => console.log('items' , items))
// 	.subscribe(items => {
// 		clearResult(results);
// 		showResult(items, results);
// 	});


Rx.Observable.fromEvent(input, 'keyup')
	.debounceTime(300)
	.map(event => event.target.value)
	.filter(value => value.length >= 1)
	.switchMap(value => Rx.Observable.fromPromise(request(value).promise))
	.subscribe(items => {
		clearResult(results);
		showResult(items, results);
	});
