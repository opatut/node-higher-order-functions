import { reduce } from './index';

// Unary

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
