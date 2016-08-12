'use strict';
var Solution = {
	d: `
	This kata is designed to test your ability to 
	extend the functionality of built - in ruby classes.
	In this case, we want you to extend the 
	built - in Array class with the following methods:
	square(), cube(), average(), sum(), even() and odd().

	Explanation:

	square() must return a copy of the array, containing all values squared,
	the original array must not be changed 
	cube() must	return a copy of the array, containing all values cubed, 
	the original array must not be changed 	
	average() must return the average of all array values, 
	average() on an empty array must return NaN
	sum() must return the sum of all array values
	even() must return an array of all even numbers, 
	the original array must not be changed
	odd() must return an array of all odd numbers, 
	the original array must not be changed Examples:

	var numbers = [1, 2, 3, 4, 5];
	numbers.square(); // must return [1, 4, 9, 16, 25]
	numbers.cube(); // must return [1, 8, 27, 64, 125]
	numbers.average(); // must return 3
	numbers.sum(); // must return 15
	numbers.even(); // must return [2, 4]
	numbers.odd(); // must return [1, 3, 5]
    `
};
Solution.subSol_01 = {
	d: `intuitive`,
	f: function (numbers) {
		console.log('0', numbers);
		Array.prototype.square = function () {
			return this.map(x => x * x);
		};
		Array.prototype.cube = function () {
			return this.map(x => x * x * x);
		};
		Array.prototype.average = function () {
			return this.reduce((a, b) => a + b, 0) / this.length;
		};
		Array.prototype.sum = function () {
			return this.reduce((a, b) => a + b, 0);
		};
		Array.prototype.even = function () {
			return this.filter(x => x % 2 === 0);
		};
		Array.prototype.odd = function () {
			return this.filter(x => x % 2 !== 0);
		};
		// Hide method from for-in loops
		Object.defineProperty(Array.prototype, "square", {
			enumerable: false
		});
		Object.defineProperty(Array.prototype, "cube", {
			enumerable: false
		});
		Object.defineProperty(Array.prototype, "average", {
			enumerable: false
		});
		Object.defineProperty(Array.prototype, "sum", {
			enumerable: false
		});
		Object.defineProperty(Array.prototype, "even", {
			enumerable: false
		});
		Object.defineProperty(Array.prototype, "odd", {
			enumerable: false
		});
		this.f = this.g;
		return this.f(numbers);
	},
	g: function (numbers) {
		return [
			numbers.square(),
			numbers.cube(),
			numbers.average(),
			numbers.sum(),
			numbers.even(),
			numbers.odd(),
		];
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

function genSets(subSol) {
	var testSets = [];
	for (let i = 10; i <= 10; i++) {
		var numbers = [];
		for (let j = 0; j < i; j++)
			numbers.push(randNumber(0, 9));
		var match = subSol.f(numbers);
		testSets.push([
			[numbers, ],
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