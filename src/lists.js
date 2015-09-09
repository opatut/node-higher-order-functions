import { apply, getter, curry } from './functional';
import { min, length } from './operators';

export function reduce (array, fn, init) {
    if (typeof init === 'undefined') {
        if (array.length == 0) {
            throw new TypeError("Reduce requires array content or initial value.");
        }
        init = array.shift();
    }

    for (var i of array) {
        init = fn(init, i);
    }

    return init;
}

export function filter (array, fn) {
    return array.filter(fn);
}

export function zip(...lists) {
    let minLen = apply(min, lists.map(length)); // need to use native .map to avoid recursion loop
    let results = [];
    for (let i = 0; i < minLen; ++i) {
        results.push(lists.map(getter(i)));
    }
    return results;
}

export function map(fn, ...lists) {
    return zip(...lists).map(curry(apply, fn));
}

export function any(fn, ...lists) {
    for (let args of zip(lists)) {
        if (fn(...args)) {
            return true;
        }
    }
    return false;
}

export function all(fn, ...lists) {
    for (let args of zip(lists)) {
        if (!fn(...args)) {
            return false;
        }
    }
    return true;
}

export function none(fn, ...lists) {
    return !any(fn, ...lists);
}


export function reverse(list) {
    return list.slice().reverse();
}

export function sort(list, compareFunction) {
    return list.slice().sort(compareFunction);
}
