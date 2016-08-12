'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/exes-and-ohs

	Check to see if a string has the same amount of 'x's and 'o's. 
	The method must return a boolean and be case insensitive. 
	The string can contains any char.

	Examples input/output:

	XO("ooxx") => true
	XO("xooxx") => false
	XO("ooxXm") => true
	XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true
	XO("zzoo") => false
    `
};
Solution.XO_01 = {
	d: `count by match`,
	f: function (str) {
		var nO = (str.match(/o/ig) || []).length,
			nX = (str.match(/x/ig) || []).length;
		return nO === nX;
	}
};
Solution.XO_02 = {
	d: `count by replace`,
	f: function (str) {
		var nO_ = str.replace(/o/ig, '').length,
			nX_ = str.replace(/x/ig, '').length;
		return nO_ === nX_;
	}
};
Solution.XO_03 = {
	d: `count by filter`,
	f: function (str) {
		str = str.split('');
		var nO = str.filter(x => (x == 'o' || x == 'O')).length,
			nX = str.filter(x => (x == 'x' || x == 'X')).length;
		return nO === nX;
	}
};
Solution.XO_04 = {
	d: `count by for-loop`,
	f: function (str) {
		var sum = 0;
		for (let i = 0; i < str.length; i++) {
			if (str[i] == 'o' || str[i] == 'O')
				sum++;
			else if (str[i] == 'x' || str[i] == 'X')
				sum--;
		}
		return sum === 0;
	}
};
Solution.XO_05 = {
	d: `count by split`,
	f: function (str) {
		var nO = str.split(/o/ig).length + 1,
			nX = str.split(/x/ig).length + 1;
		return nO === nX;
	}
};
Solution.XO_06 = {
	d: `count by reduce`,
	f: function (str) {
		return str.toLowerCase().split('').reduce(
			(a, b) => a + (b == 'o') - (b == 'x'),
			0
		) === 0;
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

stringManip();

function genSets(XO) {
	var testSets = [];
	for (let i = 3; i <= 300; i++) {
		var str;
		if (randBoolean()) {
			str = randString(i * 3);
		} else {
			str = 'o'.repeat(i) + 'x'.repeat(i) + randStringBy(i, 'abcdef123456');
			str = str.shuffle();
		}
		var match = XO.f(str);
		testSets.push([
			[str, ],
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