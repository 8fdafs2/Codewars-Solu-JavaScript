'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/convert-number-to-reversed-array-of-digits

	Given a random integer, return the integers within an array in reverse order.

	Example:

	348597 => [7,9,5,8,4,3]
	`
};
Solution.digitize_01 = {
	d: `intuitive`,
	f: function (n) {
		n = n.toString();
		var ret = [];
		for (var i = n.length - 1; i > -1; i--) {
			ret.push(parseInt(n.charAt(i)));
		}
		return ret;
	},
};
Solution.digitize_02 = {
	d: `map(Number)`,
	f: function (n) {
		return (n + '').split('').map(Number).reverse();
	},
};
Solution.digitize_03 = {
	d: `Array.from`,
	f: function (n) {
		return Array.from(String(n), Number).reverse();
	},
};
Solution.digitize_04 = {
	d: `Array.concat`,
	f: function (n) {
		var recur = function (n) {
			return n > 0 ? [n % 10].concat(recur(Math.floor(n / 10))) : [];
		};
		return recur(n);
	},
};

// --------------------------------------------------------------
import {
	randNumber
}
from './common';

function genSets(digitize) {
	var testSets = [];
	for (var i = 10; i <= 200; i++) {
		var n = randNumber(0, 1000000);
		var match = digitize.f(n);
		testSets.push([
			[n, ],
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
testFixture.test();