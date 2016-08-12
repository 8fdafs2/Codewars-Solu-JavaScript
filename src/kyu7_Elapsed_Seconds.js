'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/517b25a48557c200b800000c

	Complete the function so that it returns the 
	number of seconds that have elapsed between 
	the start and end times given.

	Tips:

	The start/end times are given as 
	Date (JS/CoffeeScript) and Time (Ruby) instances.
	The start time will always be before the end time.
    `
};
Solution.elapsedSeconds_01 = {
	d: `getTime -`,
	f: function (startDate, endDate) {
		return (endDate.getTime() - startDate.getTime()) / 1000;
	}
};
Solution.elapsedSeconds_02 = {
	d: `-`,
	f: function (startDate, endDate) {
		return (endDate - startDate) / 1000;
	}
};
Solution.elapsedSeconds_03 = {
	d: `Hours Minutes Seconds`,
	f: function (startDate, endDate) {
		return startDate.getHours() * 3600 +
			startDate.getMinutes() * 60 +
			startDate.getSeconds() -
			endDate.getHours() * 3600 +
			endDate.getMinutes() * 60 +
			endDate.getSeconds();
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

function genSets(elapsedSeconds) {
	var testSets = [];
	for (let i = 0; i < 200; i++) {
		var startDate = new Date(randNumber(2000, 2016),
			randNumber(1, 12), randNumber(1, 29), 0, 0, 0);
		var endDate = new Date(startDate + randNumber(1000000, 100000000));
		var match = elapsedSeconds.f(startDate, endDate);
		testSets.push([
			[startDate, endDate, ],
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