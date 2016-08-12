'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/iq-test

	Bob is preparing to pass IQ test.
	The most frequent task in this test is to find out
	which one of the given numbers differs from the others.
	Bob observed that one number usually differs from the others in evenness.
	Help Bob— to check his answers,
	he needs a program that among the given numbers finds
	one that is different in evenness, and
	return a position of this number.

	!Keep in mind that your task is to help Bob solve a real IQ test,
	which means indexes of the elements start from 1(not 0)

	Examples:

	iqTest("2 4 7 8 10") => 3 // Third number is odd, 
	while the rest of the numbers are even

	iqTest("1 2 1 1") => 2 // Second number is even, 
	while the rest of the numbers are odd
    `
};
Solution.iqTest_01 = {
	d: `intuitive`,
	f: function (numbers) {
		var i_evens = [];
		var i_odds = [];
		numbers = numbers.split(' ').map(x => Number(x));
		for (let i = 0; i < numbers.length; i++) {
			if (numbers[i] % 2 === 0)
				i_evens.push(i);
			else
				i_odds.push(i);
			if (i_odds.length > 1 && i_evens.length > 0)
				return i_evens[0] + 1;
			if (i_evens.length > 1 && i_odds.length > 0)
				return i_odds[0] + 1;
		}
	}
};
Solution.iqTest_02 = {
	d: `first 3`,
	f: function (numbers) {
		numbers = numbers.split(' ').map(x => Number(x));
		var flag = numbers.slice(0, 3).map(x => x % 2).reduce((a, b) => a + b);
		if (flag < 2)
			for (let i = 0; i < numbers.length; i++) {
				if (numbers[i] % 2) return i + 1;
			}
		else
			for (let i = 0; i < numbers.length; i++) {
				if (!(numbers[i] % 2)) return i + 1;
			}
	}
};
Solution.iqTest_03 = {
	d: `intuitive`,
	f: function (numbers) {
		numbers = numbers.split(' ').map(x => Number(x));
		for (let i = 0; i < numbers.length; i++) {
			if (numbers[i] % 2 === 0) {
				if (i_even !== undefined && i_odd !== undefined)
					return i_odd;
				var i_even = i + 1;
			} else {
				if (i_odd !== undefined && i_even !== undefined)
					return i_even;
				var i_odd = i + 1;
			}
		}
		return numbers.length;
	}
};
Solution.iqTest_04 = {
	d: `regex`,
	f: function (numbers) {
		var pattern;
		if (/[02468]\b.*[02468]\b/.test(numbers))
			pattern = /\d*[13579]\b/;
		else
			pattern = /\d*[02468]\b/;
		return 1 + numbers.split(' ').indexOf(numbers.match(pattern)[0]);
	}
};
Solution.iqTest_05 = {
	d: `% 2 map`,
	f: function (numbers) {
		numbers = numbers.split(' ').map(x => parseInt(x) % 2);
		if (numbers[0] + numbers[1] + numbers[2] < 2)
			return numbers.indexOf(1) + 1;
		return numbers.indexOf(0) + 1;
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

function genSets(iqTest) {
	var testSets = [];
	for (let i = 10; i <= 200; i++) {
		var numbers;
		if (randBoolean()) {
			numbers = range(2, i, 2);
			numbers[randNumber(0, numbers.length - 1)] = 3;
			numbers = numbers.join(' ');
		} else {
			numbers = range(1, i, 2);
			numbers[randNumber(0, numbers.length - 1)] = 4;
			numbers = numbers.join(' ');
		}
		var match = iqTest.f(numbers);
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