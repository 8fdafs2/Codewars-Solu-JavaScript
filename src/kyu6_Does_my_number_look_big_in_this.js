'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/does-my-number-look-big-in-this

	A Narcissistic Number is a number which is the sum of its own digits, 
	each raised to the power of the number of digits.

	For example, take 153 (3 digits):

	    1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
	and 1634 (4 digits):

	    1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634
	The Challenge:

	Your code must return true or false depending upon whether 
	the given number is a Narcissistic number.

	Error checking for text strings or other invalid inputs is not 
	required, only valid integers will be passed into the function.
    `
};
Solution.narcissistic_01 = {
	d: ``,
	f: function (value) {
		var valueArr = value.toString().split('');
		var n = valueArr.length;
		return valueArr.reduce((a, b) => a + Math.pow(b, n), 0) ===
			value;
	}
};
Solution.narcissistic_02 = {
	d: ``,
	f: function (value) {
		var n = 1 + Math.floor(Math.log10(value));
		for (let i = 0, x = value; i < n; i++, x = Math.floor(x / 10)) {
			value -= Math.pow(x % 10, n);
		}
		return value === 0;
	}
};
Solution.narcissistic_03 = {
	d: ``,
	f: function (value) {
		var x = value;
		var valueArr = [];
		while (x > 0) {
			valueArr.push(x % 10);
			x = Math.floor(x / 10);
		}
		var n = valueArr.length;
		return valueArr.reduce((a, b) => a + Math.pow(b, n), 0) ===
			value;
	}
};

// --------------------------------------------------------------
import {
	ArrayManip,
	stringManip,
	randBoolean,
	randNumber,
	randChoice,
	randString,
	randStringBy,
	range,
}
from './common';

function genSets(narcissistic) {
	var testSets = [];
	for (let value = 0; value <= 1000; value++) {
		var match = narcissistic.f(value);
		testSets.push([
			[value, ],
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