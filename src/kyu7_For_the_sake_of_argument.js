'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/for-the-sake-of-argument
	
	Write a function named numbers that returns true if 
	all the parameters it is passed are of the Number type. 
	Otherwise, the function should return false. 
	The function should accept any number of parameters.

	Example usage:

	numbers(1, 4, 3, 2, 5); // true
	numbers(1, "a", 3); // false
	numbers(1, 3, NaN); // true
    `
};
Solution.numbers_01 = {
	d: `intuitive`,
	f: function () {
		for (let i = 0; i < arguments.length; i++) {
			var x = arguments[i];
			if (x !== Number(x))
				return false;
		}
		return true;
	}
};
Solution.numbers_02 = {
	d: `filter`,
	f: function () {
		return Array.prototype.filter.call(arguments, x => typeof x != 'number').length === 0;
	}
};
Solution.numbers_03 = {
	d: `every`,
	f: function () {
		return [].every.call(arguments, x => typeof x == 'number');
	}
};
Solution.numbers_04 = {
	d: `every`,
	f: function (...nums) {
		return nums.every(x => typeof x == 'number');
	}
};
// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randString
}
from './common';

function genSets(numbers) {
	var testSets = [];
	for (let i = 10; i <= 200; i++) {
		var args = [];
		for (let j = 0; j < i; j++) {
			if (randBoolean())
				args.push(randNumber(0, 9));
			else
				args.push(randString(1));
		}
		var match = numbers.f.apply(this, args);
		testSets.push([
			[...args],
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