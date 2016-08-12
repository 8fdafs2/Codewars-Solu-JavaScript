'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/youre-a-square

	A square of squares

	You like building blocks. 
	You especially like building blocks that are squares. 
	And what you even like more, 
	is to arrange them into a square of square building blocks!

	However, sometimes, you can't arrange them into a square. 
	Instead, you end up with an ordinary rectangle! 
	Those blasted things! If you just had a way to know, 
	whether you're currently working in vain… Wait! That's it! 
	You just have to check if your number of building blocks is a perfect square.

	Task

	Given an integral number, determine if it's a square number:

	In mathematics, 
	a square number or perfect square is an integer that is the square of an integer; 
	in other words, it is the product of some integer with itself.
	The tests will always use some integral number, 
	so don't worry about that in dynamic typed languages.

	Examples

	isSquare(-1) // => false
	isSquare( 3) // => false
	isSquare( 4) // => true
	isSquare(25) // => true
	isSquare(26) // => false
    `
};
Solution.isSquare_01 = {
	d: `intuitive`,
	f: function (n) {
		if (Math.sqrt(n) % 1 === 0)
			return true;
		return false;
	}
};
Solution.isSquare_02 = {
	d: `% 1`,
	f: function (n) {
		return (Math.sqrt(n) % 1 === 0);
	}
};
Solution.isSquare_03 = {
	d: `~~`,
	f: function (n) {
		var nSqrt = Math.sqrt(n);
		return (~~nSqrt == nSqrt);
	}
};
Solution.isSquare_04 = {
	d: `parseInt`,
	f: function (n) {
		var nSqrt = Math.sqrt(n);
		return (parseInt(nSqrt) == nSqrt);
	}
};
Solution.isSquare_05 = {
	d: `isInteger`,
	f: function (n) {
		var nSqrt = Math.sqrt(n);
		return Number.isInteger(nSqrt);
	}
};
Solution.isSquare_06 = {
	d: `| 0`,
	f: function (n) {
		var nSqrt = Math.sqrt(n);
		return (nSqrt == (nSqrt | 0));
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randArray
}
from './common';

function genSets(isSquare) {
	var testSets = [];
	for (let i = 0; i < 200; i++) {
		var n = randNumber(-10, 1000);
		var match = isSquare.f(n);
		testSets.push([
			[n, ],
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