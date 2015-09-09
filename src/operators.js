import { reduce, filter } from './lists';
import { curry } from './functional';

// Unary

export let identity = (x) => x;
export let not = (x) => !x;
export let neg = (x) => -x;

// Binary

export let add = (a, b) => a + b;
export let sub = (a, b) => a - b;
export let mul = (a, b) => a * b;
export let div = (a, b) => a / b;
export let modulo = (a, b) => ((a % b) + b) % b;

// Ternary
export let ternary = (cond, yes, no) => cond ? yes : no;

// variadic operators

function toVariadic(binaryOperator) {
    return (...args) => reduce(args, binaryOperator);
}

export let addN = toVariadic(add);
export let subN = toVariadic(sub);
export let mulN = toVariadic(mul);
export let divN = toVariadic(div);
export let moduloN = toVariadic(modulo);

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function min(...items) {
    return reduce(filter(items, isNumeric), (a, b) => a < b ? a : b);
}

export function max(...items) {
    return reduce(filter(items, isNumeric), (a, b) => a > b ? a : b);
}

// Returns the length attribute of any array-like object.
export let length = (x) => x.length;


export function eq2(a, b) {
    return a == b;
}

export function eq3(a, b) {
    return a === b;
}

export let eq = eq2;

export function is(arg1, fn=eq) {
    return curry(fn, arg1);
}

