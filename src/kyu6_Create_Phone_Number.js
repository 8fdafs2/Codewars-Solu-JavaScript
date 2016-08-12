'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/create-phone-number

	Write a function that accepts an array of 10 integers 
	(between 0 and 9), that returns a string of those numbers 
	in the form of a phone number.

	Example:

	createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => 
	returns "(123) 456-7890"
	The returned format must be correct in order to 
	complete this challenge. 
	Don't forget the space after the closing parenthese!
    `
};
Solution.createPhoneNumber_01 = {
	d: `intuitive`,
	f: function (numbers) {
		return '(' + numbers[0] + numbers[1] + numbers[2] + ')' +
			' ' + numbers[3] + numbers[4] + numbers[5] + '-' +
			numbers[6] + numbers[7] + numbers[8] + numbers[9];
	}
};
Solution.createPhoneNumber_02 = {
	d: `String.substring`,
	f: function (numbers) {
		numbers = numbers.join('');
		return '(' + numbers.substring(0, 3) + ')' +
			' ' + numbers.substring(3, 6) + '-' +
			numbers.substring(6);
	}
};
Solution.createPhoneNumber_03 = {
	d: `String.replace`,
	f: function (numbers) {
		var ret = '(xxx) xxx-xxxx';
		for (let i = 0; i < numbers.length; i++)
			ret = ret.replace('x', numbers[i]);
		return ret;
	}
};
Solution.createPhoneNumber_04 = {
	d: `String.replace`,
	f: function (numbers) {
		return numbers.join('').replace(/(...)(...)(....)/, '($1) $2-$3');
	}
};
Solution.createPhoneNumber_05 = {
	d: `Array.unshift, Array.splice`,
	f: function (numbers) {
		numbers.unshift('(');
		numbers.splice(4, 0, ')', ' ');
		numbers.splice(9, 0, '-');
		return numbers.join('');
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
	for (let i = 0; i < 100; i++) {
		var numbers = [];
		for (let j = 0; j < 10; j++)
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