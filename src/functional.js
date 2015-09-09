import { not } from './operators';
import { reverse } from './lists';
import assert from 'assert';


// Create a function that returns a constant.
export function constant (value) {
    return () => value;
}

export let always = constant(true);
export let never = constant(false);

// Composes multiple functions, e.g `compose(a, b)(x) == a(b(x))`.
export function compose(...fns) {
    assert(fns.length > 0);

    // in-place is not functional but fast :)
    fns.reverse();

    if (fns.length == 1) {
        return fns[0];
    } else {
        return (...args) => {
            let inner = fns[0];
            let value = inner(...args);

            for (let fn of fns.slice(1)) {
                value = fn(value);
            }

            return value;
        }
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

// Wraps a function in a logical not. Returns a function that returns true
// for any set of arguments, if the passed function returns a falsey value
// for this set of arguments, and vice versa.
export let complement = curry(compose, not);

// Returns a function that returns true for any set of arguments,
// iff all of the supplied functions return true for this set of arguments.
export function andF(...fns) {
    assert(fns.length > 0);
    return (...args) => {
        for (let fn of fns) {
            if (!fn(...args)) {
                return false;
            }
        }
        return true;
    }
}

// Returns a function that returns true for any set of arguments,
// iff any of the supplied functions returns true for this set of arguments.
export function orF(...fns) {
    assert(fns.length > 0);
    return (...args) => {
        for (let fn of fns) {
            if (fn(...args)) {
                return true;
            }
        }
        return false;
    }
}

