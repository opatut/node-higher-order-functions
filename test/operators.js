import { assert } from 'chai';
import { not, neg, add, sub, mul, div, modulo, ternary, addN, subN, mulN, divN, moduloN } from '../src/operators';

let test1 = Symbol('test1');
let test2 = Symbol('test2');

describe('operators', () => {
    describe('.not()', () => {
        let tests = [10, true, undefined, false, null, 'hello', {}, [], test1];

        it('should work like `!`', () => {
            for (let test of tests) {
                assert.equal(not(test), !test);
            }
        });
    });

    describe('.neg()', () => {
        let tests = [10, 0, false, true];

        it('should negate numbers', () => {
            for (let test of tests) {
                assert.equal(neg(test), -test);
            }
        });
    });

    describe('.add()', () => {
        it('should add numbers', () => {
            assert.equal(add(1, 2), 3);
            assert.equal(add(1, 2.3), 3.3);
            assert.equal(add(-1, 2), 1);
        });

        it('should add numbers and null', () => {
            assert.equal(add(1, null), 1);
            assert.equal(add(null, 5), 5);
        });

        it('should concatenate strings', () => {
            assert.equal(add('hello ', 'world'), 'hello world');
        });
    });

    describe('.sub()', () => {
        it('should subtract numbers', () => {
            assert.equal(sub(1, 2), -1);
            assert.equal(sub(1, 2.3), 1-2.3);
            assert.equal(sub(1, -2), 3);
        });
    });

    describe('.mul()', () => {
        it('should multiply numbers', () => {
            assert.equal(mul(5, 4), 20);
            assert.equal(mul(5, -5), -25);
            assert.equal(mul(0, 1.2), 0);
            assert.equal(mul(null, 12), 0);
        });
    });

    describe('.div()', () => {
        it('should divide numbers', () => {
            assert.equal(div(2, 1), 2);
            assert.equal(div(1, 2), 0.5);
            assert.equal(div(2, 0), Infinity);
        });
    });

    describe('.modulo()', () => {
        it('should modulo positive numbers', () => {
            assert.equal(modulo(200, 500), 200);
            assert.equal(modulo(20, 6), 2);
            assert.equal(modulo(20, 5), 0);
            assert.equal(modulo(20, 20), 0);
            assert.equal(isNaN(modulo(20, 0)), true);
        });

        it('should return positive remainder for negative numbers', () => {
            assert.equal(modulo(-5, 2), 1);
            assert.equal(isNaN(modulo(-20, 0)), true);
        });
    });

    describe('.ternary()', () => {
        it('should work with real booleans', () => {
            assert.equal(ternary(false, test1, test2), test2);
            assert.equal(ternary(true, test1, test2), test1);
        });

        it('should work with truthy/falsy values', () => {
            assert.equal(ternary(0, test1, test2), test2);
            assert.equal(ternary(12, test1, test2), test1);
        });
    });

    describe('.addN()', () => {
        it('should work with one argument', () => {
            assert.equal(addN(12), 12);
        });

        it('should work with two arguments', () => {
            assert.equal(addN(12, 17), 12 + 17);
        });

        it('should work with many arguments', () => {
            assert.equal(addN(12, 17, 2, -12, -18), 1);
        });
    });

    describe('.subN()', () => {
        it('should work with one argument', () => {
            assert.equal(subN(12), 12);
        });

        it('should work with two arguments', () => {
            assert.equal(subN(12, 17), -5);
        });

        it('should work with many arguments', () => {
            assert.equal(subN(12, 3, 5, 9, -10), 5);
        });
    });

    describe('.mulN()', () => {
        it('should work with one argument', () => {
            assert.equal(mulN(12), 12);
        });

        it('should work with two arguments', () => {
            assert.equal(mulN(6, 2), 12);
        });

        it('should work with many arguments', () => {
            assert.equal(mulN(2, 3, -3), -18);
        });
    });

    describe('.divN()', () => {
        it('should work with one argument', () => {
            assert.equal(divN(12), 12);
        });

        it('should work with two arguments', () => {
            assert.equal(divN(12, 6), 2);
        });

        it('should work with many arguments', () => {
            assert.equal(divN(12, 3, 2), 2);
        });
    });

    describe('.moduloN()', () => {
        it('should work with one argument', () => {
            assert.equal(moduloN(12), 12);
        });

        it('should work with two arguments', () => {
            assert.equal(moduloN(12, 7), 5);
        });

        it('should work with many arguments', () => {
            assert.equal(moduloN(20, 11, 4), 1); // (20 % 11) % 4 = 9 % 4 = 1
        });
    });


});
