'use strict';

let Solution = {
  /*
https://www.codewars.com/kata/evaluate-mathematical-expression

Instructions

Given a mathematical expression as a string you must return the result as a number.

Numbers

Number may be both whole numbers and/or decimal numbers. 
The same goes for the returned result.

Operators

You need to support the following mathematical operators:

Multiplication *
Division /
Addition +
Subtraction -
Operators are always evaluated from left-to-right, 
and * and / must be evaluated before + and -.

Parentheses

You need to support multiple levels of nested parentheses, 
ex. (2 / (2 + 3.33) * 4) - -6

Whitespace

There may or may not be whitespace between numbers and operators.

An addition to this rule is that the minus sign (-) used for 
negating numbers and parentheses will never be separated by whitespace. 
I.e., all of the following are valid expressions.

1-1    // 0
1 -1   // 0
1- 1   // 0
1 - 1  // 0
1- -1  // 2
1 - -1 // 2

6 + -(4)   // 2
6 + -( -4) // 10
And the following are invalid expressions

1 - - 1    // Invalid
1- - 1     // Invalid
6 + - (4)  // Invalid
6 + -(- 4) // Invalid
Validation

You do not need to worry about validation - you will 
only receive valid mathematical expressions following the above rules.

Eval

For JavaScript, both eval and Function are disabled.
  */
};
Solution.calc_01 = {
  d: `intuitive`,
  f: function (expression) {
    let tokens = [];
    let t = '';
    for (let i = 0; i < expression.length; ++i) {
      let c = expression[i];
      if (c == ' ') continue;
      if ('*+/-()'.indexOf(c) > -1) {
        if (t !== '') {
          tokens.push(t);
          t = '';
        }
        if (c != '-' || (c == '-' && tokens.length > 0 && '*+-/('.indexOf(tokens[tokens.length - 1]) == -1)) tokens.push(c);
        else t += c;
      } else t += c;
    }
    if (t !== '') tokens.push(t);
    const mp_op = {
      '+': (a, b) => Number(a) + Number(b),
      '-': (a, b) => Number(a) - Number(b),
      '*': (a, b) => Number(a) * Number(b),
      '/': (a, b) => Number(a) / Number(b),
    };

    function recur(tokens) {
      let n = tokens.length;
      if (n == 1) return tokens[0];
      const ops_set = ['+-', '*/'];
      for (let j = 0; j < ops_set.length; ++j) {
        let ops = ops_set[j];
        for (let i = n - 1; i > -1; --i) {
          let t = tokens[i];
          if (ops.indexOf(t) > -1)
            return mp_op[t](recur(tokens.slice(0, i)), recur(tokens.slice(i + 1)));
        }
      }
    }
    let signs = [];
    let stack = [[]];
    for (let i = 0; i < tokens.length; ++i) {
      let t = tokens[i];
      if (t == '-' && tokens[i + 1] == '(' && '+-*/('.indexOf(tokens[i - 1]) > -1) {
        stack.push([]);
        signs.push(-1);
        ++i;
      } else if (t == '(') {
        stack.push([]);
        signs.push(1);
      } else if (t == ')') {
        let tokens_ = stack.pop();
        let sign = signs.pop();
        stack[stack.length - 1].push(sign * recur(tokens_));
      } else stack[stack.length - 1].push(t);
    }
    return Number(recur(stack[0]));
  }
};
Solution.calc_02 = {
  d: ``,
  f: function (expression) {
    let tokens = expression.match(/\d+\.\d+|\d+|[-+*/\(\)]/g).map((t) => isNaN(t) ? t : Number(t));

    function accept(sym) {
      return (tokens[0] == sym) && tokens.shift();
    }

    function acceptNumber() {
      return !isNaN(tokens[0]) && tokens.shift();
    }

    function acceptAny(arr) {
      return arr.some((a) => a == tokens[0]) && tokens.shift();
    }

    function doOp(x, op, y) {
      return [
        (a, b) => a + b,
        (a, b) => a - b,
        (a, b) => a * b,
        (a, b) => a / b,
      ][("+-*/".indexOf(op))](x, y);
    }

    function unit() {
      let e;
      return accept('(') ? (e = expr(), accept(')'), e) : acceptNumber();
    }

    function unary() {
      return accept('-') ? -unit() : unit();
    }

    function factor() {
      let x, op;
      for (x = unary(); op = acceptAny(['*', '/']); x = doOp(x, op, unary()));
      return x;
    }

    function expr() {
      let x, op;
      for (x = factor(); op = acceptAny(['+', '-']); x = doOp(x, op, factor()));
      return x;
    }

    return expr();
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

function genSets(calc) {
  let exprs = [
    '12*-1',
    '12* 123/-(-5 + 2)',
    '((80 - (19)))',
    '(1 - 2) + -(-(-(-4)))',
    '1 - -(-(-(-4)))',
    '12* 123/(-5 + 2)',
    '(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ',
    '1+1',
    '1 - 1',
    '1* 1',
    '1 /1',
    '-123',
    '123',
    '2 /2+3 * 4.75- -6',
    '12* 123',
    '12 * -123',
    '2 / (2 + 3) * 4.33 - -6',
    '((2.33 / (2.9+3.5)*4) - -6)',
    '123.45*(678.90 / (-2.5+ 11.5)-(80 -19) *33.25) / 20 + 11',
  ];
  let testSets = [];
  for (let i = 0; i < exprs.length; ++i) {
    let match = calc.f(exprs[i]);
    testSets.push([
      [exprs[i], ],
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
// testFixture.testSpd(100);
