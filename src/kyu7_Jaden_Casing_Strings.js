'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/jaden-casing-strings

	Jaden Smith, the son of Will Smith, 
	is the star of films such as The Karate Kid (2010) and After Earth (2013). 
	Jaden is also known for some of his philosophy that he delivers via Twitter. 
	When writing on Twitter, he is known for almost always capitalizing every word.

	Your task is to convert strings to how they would be written by Jaden Smith. 
	The strings are actual quotes from Jaden Smith, 
	but they are not capitalized in the same way he originally typed them.

	Example:

	Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
	Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
	Note that the Java version expects a return value of null for an empty string or null.
    `
};
Solution.toJadenCase_01 = {
	d: `intuitive`,
	f: function (str) {
		String.prototype.toJadenCase = function () {
			var newString = '';
			var i = 1;
			newString += this.charAt(0).toUpperCase();
			while (i < this.length) {
				if (this.charAt(i) == ' ') {
					newString += ' ' + this.charAt(i + 1).toUpperCase();
					i += 2;
				} else {
					newString += this.charAt(i);
					i++;
				}
			}
			return newString;
		};
		this.f = function (str) {
			return str.toJadenCase();
		};
		return this.f(str);
	}
};
Solution.toJadenCase_02 = {
	d: `split, map`,
	f: function (str) {
		String.prototype.toJadenCase = function () {
			return this.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
		};
		this.f = function (str) {
			return str.toJadenCase();
		};
		return this.f(str);
	}
};
Solution.toJadenCase_03 = {
	d: `regex`,
	f: function (str) {
		String.prototype.toJadenCase = function () {
			return this.replace(/(^|\s)[a-z]/g, x => x.toUpperCase());
		};
		this.f = function (str) {
			return str.toJadenCase();
		};
		return this.f(str);
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randString
}
from './common';

function genSets(toJadenCase) {
	var testSets = [];
	for (let i = 10; i <= 200; i++) {
		var str = [];
		for (let j = 0; j < i; j++) {
			str.push(randString(randNumber(3, 8)));
		}
		str = str.join(' ');
		var match = toJadenCase.f(str);
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
testFixture.test();