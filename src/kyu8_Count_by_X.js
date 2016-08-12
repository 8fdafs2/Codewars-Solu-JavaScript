'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/count-by-x

    Create a function with two arguments that will return a list of length (n) with multiples of (x).
	Assume both the given number and the number of times to count will be positive numbers greater than 0.
	Return the results as an array(or list in Python, Haskell or Elixir).

	Examples:

		countBy(1, 10) === [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		countBy(2, 5) === [2, 4, 6, 8, 10]
    `
};
Solution.countBy_01 = {
	d: `intuitive`,
	f: function (x, n) {
		var z = [];
		for (var i = 1; i <= n; i++) {
			z.push(x * i);
		}
		return z;
	},
};
Solution.countBy_02 = {
	d: `Array.apply`,
	f: function (x, n) {
		return Array.apply(null, Array(n)).map((v, i) => (i + 1) * x);
	},
};
Solution.countBy_03 = {
	d: `while loop`,
	f: function (x, n) {
		var z = [];
		while (z.length < n) {
			z.push(x * (z.length + 1));
		}
		return z;
	},
};

// --------------------------------------------------------------
import {
	randNumber,
}
from './common';

function genSets(countBy) {
	var testSets = [];
	for (var i = 10; i <= 200; i++) {

		var x = randNumber(1, 10);
		var n = randNumber(1, 10);
		var match = countBy.f(x, n);
		testSets.push([
			[x, n, ],
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