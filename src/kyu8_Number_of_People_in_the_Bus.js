'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/number-of-people-in-the-bus

	There is a bus moving in the city,
	and it takes and drop some people in each bus stop.

	You are provided a list(or array in JS) of integer array.
	Each integer array has two items which represent number of
	people get into bus(The first item) and number of 
	people get off the bus(The second item).

	The first integer array has 0 number in the second item,
	since the bus is empty in the first bus stop.

	Your task is to
	return number of people in the bus after the last bus station.
	Take a look on the test cases: )

	Please keep in mind that the test cases ensure that the number of
	people in the bus is always >= 0.
	So the return integer can 't be negative.
    `
};
Solution.number_01 = {
	d: `Array.reduce`,
	f: function (busStops) {
		var [a, b] = busStops.reduce((x, y) => [x[0] + y[0], x[1] + y[1]]);
		return a - b;
	}
};
Solution.number_02 = {
	d: `Array.reduce`,
	f: function (busStops) {
		return busStops.map(([a, b]) => a - b).reduce((x, y) => x + y);
	}
};
Solution.number_03 = {
	d: `Array.reduce`,
	f: function (busStops) {
		return busStops.reduce((x, [a, b]) => x + a - b, 0);
	}
};
Solution.number_04 = {
	d: `Array.forEach`,
	f: function (busStops) {
		var ret = 0;
		busStops.forEach(([a, b]) => ret += a - b);
		return ret;
	}
};
Solution.number_05 = {
	d: `eval`,
	f: function (busStops) {
		var ret = 0;
		for (let i = 0; i < busStops.length; i++) {
			ret += eval(busStops[i].join('-'));
		}
		return ret;
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randArray
}
from './common';

function genSets(number) {
	var testSets = [];
	for (let i = 10; i <= 200; i++) {
		var busStops = [];
		for (let j = 0; j < i; j++) {
			busStops.push([randNumber(0, 10), randNumber(0, 10)]);
		}
		var match = number.f(busStops);
		testSets.push([
			[busStops, ],
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