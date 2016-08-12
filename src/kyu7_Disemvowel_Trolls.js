'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/disemvowel-trolls

	Trolls are attacking your comment section!

	A common way to deal with this situation is to 
	remove all of the vowels from the trolls' comments, 
	neutralizing the threat.

	Your task is to write a function that takes 
	a string and return a new string with all vowels removed.

	For example, the string "This website is for losers LOL!" would 
	become "Ths wbst s fr lsrs LL!".
    `
};
Solution.disemvowel_01 = {
	d: ``,
	f: function (str) {
		return str.replace(/[aeiou]/ig, '').replace(/(\w+)y/ig, '$1');
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randChoice,
	randString,
	randStringBy,
	range,
}
from './common';

function genSets(disemvowel) {
	var testSets = [];
	for (let i = 10; i <= 1000; i++) {
		var str = '';
		for (let j = 0; j < i; j++) {
			str += ' ' + randString(randNumber(3, 8), true, true, false);
		}
		var match = disemvowel.f(str);
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