import { assert } from 'chai';

import * as H from '../src';

let test1 = Symbol('test-1');
let test2 = Symbol('test-2');
let id = x => x;
let inc = x => x+1;
let dec = x => x-1;
let square = x => x*x;
let join = (...args) => args.join('');
let get5 = () => 5;

describe('constant()', () => {
    it('should return a function', () => {
        assert.typeOf(H.constant(1), 'function');
    });

    it('should return whatever is passed in', () => {
        assert.equal(H.constant(1)(), 1);
        assert.equal(H.constant('hello')(), 'hello');
        assert.equal(H.constant(test1)(), test1);
    });

    it('should only return the first argument', () => {
        assert.equal(H.constant(1, 2, 3)(), 1);
        assert.equal(H.constant('hello', 2, 3)(), 'hello');
    });
});

describe('always()', () => {
    it('should be a function', () => {
        assert.typeOf(H.always, 'function');
    });

    it('should return true', () => {
        assert.equal(H.always(), true);
        assert.equal(H.always(1), true);
        assert.equal(H.always(test1), true);
    });
});

describe('never()', () => {
    it('should be a function', () => {
        assert.typeOf(H.never, 'function');
    });

    it('should return false', () => {
        assert.equal(H.never(), false);
        assert.equal(H.never(1), false);
        assert.equal(H.never(test1), false);
    });
});

describe('compose()', () => {
    it('should be a function', () => {
        assert.typeOf(H.compose, 'function');
    });

    it('should return a function', () => {
        assert.typeOf(H.compose(inc), 'function');
    });

    it('should return its only argument', () => {
        assert.equal(H.compose(inc), inc);
    });

    it('should return a composed function', () => {
        assert.equal(H.compose(inc, dec, dec)(5), 4);
        assert.equal(H.compose(dec, dec, dec)(20), 17);
    });

    it('should order the functions correctly', () => {
        // square(inc(5)) = square(6) = 36
        assert.equal(H.compose(square, inc)(5), 36);
    });

    it('should now allow to be called without arguments', () => {
        assert.throws(H.compose);
    });
});

describe('curry()', () => {
    it('should be a function', () => {
        assert.typeOf(H.curry, 'function');
    });

    it('should return a function', () => {
        assert.typeOf(H.curry(inc), 'function');
    });

    it('should return an equivalent function if called without extra arguments', () => {
        assert.equal(H.curry(inc)(5), 6);
    });

    it('should return a composed function', () => {
        assert.equal(H.curry(inc, 5)(), 6);
    });

    it('should order the arguments correctly', () => {
        // square(inc(5)) = square(6) = 36
        assert.equal(H.curry(join, 'a', 'b')('c', 'd'), 'abcd');
    });
});

describe('curryr()', () => {
    it('should be a function', () => {
        assert.typeOf(H.curryr, 'function');
    });

    it('should return a function', () => {
        assert.typeOf(H.curryr(inc), 'function');
    });

    it('should return an equivalent function if called without extra arguments', () => {
        assert.equal(H.curryr(inc)(5), 6);
    });

    it('should return a composed function', () => {
        assert.equal(H.curryr(inc, 5)(), 6);
    });

    it('should order the arguments correctly', () => {
        // square(inc(5)) = square(6) = 36
        assert.equal(H.curryr(join, 'c', 'd')('a', 'b'), 'abcd');
    });
});

describe('apply()', () => {
    it('should be a function', () => {
        assert.typeOf(H.apply, 'function');
    });

    it('should not work without arguments', () => {
        assert.throws(() => {
            H.apply(inc);
        });
    });

    it('should apply the function with arguments', () => {
        assert.equal(H.apply(inc, [5]), 6);
    });

    it('should apply the function with arguments for empty array', () => {
        assert.equal(H.apply(get5, []), 5);
    });
});

