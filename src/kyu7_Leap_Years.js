'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/leap-years

	In this kata you should simply determine, 
	whether a given year is a leap year or not. 
	In case you don't know the rules, here they are:

	years divisible by 4 are leap years
	but years divisible by 100 are no leap years
	but years divisible by 400 are leap years
	Additional Notes:

	Only valid years (positive integers) will be tested, 
	so you don't have to validate them
	Examples can be found in the test fixture.
    `
};
Solution.isLeapYear_01 = {
	d: `false`,
	f: function (year) {
		if (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0))
			return false;
		return true;
	}
};
Solution.isLeapYear_02 = {
	d: `true`,
	f: function (year) {
		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
			return true;
		return false;
	}
};
Solution.isLeapYear_03 = {
	d: `Date`,
	f: function (year) {
		return new Date(year, 1, 29).getDate() == 29;
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

function genSets(isLeapYear) {
	var testSets = [];
	for (let year = 1; year <= 3000; year++) {
		var match = isLeapYear.f(year);
		testSets.push([
			[year, ],
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
testFixture.testSpd(1000);