'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/printer-errors

	In a factory a printer prints labels for boxes. 
	For one kind of boxes the printer has to use colors which, 
	for the sake of simplicity, are named with letters from a to m.

	The colors used by the printer are recorded in a control string. 
	For example a "good" control string would be aaabbbbhaijjjm meaning that 
	the printer used three times color a, four times color b, then one time color a...

	Sometimes there are problems: lack of colors, 
	technical malfunction and a "bad" control string is 
	produced e.g. aaaxbbbbyyhwawiwjjjwwm.

	You have to write a function printer_error which 
	given a string will output the error rate of the printer as 
	a string representing a rational whose numerator is 
	the number of errors and the denominator the length of the control string. 
	Don't reduce this fraction to a simpler expression.

	The string has a length greater or equal to one and 
	contains only letters from ato z.

	Examples:

	s="aaabbbbhaijjjm"
	error_printer(s) => "0/14"

	s="aaaxbbbbyyhwawiwjjjwwm"
	error_printer(s) => "8/22"
    `
};
Solution.printerError_01 = {
	d: `Set.has`,
	f: function (s) {
		var errRate = 0;
		var colors = new Set('abcdefghijklm');
		for (let i = 0; i < s.length; i++) {
			if (!colors.has(s[i]))
				errRate += 1;
		}
		return String(errRate) + '/' + String(s.length);
	}
};
Solution.printerError_02 = {
	d: `intuitive`,
	f: function (s) {
		var errRate = 0;
		for (let i = 0; i < s.length; i++) {
			if (s[i] > 'm' || s[i] < 'a')
				errRate += 1;
		}
		return errRate + '/' + s.length;
	}
};
Solution.printerError_03 = {
	d: `String.match`,
	f: function (s) {
		var errRate = s.match(/[^a-m]/g);
		return (errRate ? errRate.length : 0) + '/' + s.length;
	}
};
Solution.printerError_04 = {
	d: `String.replace`,
	f: function (s) {
		return s.replace(/[a-m]/g, '').length + '/' + s.length;
	}
};
Solution.printerError_05 = {
	d: `String.repplace`,
	f: s => `${s.replace(/[a-m]/g, '').length}/${s.length}`,
};
Solution.printerError_06 = {
	d: `String.split('').reduce`,
	f: function (s) {
		var errRate = s.split('').reduce((a, b) => (b > 'm' || b < 'a') ? a + 1 : a, 0);
		return `${errRate}/${s.length}`;
	}
};
// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randString,
	randStringBy,
}
from './common';

function genSets(printerError) {
	var testSets = [];
	for (let i = 10; i <= 2000; i++) {
		var s = '';
		if (randBoolean()) {
			s = randStringBy(i, 'abcdefghijklm');
		} else {
			s = randString(i);
		}
		var match = printerError.f(s);
		testSets.push([
			[s, ],
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