'use strict';
//     *
//    ***
//   *****
//  *******
//   *****
//    ***
//     *
var Solution = {
	d: `
	https://www.codewars.com/kata/give-me-diamond

	This kata is to practice simple string output. 
	Jamie is a programmer, and girlfriend of James. 
	She likes diamonds, and this time she expects String of diamond from James. 
	As James doesn't know how to do it, he needs your help.

	Task:

	You need to print a shape on the screen using asterisk ("*") characters.

	The shape that will be returned from print method resembles a diamond, 
	where the number provided as input represents the number of *’s printed on 
	the middle line. The line above and below will be centered and will 
	have 2 less *’s than the middle line. 
	This reduction by 2 *’s for each line continues until 
	a line with a single * is printed at the top and bottom of the figure.

	Return null if input is even number 
	(as it is not possible to print diamond with even number).

	Please see provided test case(s) for examples.

	Python Note

	Since print is a reserved word in Python, 
	Python students must implement the diamond(n) method instead, 
	and return None for invalid input.

	JS Note

	JS students, like Python ones, 
	must implement the diamond(n) method, 
	and return null for invalid input.
    `
};
Solution.diamond_01 = {
	d: `intuitive`,
	f: function (n) {
		if (n < 0 || n % 2 === 0)
			return null;
		var ret = '';
		var nHalf = (n - 1) / 2;

		for (let i = 0; i <= nHalf; i++) {
			ret += ' '.repeat(nHalf - i) + '*'.repeat(i * 2 + 1) + '\n';
		}
		for (let i = nHalf - 1; i >= 0; i--) {
			ret += ' '.repeat(nHalf - i) + '*'.repeat(i * 2 + 1) + '\n';
		}

		return ret;
	}
};
Solution.diamond_02 = {
	d: `reverse`,
	f: function (n) {
		if (n < 0 || n % 2 === 0)
			return null;
		var ret = [];
		var nHalf = (n - 1) / 2;
		for (let i = 0; i <= nHalf; i++) {
			ret.push(' '.repeat(nHalf - i) + '*'.repeat(i * 2 + 1) + '\n');
		}
		return ret.concat(ret.slice(0, ret.length - 1).reverse()).join('');
	}
};
Solution.diamond_03 = {
	d: `lineGen`,
	f: function (n) {
		if (n < 0 || n % 2 === 0)
			return null;

		var lineGen = (nSpaces, nStars) => ' '.repeat(nSpaces) + '*'.repeat(nStars) + '\n';
		var ret = lineGen(0, n);
		for (let nStars = n - 2, nSpaces = 1, add; nStars > 0; nStars -= 2) {
			add = lineGen(nSpaces, nStars);
			ret = add + ret + add;
			nSpaces++;
		}
		return ret;
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

function genSets(diamond) {
	var testSets = [];
	for (let n = 0; n < 100; n++) {
		var match = diamond.f(n);
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
testFixture.testSpd(1);