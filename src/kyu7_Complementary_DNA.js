'use strict';
var Solution = {
	d: `
	https://www.codewars.com/kata/complementary-dna

	Deoxyribonucleic acid (DNA) is a chemical found in 
	the nucleus of cells and carries the "instructions" for 
	the development and functioning of living organisms.

	If you want to know more http://en.wikipedia.org/wiki/DNA

	In DNA strings, symbols "A" and "T" are complements of 
	each other, as "C" and "G". 
	You have function with one side of the DNA 
	(string, except for Haskell); 
	you need to get the other complementary side. 
	DNA strand is never empty or there is no DNA at all 
	(again, except for Haskell).

	DNAStrand ("ATTGC") # return "TAACG"

	DNAStrand ("GTAT") # return "CATA"
    `
};
Solution.DNAStrand_01 = {
	d: `replace w tmp`,
	f: function (dna) {
		return dna.
		replace(/A/g, '_').replace(/T/g, 'A').replace(/_/g, 'T').
		replace(/C/g, '_').replace(/G/g, 'C').replace(/_/g, 'G');
	}
};
Solution.DNAStrand_02 = {
	d: `replace`,
	f: function (dna) {
		const complementOf = {
			A: 'T',
			T: 'A',
			C: 'G',
			G: 'C'
		};
		return dna.replace(/./g, x => complementOf[x]);
	}
};
Solution.DNAStrand_03 = {
	d: `map`,
	f: function (dna) {
		const complementOf = {
			A: 'T',
			T: 'A',
			C: 'G',
			G: 'C'
		};
		return dna.split('').map(x => complementOf[x]).join('');
	}
};
Solution.DNAStrand_04 = {
	d: `indexOf`,
	f: function (dna) {
		var ret = '';
		const pairs = 'ATCGTAGC';
		for (let i = 0; i < dna.length; i++)
			ret += pairs[pairs.indexOf(dna[i]) + 4];
		return ret;
	}
};

// --------------------------------------------------------------
import {
	randBoolean,
	randNumber,
	randChoice,
	randString,
	randStringBy,
	range,
}
from './common';

function genSets(DNAStrand) {
	var testSets = [];
	for (let i = 10; i <= 1000; i++) {
		var dna = randStringBy(i, 'ATCG');
		var match = DNAStrand.f(dna);
		testSets.push([
			[dna, ],
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