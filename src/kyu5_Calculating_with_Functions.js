'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/calculating-with-functions

	This time we want to write calculations using functions and 
	get the results. Let's have a look at some examples:

	seven(times(five())); // must return 35
	four(plus(nine())); // must return 13
	eight(minus(three())); // must return 5
	six(dividedBy(two())); // must return 3

	Requirements:
	There must be a function for each number from 0 ("zero") to 9 ("nine")
	There must be a function for each of the following 
	mathematical operations: plus, minus, times, dividedBy (divided_by in Ruby)
	Each calculation consist of exactly one operation and two numbers
	The most outer function represents the left operand, 
	the most inner function represents the right operand
    `
};
Solution.subSol_01 = {
	d: `eval`,
	f: function (a, op, b) {
		function numFuncGen(n) {
			return x => x === undefined ? n : eval(n + x);
		}
		this.zero = numFuncGen(0);
		this.one = numFuncGen(1);
		this.two = numFuncGen(2);
		this.three = numFuncGen(3);
		this.four = numFuncGen(4);
		this.five = numFuncGen(5);
		this.six = numFuncGen(6);
		this.seven = numFuncGen(7);
		this.eight = numFuncGen(8);
		this.nine = numFuncGen(9);
		this.plus = x => '+' + x;
		this.minus = x => '-' + x;
		this.times = x => '*' + x;
		this.dividedBy = x => '/' + x;
		this.f = function (a, op, b) {
			return this[a](this[op](this[b]()));
		};
		return this.f(a, op, b);
	}
};
Solution.subSol_02 = {
	d: `forEach`,
	f: function (a, op, b) {
		['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].forEach(
			(name, n) =>
			this[name] = function (op) {
				return op ? op(n) : n;
			}
		);
		this.plus = x => n => n + x;
		this.minus = x => n => n - x;
		this.times = x => n => n * x;
		this.dividedBy = x => n => n / x;
		this.f = function (a, op, b) {
			return this[a](this[op](this[b]()));
		};
		return this.f(a, op, b);
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randChoice,
	randString,
	randStringBy,
}
from './common';

function genSets(subSol) {
	const xs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	const ops = ['plus', 'minus', 'times', 'dividedBy'];
	var testSets = [];
	for (let i = 10; i <= 200; i++) {
		var a = randChoice(xs);
		var op = randChoice(ops);
		var b = randChoice(xs);
		var match = subSol.f(a, op, b);
		testSets.push([
			[a, op, b, ],
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
var testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);