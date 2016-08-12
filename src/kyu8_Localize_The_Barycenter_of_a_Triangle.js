'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/localize-the-barycenter-of-a-triangle

	The medians of a triangle are the segments that unit the vertices with 
	the midpoint of their opposite sides. 
	The three medians of a triangle intersect at the same point, 
	called the barycenter or the centroid. 
	Given a triangle, defined by the cartesian coordinates of 
	its vertices we need to localize its barycenter or centroid.

	The function bar_triang() or barTriang or bar-triang, 
	receives the coordinates of the three vertices A, B and C as 
	three different arguments and outputs the coordinates of the barycenter O in an array [xO, yO]

	This is how our asked function should work: the result of 
	the coordinates should be expressed up to four decimals, (rounded result).

	You know that the coordinates of the barycenter are given by the following formulas.

	source: imgur.com

	For additional information about this important point of a triangle see at: 
	(https://en.wikipedia.org/wiki/Centroid)

	Let's see some cases:

	barTriang([4, 6], [12, 4], [10, 10]) ------> [8.6667, 6.6667]

	barTriang([4, 2], [12, 2], [6, 10]) ------> [7.3333, 4.6667]
	The given points form a real or a degenerate triangle but in each case the above formulas can be used.

	Enjoy it and happy coding!!
    `
};
Solution.barTriang_01 = {
	d: `Math.round`,
	f: function (p1, p2, p3) {
		var c1 = [(p1[0] + p2[0] + p3[0]) / 3, (p1[1] + p2[1] + p3[1]) / 3];
		return c1.map(x => Math.round(x * 10000) / 10000);
	},
};
Solution.barTriang_02 = {
	d: `toFix`,
	f: function (p1, p2, p3) {
		var c1 = [(p1[0] + p2[0] + p3[0]) / 3, (p1[1] + p2[1] + p3[1]) / 3];
		return c1.map(x => x.toFixed(4));
	},
};

// --------------------------------------------------------------
import {
	randNumber,
}
from './common';

function genSets(barTriang) {
	var testSets = [];
	for (var i = 10; i <= 200; i++) {
		var p1 = [randNumber(1, 100), randNumber(1, 100)];
		var p2 = [randNumber(1, 100), randNumber(1, 100)];
		var p3 = [randNumber(1, 100), randNumber(1, 100)];
		var match = barTriang.f(p1, p2, p3);
		testSets.push([
			[p1, p2, p3, ],
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