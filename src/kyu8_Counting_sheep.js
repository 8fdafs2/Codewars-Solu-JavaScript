'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/counting-sheep-dot-dot-dot

    Consider an array of sheep where some sheep may be missing from their place. 
    We need a function that counts the number of sheep present in the array (true means present).

	For example,

	[true,  true,  true,  false,
	  true,  true,  true,  true ,
	  true,  false, true,  false,
	  true,  false, false, true ,
	  true,  true,  true,  true ,
	  false, false, true,  true]
	The correct answer would be 17.

	Hint: Don't forget to check for bad values like null/undefined
    `
};
Solution.countSheeps_01 = {
	d: `loop`,
	f: function (arrayOfSheep) {
		var total = 0;
		for (var i = 0; i < arrayOfSheep.length; i++) {
			if (arrayOfSheep[i]) {
				total += 1;
			}
		}
		return total;
	}
};
Solution.countSheeps_02 = {
	d: `filter(Boolean)`,
	f: function (arrayOfSheep) {
		return arrayOfSheep.filter(Boolean).length;
	}
};
Solution.countSheeps_03 = {
	d: `filter(x => x)`,
	f: function (arrayOfSheep) {
		return arrayOfSheep.filter(x => x).length;
	}
};
Solution.countSheeps_04 = {
	d: `loop, ? :`,
	f: function (arrayOfSheep) {
		var total = 0;
		for (var i = 0; i < arrayOfSheep.length; i++) {
			arrayOfSheep[i] ? total++ : null;
		}
		return total;
	}
};
Solution.countSheeps_05 = {
	d: `reduce((x, y) => x + !!y`,
	f: function (arrayOfSheep) {
		return arrayOfSheep.reduce((x, y) => x + y);
	}
};

// --------------------------------------------------------------
import {
	randBoolean
}
from './common';

function genSets(countSheeps) {
	var testSets = [];
	for (var i = 10; i <= 200; i++) {
		var arrayOfSheep = [];
		for (var j = 0; j <= i; j++) {
			arrayOfSheep.push(randBoolean());
		}
		var match = countSheeps.f(arrayOfSheep);
		testSets.push([
			[arrayOfSheep, ],
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