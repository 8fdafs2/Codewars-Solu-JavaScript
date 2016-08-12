'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/jennys-secret-message

	Jenny has written a function that returns a greeting for a user. 
	However, she's in love with Johnny, 
	and would like to greet him slightly different. 
	She added a special case to her function, but she made a mistake.

	Can you help her?
    `
};
Solution.greet_01 = {
	d: `intuitive`,
	f: function (name) {
		if (name === "Johnny")
			return "Hello, my love!";
		return "Hello, " + name + "!";
	}
};
Solution.greet_02 = {
	d: `? :`,
	f: function (name) {
		return "Hello, " + (name == "Johnny" ? "my love" : name) + "!";
	}
};
Solution.greet_03 = {
	d: `? :`,
	f: function (name) {
		return name == "Johnny" ? "Hello, my love!" : "Hello, " + name + "!";
	}
};
// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randString
}
from './common';

function genSets(greet) {
	var testSets = [];
	for (var i = 10; i <= 200; i++) {
		var name;
		if (randBoolean())
			name = randString(randNumber(3, 8));
		else
			name = "Johnny";
		var match = greet.f(name);
		testSets.push([
			[name, ],
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