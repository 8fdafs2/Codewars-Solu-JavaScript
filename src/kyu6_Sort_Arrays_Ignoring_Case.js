'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/sort-arrays-ignoring-case

	Simple sort, but this time sort regardless of upper / lower case.

	So the input of

	[ "Hello", "there", "I'm", "fine"]
	is translated to

	["fine", "Hello", "I'm", "there" ]
    `
};
Solution.sortme_01 = {
	d: `intuitive`,
	f: function (names) {
		return names.sort((a, b) => a.toLowerCase() > b.toLowerCase());
	}
};
Solution.sortme_02 = {
	d: `localeCompare`,
	f: function (names) {
		return names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
	}
};
Solution.sortme_03 = {
	d: `[0]`,
	f: function (names) {
		return names.sort((a, b) => a[0].toLowerCase() - b[0].toLowerCase());
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randString,
	randStringBy,
}
from './common';

function genSets(sortme) {
	var testSets = [];
	for (let i = 10; i <= 1000; i++) {
		var names = [];
		for (let j = 0; j < i; j++) {
			names.push(randString(randNumber(1, 6)));
		}
		var match = sortme.f(names);
		testSets.push([
			[names, ],
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
testFixture.testSpd(10);