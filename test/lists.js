import { assert } from 'chai';

import { always, never } from '../src/functional';
import { reduce, zip, map, filter } from '../src/lists';

let inc = x => x+1;
let join = (...args) => args.join('');

describe('lists', () => {
    describe('reduce', () => {
        let add = (a, b) => a + b;

        it('should be a function', () => {
            assert.typeOf(reduce, 'function');
        });

        it('should reduce an array with a specified initial value', () => {
            assert.equal(reduce([1,2,3,4,5], add, 0), 15);
        });

        it('should reduce an array without initial value', () => {
            assert.equal(reduce([1,2,3,4], add), 10);
        });

        it('should throw if no initial value and empty array', () => {
            assert.throws(() => {
                reduce([], add);
            });
        });

        it('should return initial value if empty array', () => {
            assert.equal(reduce([], add, 12), 12);
        });

        it('should return first element for single-item array and no initial value', () => {
            assert.equal(reduce([100], add), 100);
        });

        it('should return first element for single-item array and no initial value', () => {
            assert.equal(reduce([100], add), 100);
        });
    });

    describe('filter', () => {
        let arr = [1,5,36,6,12,-2];

        it('should be a function', () => {
            assert.typeOf(filter, 'function');
        });

        it('should return the array itself when called with `always`', () => {
            assert.deepEqual(filter(arr, always), arr);
        });

        it('should return an empty array when called with `never`', () => {
            assert.deepEqual(filter(arr, never), []);
        });

        it('should pass the argument correctly and filter the array based on the predicate', () => {
            assert.deepEqual(filter(arr, x => x > 10), [36, 12]);
        });
    });

    describe('zip', () => {
        it('should be a function', () => {
            assert.typeOf(zip, 'function');
        });

        it('should work with equally long arrays', () => {
            let a = [1,2,3];
            let b = [4,5,6];
            let ab = [[1,4], [2,5], [3,6]];
            assert.deepEqual(zip(a, b), ab);
        });

        it('should work with unequally long arrays', () => {
            let a = [1,2,3];
            let b = [4,5,6,7,8];
            let ab = [[1,4], [2,5], [3,6]];
            assert.deepEqual(zip(a, b), ab);
        });
    });

    describe('map', () => {
        it('should be a function', () => {
            assert.typeOf(map, 'function');
        });

        it('should work with a single array', () => {
            let a = [1,2,3];
            let b = [2,3,4];
            assert.deepEqual(map(inc, a), b);
        });

        it('should work with multiple arrays', () => {
            let a = ['hello', 'world'];
            assert.deepEqual(map(join, a, a), ['hellohello', 'worldworld']);
        });
    });

    describe('any', () => {
        // TODO
    });

    describe('all', () => {
        // TODO
    });

    describe('none', () => {
        // TODO
    });

    describe('reverse', () => {
        // TODO
    });

    describe('sort', () => {
        // TODO
    });
});

