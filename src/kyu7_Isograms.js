'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/isograms

	An isogram is a word that has no repeating letters, 
	consecutive or non-consecutive. 
	Implement a function that determines whether 
	a string that contains only letters is an isogram. 
	Assume the empty string is an isogram. Ignore letter case.

	isIsogram( "Dermatoglyphics" ) == true
	isIsogram( "aba" ) == false
	isIsogram( "moOse" ) == false // -- ignore letter case
    `
};
Solution.isIsogram_01 = {
	d: `intuitive`,
	f: function (str) {
		if (new Set(str.toLowerCase()).size != str.length)
			return false;
		return true;
	}
};
Solution.isIsogram_02 = {
	d: `regex`,
	f: function (str) {
		return !/(\w).*\1/i.test(str);
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randString
}
from './common';

function genSets(isIsogram) {
	var testSets = [];
	for (let i = 0; i <= 200; i++) {
		var str = randString(randNumber(3, 8), true, true, false);
		var match = isIsogram.f(str);
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
testFixture.test();