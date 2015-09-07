import assert from 'assert';

export * from './operators';

import { not } from './operators';


// Create a function that returns a constant.
export function constant (value) {
    return () => value;
}

// Always returns true.
export let always = constant(true);

// Always returns false.
export let never = constant(false);

// Composes multiple functions, e.g `compose(a, b)(x) == a(b(x))`.
export function compose(...fns) {
    assert(fns.length > 0);

    if (fns.length == 1) {
        return fns[0];
    } else {
        return (...args) => fns[0](compose(...fns.slice(1))(...args));
    }
}

// Return a function that takes any arguments, appends them to
// the list of arguments previously supplied, and applies those to the function.
export function curry(fn, ...args) {
    return (...args2) => fn(...args, ...args2);
}

// Alias for curry.
export let curryl = curry;

// Like curry, but prepend the supplied arguments.
export function curryr(fn, ...args) {
    return (...args2) => fn(...args2, ...args);
}

// Calls a function with a list of arguments.
export function apply(fn, args) {
    assert(args.length !== undefined);
    return fn(...args);
}

// Iterates over an array, and modifies an accumulator with each item using the
// passed function of signature fn(accumulator, current). Initial accumulator
// value can be passed.
export function reduce (array, fn, init) {
    if (typeof init === 'undefined') {
        if (array.length == 0) {
            throw "Reduce requires an array or an initial value.";
        }
        init = array.shift();
    }

    for (var i of array) {
        init = fn(init, i);
    }

    return init;
}


// Returns the minimum value of the arguments.
export function min(...items) {
    return reduce(items, (a, b) => a < b ? a : b);
}

// Returns the maximum value of the arguments.
export function max(...items) {
    return reduce(items, (a, b) => a > b ? a : b);
}

// Returns a function that fetches the attribute with the specified key from an object.
export function getter(key) {
    return item => item[key];
}

// Returns a function that sets a value on some item with the specified key.
// e.g. `let x = {}; s = setter('y'); s(2); // x.y == 2`
export function setter(key) {
    return (item, value) => {
        item[key] = value;
        return item;
    }
}

// Returns the length attribute of any array-like object.
export let length = getter('length');

// Zips multiple lists, e.g. `zip([1,2,3], [4,5,6]) == [[1,4],[2,5],[3,6]]`.
// Truncates all lists to the same length.
export function zip(...lists) {
    let minLen = apply(min, lists.map(length)); // need to use native .map to avoid recursion loop
    let results = [];
    for (let i = 0; i < minLen; ++i) {
        results.push(lists.map(getter(i)));
    }
    return results;
}

// Call the function with one argument from each list, until at least one list
// is empty. Return a list of the function call return values, in order.
export function map(fn, ...lists) {
    return zip(...lists).map(curry(apply, fn));
}

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

// Wraps a function in a logical not. Returns a function that returns true
// for any set of arguments, if the passed function returns a falsey value
// for this set of arguments, and vice versa.
export let complement = curry(compose, not);

// Returns true if the function returns a truthy value for any set of arguments. Can be
// called with multiple lists, behaves like map().
export function any(fn, ...argumentLists) {
    for (let args of zip(argumentLists)) {
        if (fn(...args)) {
            return true;
        }
    }
    return false;
}

// See any(), except it requires all function calls to return a truthy value.
export function all(fn, ...argumentLists) {
    for (let args of zip(argumentLists)) {
        if (!fn(...args)) {
            return false;
        }
    }
    return true;
}

// Returns true if none of the function calls succeeds (with early exit).
export function none(fn, ...items) {
    return !any(fn, ...items);
}

// Returns the first argument passed into it.
export function identity (x) {
    return x;
}

// Returns a function that returns true for any set of arguments,
// iff all of the supplied functions return true for this set of arguments.
export function andFns(...fns) {
    return (...args) => {
        return all(identity, map(curryr(apply, args), fns));
    }
}

// Returns a function that returns true for any set of arguments,
// iff any of the supplied functions returns true for this set of arguments.
export function orFns(...fns) {
    return (...args) => {
        return any(identity, map(curryr(apply, args), fns));
    }
}

