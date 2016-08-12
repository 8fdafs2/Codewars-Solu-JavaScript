'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/greed-is-good

	Greed is a dice game played with five six - sided dice.
	Your mission, should you choose to accept it, is to score a
	throw according to these rules.
	You will always be given an array with five six - sided dice values.

	Three 1 's => 1000 points
	Three 6 's =>  600 points
	Three 5 's =>  500 points
	Three 4 's =>  400 points
	Three 3 's =>  300 points
	Three 2 's =>  200 points
	One 1 => 100 points
	One 5 => 50 point
	A single die can only be counted once in each roll.
	For example, a "5" can only count as part of 
	a triplet(contributing to the 500 points) or as a single 50 points, 
	but not both in the same roll.

	Example scoring

	Throw Score
	-- -- -- -- - -- -- -- -- -- -- -- -- --
	5 1 3 4 1 50 + 2 * 100 = 250
	1 1 1 3 1 1000 + 100 = 1100
	2 4 4 5 4 400 + 50 = 450
    `
};
Solution.score_01 = {
	d: `Object`,
	f: function (dice) {
		var tab = {};
		for (let i = 1; i < 7; i++)
			tab[i] = 0;
		for (let i = 0; i < dice.length; i++) {
			tab[dice[i]]++;
		}
		var ret = 0;
		for (let i in tab) {
			ret += Math.floor(tab[i] / 3) * (i == 1 ? 1000 : i * 100) +
				((i == 1 || i == 5) ? (tab[i] % 3) * (i == 1 ? 100 : 50) : 0);
		}
		return ret;
	}
};
Solution.score_02 = {
	d: `Array`,
	f: function (dice) {
		var tab = [];
		for (let i = 0; i < 7; i++)
			tab.push(0);
		for (let i = 0; i < dice.length; i++) {
			tab[dice[i]]++;
		}
		var ret = 0;
		for (let i in tab) {
			ret += Math.floor(tab[i] / 3) * (i == 1 ? 1000 : i * 100) +
				((i == 1 || i == 5) ? (tab[i] % 3) * (i == 1 ? 100 : 50) : 0);
		}
		return ret;
	}
};
Solution.score_03 = {
	d: `Array, reduce`,
	f: function (dice) {
		var tab = [];
		for (let i = 0; i < 7; i++)
			tab.push(0);
		dice.forEach(function (die) {
			tab[die]++;
		});
		return tab.reduce(function (total, n, i) {
			switch (i) {
			case 1:
				return total + Math.floor(n / 3) * 1000 + (n % 3) * 100;
			case 5:
				return total + Math.floor(n / 3) * 500 + (n % 3) * 50;
			default:
				return total + Math.floor(n / 3) * i * 100;
			}
		}, 0);
	}
};
Solution.score_04 = {
	d: `Array, Arrays`,
	f: function (dice) {
		var dc = [0, 0, 0, 0, 0, 0, 0];
		var tdr = [0, 1000, 200, 300, 400, 500, 600];
		var sdr = [0, 100, 0, 0, 0, 50, 0];
		dice.forEach(function (die) {
			dc[die]++;
		});
		return dc.reduce(function (total, n, i) {
			return total + (n > 2 ? Math.floor(n / 3) * tdr[i] : 0) + (n % 3) * sdr[i];
		}, 0);
	}
};
Solution.score_05 = {
	d: `regex`,
	f: function (dice) {
		var d$ = dice.sort().join(''),
			ret = 0,
			vals = {
				1: 10,
				5: 5
			};
		d$ = d$.replace(/(\d)\1\1/, function (_, d) {
			ret += (vals[d] || d) * 100;
			return '';
		});
		d$ = d$.replace(/[15]/g, function (d) {
			ret += vals[d] * 10;
			return '';
		});
		return ret;
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

function genSets(score) {
	var testSets = [];
	for (let i = 0; i < 1000; i++) {
		var dice = [];
		for (let j = 0; j < 5; j++) {
			dice.push(randNumber(1, 6));
		}
		var match = score.f(dice);
		testSets.push([
			[dice, ],
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