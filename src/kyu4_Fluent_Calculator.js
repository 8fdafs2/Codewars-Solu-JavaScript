'use strict';

let g = function () {
    let ret = [];
    ret.push(this.zero == 0);
    ret.push(this.ten == 10);

    ret.push(this.one.plus.two == 3);
    ret.push(this.one.plus.ten.plus.nine.plus.seven == 27);
    ret.push(this.ten.minus.nine == 1);
    ret.push(this.one.minus.seven.minus.eight.minus.two == -16);
    ret.push(this.one.times.two.times.three == 6);
    ret.push(this.ten.times.nine.times.seven == 630);
    ret.push(this.ten.dividedBy.two == 5);
    ret.push(this.nine.dividedBy.four == 2.25);

    ret.push(this.ten.plus.five.times.two.dividedBy.three.minus.five == 5);
    ret.push(this.five.times.five.plus.five.dividedBy.three.minus.two.plus.seven == 15);
    ret.push(this.five.times.five.plus.five.dividedBy.three.minus.two.plus.five.times.five.plus.five.dividedBy.three.minus.two.plus.seven.times.eight.minus.two.plus.ten.dividedBy.three == 78.22222222222221);

    ret.push(typeof this.zero.zero == undefined);
    ret.push(typeof this.one.two == undefined);
    ret.push(typeof this.three.four == undefined);
    ret.push(typeof this.seven.nine == undefined);
    ret.push(typeof this.six.eight == undefined);

    ret.push(typeof this.one.plus.plus == undefined);
    ret.push(typeof this.two.plus.minus == undefined);
    ret.push(typeof this.nine.minus.times == undefined);
    ret.push(typeof this.ten.plus.dividedBy == undefined);
    ret.push(typeof this.eight.times.times == undefined);

    return ret;
};

