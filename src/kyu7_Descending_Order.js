'use strict';
var Solution = {
	d: `
    Description
    `
};
Solution.descendingOrder_01 = {
	d: `intuitive`,
	f: function (n) {
		var ret = [];
		var nStr = String(n);
		for (let i = nStr.length - 1; i > -1; i--) {
			ret.push(nStr[i]);
		}
		return Number(ret.sort().reverse().join(''));
	}
};
Solution.descendingOrder_02 = {
	d: `n.toString`,
	f: function (n) {
		return parseInt(n.toString().split('').sort().reverse().join(''));
	}
};
Solution.descendingOrder_03 = {
	d: `'' + n`,
	f: function (n) {
		return parseInt(('' + n).split('').sort().reverse().join(''));
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randArray
}
from './common';

function genSets(descendingOrder) {
	var testSets = [];
	for (let i = 10; i <= 200; i++) {
		var n = randNumber(0, 1000000);
		var match = descendingOrder.f(n);
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