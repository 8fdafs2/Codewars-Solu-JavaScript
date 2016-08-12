'use strict';
var Solution = {
	d: `
    Create a function that takes an integer as an argument and 
    returns "Even" for even numbers or "Odd" for odd numbers.
    `
};
Solution.even_or_odd_01 = {
	d: `intuitive`,
	f: function (number) {
		if (number % 2 === 0)
			return 'Even';
		return 'Odd';
	}
};
Solution.even_or_odd_02 = {
	d: `? :`,
	f: function (number) {
		return (number % 2 === 0) ? 'Even' : 'Odd';
	}
};
Solution.even_or_odd_03 = {
	d: `index, Math.abs`,
	f: function (number) {
		return ["Even", "Odd"][Math.abs(number) % 2];
	}
};
Solution.even_or_odd_04 = {
	d: `index, &`,
	f: function (number) {
		return ['Even', 'Odd'][number & 1];
	}
};

// --------------------------------------------------------------
import {
	randNumber
}
from './common';

function genSets(even_or_odd) {
	var testSets = [];
	for (var i = 10; i <= 200; i++) {
		var number = randNumber(0, 100);
		var match = even_or_odd.f(number);
		testSets.push([
			[number, ],
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