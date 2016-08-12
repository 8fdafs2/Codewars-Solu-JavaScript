'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/sum-of-digits-slash-digital-root

	In this kata, you must create a digital root
	function.

	A digital root is the recursive sum of 
	all the digits in a number.
	Given n, take the sum of the digits of n.
	If that value has two digits,
	continue reducing in this way until 
	a single - digit number is produced.
	This is only applicable to the natural numbers.

	Here 's how it works (Ruby example given):

	digital_root(16) => 1 + 6 => 7

	digital_root(942) => 9 + 4 + 2 => 15... => 1 + 5 => 6

	digital_root(132189) => 1 + 3 + 2 + 1 + 8 + 9 => 24... => 2 + 4 => 6

	digital_root(493193) => 4 + 9 + 3 + 1 + 9 + 3 => 29... => 2 + 9 => 11... => 1 + 1 => 2
    `
};
Solution.digital_root_01 = {
	d: `toString.split.reduce`,
	f: function (n) {
		while (n > 9)
			n = n.toString().split('').reduce((a, b) => +b + a, 0);
		return n;
	}
};
Solution.digital_root_02 = {
	d: `!`,
	f: function (n) {
		return (n - 1) % 9 + 1;
	}
};
Solution.digital_root_03 = {
	d: `!`,
	f: function (n) {
		while (n > 9)
			n = n % 10 + Math.floor(n / 10);
		return n;
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

function genSets(digital_root) {
	var testSets = [];
	for (let n = 0; n <= 10000; n++) {
		var match = digital_root.f(n);
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
testFixture.test(false);
testFixture.testSpd(100);