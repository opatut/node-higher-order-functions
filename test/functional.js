import { assert } from 'chai';

let test1 = Symbol('test-1');
let test2 = Symbol('test-2');
let inc = x => x+1;
let dec = x => x-1;
let square = x => x*x;
let join = (...args) => args.join('');
let get5 = () => 5;

import { constant, always, never, compose, curry, curryr, apply, getter, setter, complement, andF, orF } from '../src/functional';

describe('functional', () => {
    describe('constant', () => {
        it('should return a function', () => {
            assert.typeOf(constant(1), 'function');
        });

        it('should return whatever is passed in', () => {
            assert.equal(constant(1)(), 1);
            assert.equal(constant('hello')(), 'hello');
            assert.equal(constant(test1)(), test1);
        });

        it('should only return the first argument', () => {
            assert.equal(constant(1, 2, 3)(), 1);
            assert.equal(constant('hello', 2, 3)(), 'hello');
        });
    });

    describe('always', () => {
        it('should be a function', () => {
            assert.typeOf(always, 'function');
        });

        it('should return true', () => {
            assert.equal(always(), true);
            assert.equal(always(1), true);
            assert.equal(always(test1), true);
        });
    });

    describe('never', () => {
        it('should be a function', () => {
            assert.typeOf(never, 'function');
        });

        it('should return false', () => {
            assert.equal(never(), false);
            assert.equal(never(1), false);
            assert.equal(never(test1), false);
        });
    });

    describe('compose', () => {
        it('should be a function', () => {
            assert.typeOf(compose, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(compose(inc), 'function');
        });

        it('should return its only argument', () => {
            assert.equal(compose(inc), inc);
        });

        it('should return a composed function', () => {
            assert.equal(compose(inc, dec, dec)(5), 4);
            assert.equal(compose(dec, dec, dec)(20), 17);
        });

        it('should order the functions correctly', () => {
            // square(inc(5)) = square(6) = 36
            assert.equal(compose(square, inc)(5), 36);
        });

        it('should now allow to be called without arguments', () => {
            assert.throws(compose);
        });
    });

    describe('curry', () => {
        it('should be a function', () => {
            assert.typeOf(curry, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(curry(inc), 'function');
        });

        it('should return an equivalent function if called without extra arguments', () => {
            assert.equal(curry(inc)(5), 6);
        });

        it('should return a composed function', () => {
            assert.equal(curry(inc, 5)(), 6);
        });

        it('should order the arguments correctly', () => {
            // square(inc(5)) = square(6) = 36
            assert.equal(curry(join, 'a', 'b')('c', 'd'), 'abcd');
        });
    });

    describe('curryr', () => {
        it('should be a function', () => {
            assert.typeOf(curryr, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(curryr(inc), 'function');
        });

        it('should return an equivalent function if called without extra arguments', () => {
            assert.equal(curryr(inc)(5), 6);
        });

        it('should return a composed function', () => {
            assert.equal(curryr(inc, 5)(), 6);
        });

        it('should order the arguments correctly', () => {
            // square(inc(5)) = square(6) = 36
            assert.equal(curryr(join, 'c', 'd')('a', 'b'), 'abcd');
        });
    });

    describe('apply', () => {
        it('should be a function', () => {
            assert.typeOf(apply, 'function');
        });

        it('should not work without arguments', () => {
            assert.throws(() => {
                apply(inc);
            });
        });

        it('should apply the function with arguments', () => {
            assert.equal(apply(inc, [5]), 6);
        });

        it('should apply the function with arguments for empty array', () => {
            assert.equal(apply(get5, []), 5);
        });
    });

    describe('getter', () => {
        it('should be a function', () => {
            assert.typeOf(getter, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(getter('z'), 'function');
        });

        it('should work with array keys', () => {
            assert.equal(getter(2)([5,3,6,2]), 6);
            assert.equal(getter(10)([5,3,6,2]), undefined);
        });

        it('should work with object keys (strings)', () => {
            let obj = {
                hello: test1,
                world: test2
            };

            assert.equal(getter('hello')(obj), test1);
            assert.equal(getter('hello2')(obj), undefined);
        });
    });

    describe('setter', () => {
        it('should be a function', () => {
            assert.typeOf(setter, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(setter('z'), 'function');
        });

        it('should work with array keys', () => {
            let arr = [0, 0, 0, 0];
            setter(2)(arr, 3)
            assert.equal(arr[2], 3);
        });

        it('should work with object keys (strings)', () => {
            let obj = {};
            setter('hello')(obj, test1)
            assert.equal(obj.hello, test1);
        });
    });

    describe('complement', () => {
        it('should be a function', () => {
            assert.typeOf(complement, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(complement(join), 'function');
        });

        it('should negate the function argument\'s return value', () => {
            assert.equal(complement(always)(), false);
            assert.equal(complement(never)(), true);
        });
    });

    describe('andF', () => {
        it('should be a function', () => {
            assert.typeOf(andF, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(andF(join), 'function');
        });

        it('should return a single function\'s return value as boolean', () => {
            assert.equal(andF(always)(), true);
            assert.equal(andF(never)(), false);
        });

        it('should work with multiple functions', () => {
            assert.equal(andF(always, always, always, always)(), true);
            assert.equal(andF(always, never, always, always)(), false);
            assert.equal(andF(always, always, always, () => 0)(), false);
            assert.equal(andF(always, always, always, () => 5)(), true);
        });
    });

    describe('orF', () => {
        it('should be a function', () => {
            assert.typeOf(orF, 'function');
        });

        it('should return a function', () => {
            assert.typeOf(orF(join), 'function');
        });

        it('should return a single function\'s return value as boolean', () => {
            assert.equal(orF(always)(), true);
            assert.equal(orF(never)(), false);
        });

        it('should work with multiple functions', () => {
            assert.equal(orF(always, always, always, always)(), true);
            assert.equal(orF(always, never, always, always)(), true);
            assert.equal(orF(always, always, always, () => 0)(), true);
            assert.equal(orF(always, always, always, () => 5)(), true);
            assert.equal(orF(never, never, never, always)(), true);
            assert.equal(orF(never, never, never)(), false);
            assert.equal(orF(never, () => 0, never)(), false);
        });
    });

});

    // andF
    // orF
