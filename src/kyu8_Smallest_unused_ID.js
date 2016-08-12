'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/smallest-unused-id

	Hey awesome programmer!

	You've got much data to manage and of course you use zero-based and 
	non-negative ID's to make each data item unique!

	Therefore you need a method, which returns 
	the smallest unused ID for your next new data item...

	Note: The given array of used IDs may be unsorted. 
	For test reasons there may be duplicate IDs, but you don't have to find or remove them!

	Go on and code some pure awesomeness!
    `
};
Solution.nextId_01 = {
	d: `intuitive`,
	f: function (ids) {
		ids.sort((a, b) => (a - b));
		if (ids[0] > 0)
			return 0;
		for (let i = 0; i < ids.length - 1; i++)
			if (ids[i + 1] - ids[i] > 1)
				return ids[i] + 1;
		return ids[ids.length - 1] + 1;
	},
};
Solution.nextId_02 = {
	d: `Set.has`,
	f: function (ids) {
		const idsSet = new Set(ids);
		for (let i = 0; i < idsSet.size + 1; i++)
			if (!idsSet.has(i))
				return i;
	},
};
Solution.nextId_03 = {
	d: `Array.indexOf`,
	f: function (ids) {
		for (let i = 0; i < ids.length + 1; i++)
			if (ids.indexOf(i) == -1)
				return i;
	},
};
Solution.nextId_04 = {
	d: `Array.reduce`,
	f: function (ids) {
		if (ids[0] !== 0)
			return 0;
		return 1 + ids.reduce((a, b) => (b - a) == 1 ? b : a);
	},
};
Solution.nextId_05 = {
	d: `recursion`,
	f: function (ids) {
		if (ids[0] !== 0)
			return 0;
		var recur = function ([head, ...tail]) {
			// console.log(head, tail);
			if (tail.length === 0)
				return head + 1;
			if (tail[0] - head > 1)
				return head + 1;
			return recur(tail);
		};
		return recur(ids);
	},
};

// --------------------------------------------------------------
import {
	randNumber,
}
from './common';

function genSets(nextId) {
	var testSets = [];
	for (let i = 10; i <= 200; i++) {
		var ids = [];
		for (let j = 0; j < i; j++) {
			ids.push(randNumber(0, 10));
		}
		var match = nextId.f(ids);
		testSets.push([
			[ids, ],
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