let Solution = {
    d: `
    https://www.codewars.com/kata/fluent-calculator-1

    Kata based on Fluent Calculator(ruby)

    Created into a new kata because of a certain limitation the 
    Ruby kata posseses that this kata should also have
    if translated, which is what lead me to create a new one.

    Fluent Calculator

    Your task is to implement a simple calculator with fluent syntax

    var FluentCalculator = /* Magic */ ;
    FluentCalculator should be separated in two, the Values and the Operations, 
    one can call the other, but cannot call one of his own.

    A Value can call an Operation, but cannot call a leftOperand

    FluentCalculator.one.plus
    FluentCalculator.one.one // undefined, if you may.
    An Operation can call a Value, but cannont call a operation

    FluentCalculator.one.plus.two // this should have a leftOperand of 3
    FluentCalculator.one.plus.plus // If you replace 'one' with 'c', 
    I could allow it. (undefined as well)
    Pairs of Value and Operation should be stackable to infinity

    FluentCalculator.one.plus.two.plus.three.minus.one.minus.two.minus.four // Should be -1
    A Value should resolve to a primitive integer

    FluentCalculator.one.plus.ten - 10 // Should be 1
    Now, the fun part...Rules

    eval is disabled
    Values in FluentCalculator should go from zero to ten.
    Supported Operations are plus, minus, times, dividedBy
    Rules mentioned above
    FluentCalculator should be stackable to infinity
    A Value can only call an Operation
    An Operation can only call a Value
    A Value should be resolvable to a primitive integer,
    if needed as such
    `
};
Solution.FluentCalculator_01 = {
    d: `operand/operator getter, operand/operator`,
    f: function () {
        /*
        new {
            operator: 'plus',
            leftOperand: 0,
            get one: new {
                operand: leftOperand + 1, <- valueOf
                get plus: new {
                    operator: 'plus',
                    leftOperand: operand,
                    one: new {
                        ...
                    },
                    ...
                },
                ...
            },
            ...
        }
        */
        const operandNames = [
            'zero', 'one', 'two', 'three', 'four', 'five',
            'six', 'seven', 'eight', 'nine', 'ten',
        ];
        const operatorNames = [
            'plus', 'minus', 'times', 'dividedBy',
        ];
        // --------------------------------------------------
        let Operator = function (operator = 'plus', leftOperand = 0) {
            this.operator = operator;
            this.leftOperand = leftOperand;
            operandNames.forEach(
                (name, operand) => Object.defineProperty(this, name, {
                    get: function () {
                        switch (this.operator) {
                        case 'plus':
                            return new Operand(this.leftOperand + operand);
                        case 'minus':
                            return new Operand(this.leftOperand - operand);
                        case 'times':
                            return new Operand(this.leftOperand * operand);
                        case 'dividedBy':
                            return new Operand(this.leftOperand / operand);
                        }
                    }
                })
            );
        };
        // --------------------------------------------------
        let Operand = function (operand = 0) {
            this.operand = operand;
            operatorNames.forEach(
                name => Object.defineProperty(this, name, {
                    get: function () {
                        return new Operator(name, this.operand);
                    }
                })
            );
        };
        Operand.prototype.valueOf = function () {
            return this.operand;
        };
        // --------------------------------------------------
        // return new Operator();
        this.f = g.bind(new Operator());
        return this.f();
    }
};
Solution.FluentCalculator_02 = {
    d: `operand/operator getter, operand+operator`,
    f: function () {
        /*
        {
            trans: x => x, <- toString: { trans().toString(); }
            get one: new {
                trans: _ => trans(1), <- toString: { trans().toString(); },
                get plus: new {
                    trans: x => trans() + x, <- toString: { trans().toString(); },
                    ...
                },
                ...
            },
            ...
        }
        */
        let Magic = function (type, trans) {
            this.type = type;
            this.trans = trans;
        };
        Magic.prototype.toString = function () {
            return this.trans().toString();
        };
        // --------------------------------------------------
        // let MagicNumber = n => function () {
        //     return this.type == 'op' ? new Magic('n', x => this.trans(n)) : undefined;
        // };
        // let MagicOperation = op => function () {
        //     return this.type == 'n' ? new Magic('op', x => op(this.trans(), x)) : undefined;
        // };
        // --------------------------------------------------
        [
            'zero', 'one', 'two', 'three', 'four', 'five',
            'six', 'seven', 'eight', 'nine', 'ten'
        ].forEach((prop, n) =>
            Object.defineProperty(Magic.prototype, prop, {
                get: function () {
                    return this.type == 'op' ? new Magic('n', _ => this.trans(n)) : undefined;
                }
            })
        );
        // --------------------------------------------------
        [
            ['plus', (x, y) => x + y],
            ['minus', (x, y) => x - y],
            ['times', (x, y) => x * y],
            ['dividedBy', (x, y) => x / y],
        ].forEach(([prop, op]) =>
            Object.defineProperty(Magic.prototype, prop, {
                get: function () {
                    return this.type == 'n' ? new Magic('op', x => op(this.trans(), x)) : undefined;
                }
            })
        );
        // --------------------------------------------------
        // return new Magic('op', x => x);
        this.f = g.bind(new Magic('op', x => x));
        return this.f();
    }
};
Solution.FluentCalculator_03 = {
    d: `operator getter, operand/operator`,
    f: function () {
        /*
        {
            one: new {
                n: 1; <- valueof
                get plus: new { 
                    n: n + 1; <- valueof
                    get plus: new {
                        ...
                    },
                    ...
                },
                ...
            },
            ...
        }
        */
        const operands = 'zero,one,two,three,four,five,six,seven,eight,nine,ten'.split(',');

        let Num = n => ({
            valueOf() {
                return n;
            },
            get plus() {
                return Nums(i => n + i);
            },
            get minus() {
                return Nums(i => n - i);
            },
            get times() {
                return Nums(i => n * i);
            },
            get dividedBy() {
                return Nums(i => n / i);
            }
        });
        // let Nums = (op = n => n) => (
        //     leftOperands.reduce((a, c, i) => (a[c] = Num(op(i)), a), {})
        // );
        let Nums = function (op = n => n) {
            let nums = {};
            operands.forEach((operand, i) => nums[operand] = Num(op(i)));
            return nums;
        };
        // --------------------------------------------------
        // return Nums();
        this.f = g.bind(Nums());
        return this.f();
    }
};
Solution.FluentCalculator_04 = {
    d: `operand getter, operand(built-in Number)/operator`,
    f: function () {
        /* 
        new {
            leftOperand: 0,
            get one: new { Number(1) },
            ...
            plus: {
                get one: new { Number(leftOperand += 1) },
                ...
            },
            ...
        }
        Number.prototype {
            plus: Magic.plus,
            ...
        }
        */
        const numbers = [
            'zero', 'one', 'two', 'three', 'four', 'five',
            'six', 'seven', 'eight', 'nine', 'ten'
        ];
        const operators = {
            'plus': (a, b) => a + b,
            'minus': (a, b) => a - b,
            'times': (a, b) => a * b,
            'dividedBy': (a, b) => a / b
        };
        let Magic = function () {
            let leftOperand = 0;
            Object.keys(operators).forEach((operator) => {
                let operatorFun = operators[operator];
                let operatorObj = {};
                numbers.forEach((prop, operand) => {
                    Object.defineProperty(operatorObj, prop, {
                        get: () => leftOperand = operatorFun(leftOperand, operand)
                    });
                });
                Number.prototype[operator] = operatorObj;
            });
            numbers.forEach((prop, operand) => {
                Object.defineProperty(this, prop, {
                    get: () => leftOperand = operand
                });
            });
        };
        // return new Magic();
        this.f = g.bind(new Magic());
        return this.f();
    }
};

// --------------------------------------------------------------
import {
    arrayManip,
    stringManip,
    randBoolean,
    randNumber,
    randChoice,
    randString,
    randStringBy,
    range,
}
from './common';

function genSets(FluentCalculator) {
    let testSets = [];
    for (let i = 0; i < 100; i++) {
        let match = FluentCalculator.f();
        testSets.push([
            [],
            match
        ]);
    }
    return testSets;
}

// --------------------------------------------------------------
import {
    TestFixture
}
from './testFixture';
let testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);