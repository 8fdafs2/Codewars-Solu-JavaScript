'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/is-a-number-prime

	Define a function isPrime that takes one integer argument and 
	returns true or false depending on if the integer is a prime.

	Per Wikipedia, a prime number (or a prime) is a natural number 
	greater than 1 that has no positive divisors other than 1 and itself.

	Example

	isPrime(5)
	=> true
	Assumptions

	You can assume you will be given an integer input.
	You can not assume that the integer will be only positive. 
	You may be given negative numbers.
	
	Bug!
	The Haskell version uses a wrong test case, 
	where negative primes should also return True, 
	e.g. it expects isPrime (-2) == True. 
	Use abs or similar measures to take care of negative numbers. 
	The test cases cannot get changed at this point. Sorry for the inconvenience.
    `
};
Solution.isPrime_01 = {
	d: ``,
	f: function (num) {
		if (num < 2)
			return false;
		if (num == 2)
			return true;
		if (num % 2 === 0)
			return false;
		var iMax = Math.floor(Math.sqrt(num) + 1);
		for (let i = 3; i < iMax; i += 2) {
			if (num % i === 0)
				return false;
		}
		return true;
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

function genSets(isPrime) {
	var testSets = [];
	for (let num = 2; num <= 1000; num++) {
		var match = isPrime.f(num);
		testSets.push([
			[num, ],
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