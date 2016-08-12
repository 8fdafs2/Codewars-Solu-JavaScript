'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/stringy-strings

	write me a function stringy that takes a size and 
	eturns a string of alternating '1s' and '0s'.

	the string should start with a 1.

	a string with size 6 should return :'101010'.

	with size 4 should return : '1010'.

	with size 12 should return : '101010101010'.

	The size will always be positive and will only use whole numbers.
	ALGORITHMSSTRINGSBINARY
    `
};
Solution.stringy_01 = {
	d: `String.repeat`,
	f: function (size) {
		if (size % 2 === 0)
			return '10'.repeat(size / 2);
		return '10'.repeat(size / 2) + '1';
	}
};
Solution.stringy_02 = {
	d: `intuitive`,
	f: function (size) {
		var ret = '';
		for (let i = 1; i < size + 1; i++) {
			ret += i % 2;
		}
		return ret;
	}
};
Solution.stringy_03 = {
	d: `Array.from`,
	f: function (size) {
		return Array.from(Array(size), (v, i) => +(i % 2 === 0)).join('');
	}
};
Solution.stringy_04 = {
	d: `Array.slice`,
	f: function (size) {
		return '10'.repeat((size + 1) / 2).slice(0, size);
	}
};
Solution.stringy_05 = {
	d: `String.substr`,
	f: function (size) {
		return Array(parseInt((size + 3) / 2)).join('10').substr(0, size);
	}
};
// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randString
}
from './common';

function genSets(stringy) {
	var testSets = [];
	for (let size = 10; size <= 200; size++) {
		var match = stringy.f(size);
		testSets.push([
			[size, ],
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