describe('min()', () => {
    it('should be a function', () => {
        assert.typeOf(H.min, 'function');
    });

    it('should return any minimum of a bunch of numbers', () => {
        assert.equal(H.min(8, 2, 3, 6, 5, 3), 2);
        assert.equal(H.min(-15, 23, 0), -15);
        assert.equal(H.min(2.5, 1.6, 19), 1.6);
    });
});

describe('max()', () => {
    it('should be a function', () => {
        assert.typeOf(H.max, 'function');
    });

    it('should return any maximum of a bunch of numbers', () => {
        assert.equal(H.max(8, 2, 3, 6, 5, 3), 8);
        assert.equal(H.max(-15, 23, 0), 23);
        assert.equal(H.max(2.5, 1.6, 19), 19);
    });
});

describe('reduce()', () => {
    let add = (a, b) => a + b;

    it('should be a function', () => {
        assert.typeOf(H.reduce, 'function');
    });

    it('should reduce an array with a specified initial value', () => {
        assert.equal(H.reduce([1,2,3,4,5], add, 0), 15);
    });

    it('should reduce an array without initial value', () => {
        assert.equal(H.reduce([1,2,3,4], add), 10);
    });

    it('should throw if no initial value and empty array', () => {
        assert.throws(() => {
            H.reduce([], add);
        });
    });

    it('should return initial value if empty array', () => {
        assert.equal(H.reduce([], add, 12), 12);
    });

    it('should return first element for single-item array and no initial value', () => {
        assert.equal(H.reduce([100], add), 100);
    });

    it('should return first element for single-item array and no initial value', () => {
        assert.equal(H.reduce([100], add), 100);
    });
});

describe('getter()', () => {
    it('should be a function', () => {
        assert.typeOf(H.getter, 'function');
    });

    it('should return a function', () => {
        assert.typeOf(H.getter('z'), 'function');
    });

    it('should work with array keys', () => {
        assert.equal(H.getter(2)([5,3,6,2]), 6);
        assert.equal(H.getter(10)([5,3,6,2]), undefined);
    });

    it('should work with object keys (strings)', () => {
        let obj = {
            hello: test1,
            world: test2
        };

        assert.equal(H.getter('hello')(obj), test1);
        assert.equal(H.getter('hello2')(obj), undefined);
    });
});

describe('setter()', () => {
    it('should be a function', () => {
        assert.typeOf(H.setter, 'function');
    });

    it('should return a function', () => {
        assert.typeOf(H.setter('z'), 'function');
    });

    it('should work with array keys', () => {
        let arr = [0, 0, 0, 0];
        H.setter(2)(arr, 3)
        assert.equal(arr[2], 3);
    });

    it('should work with object keys (strings)', () => {
        let obj = {};
        H.setter('hello')(obj, test1)
        assert.equal(obj.hello, test1);
    });
});

describe('zip()', () => {
    it('should be a function', () => {
        assert.typeOf(H.zip, 'function');
    });

    it('should work with equally long arrays', () => {
        let a = [1,2,3];
        let b = [4,5,6];
        let ab = [[1,4], [2,5], [3,6]];
        assert.deepEqual(H.zip(a, b), ab);
    });

    it('should work with unequally long arrays', () => {
        let a = [1,2,3];
        let b = [4,5,6,7,8];
        let ab = [[1,4], [2,5], [3,6]];
        assert.deepEqual(H.zip(a, b), ab);
    });
});

describe('map()', () => {
    // TODO
});

describe('is()', () => {
    // TODO
});

describe('not()', () => {
    // TODO
});

describe('any()', () => {
    // TODO
});

describe('all()', () => {
    // TODO
});

describe('none()', () => {
    // TODO
});

describe('identity()', () => {
    // TODO
});

describe('andFns()', () => {
    // TODO
});

describe('orFns()', () => {
    // TODO
});

describe('add()', () => {
    // TODO
});

describe('div()', () => {
    // TODO
});

describe('sub()', () => {
    // TODO
});

describe('mul()', () => {
    // TODO
});

describe('modulo()', () => {
    // TODO
});
