'use strict';

function g(mutate) {

  const zero = Array(101).join('0');
  const one = Array(101).join('1');

  let ret = [];
  ret.push(mutate.f$(zero, Math.random()).length == 100);
  ret.push(mutate.f$(one, Math.random()).length == 100);
  // 100% mutate
  ret.push(mutate.f$(zero, 1), one);
  ret.push(mutate.f$(one, 1), zero);
  // 0% mutate
  ret.push(mutate.f$(zero, 0), zero);
  ret.push(mutate.f$(one, 1), one);
  // 50% mutate
  ret.push(Array.from(mutate.f$(zero, 0.5)).some(x => x == '1'));
  ret.push(Array.from(mutate.f$(one, 0.5)).some(x => x == '0'));
  return ret;
}

let Solution = {
  /*
http://www.codewars.com/kata/567b39b27d0a4606a5000057

Mutation is a genetic operator used to maintain genetic 
diversity from one generation of a population of 
genetic algorithm chromosomes to the next.

Mutation

A mutation here may happen on zero or more positions 
in a chromosome. It is going to check every position and 
by a given probability it will decide if a mutation will occur.

A mutation is the change from 0 to 1 or from 1 to 0.

Note: Some tests are random. If you think your algorithm is 
correct but the result fails, trying again should work.

See other katas from this series

Genetic Algorithm Series - #1 Generate
Genetic Algorithm Series - #2 Mutation
Genetic Algorithm Series - #3 Crossover
Genetic Algorithm Series - #4 Get population and fitnesses
Genetic Algorithm Series - #5 Roulette wheel selection
This kata is a piece of  2 kyu Binary Genetic Algorithm
  */
};
Solution.mutate_01 = {
  d: `intuitive`,
  f: function () {
    return g(this);
  },
  f$: function (chromosome, p) {
    return chromosome.split('').map(bit => Math.random() < p ? (bit == '1' ?
      '0' : '1') : bit).join('');
  }
};
Solution.mutate_02 = {
  d: ``,
  f: function () {
    return g(this);
  },
  f$: function (chromosome, p) {
    let mutation = '';
    for (let i = 0; i < chromosome.length; ++i)
      mutation += Math.random() <= p ? chromosome[i] ^ 1 : chromosome[i];
    return mutation;
  }
};
Solution.mutate_03 = {
  d: ``,
  f: function () {
    return g(this);
  },
  f$: function (chromosome, p) {
    return chromosome.replace(/./g, m => m ^ (Math.random() < p));
  }
};

// --------------------------------------------------------------
import {
  arrayManip,
  stringManip,
  randBoolean,
  randNumber,
  randChoice,
  randString,
  randStringBy,
  range,
}
from './common';

function genSets(mutate) {
  let testSets = [];
  for (let i = 0; i < 1; i++) {
    let match = mutate.f();
    testSets.push([
      [],
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
let testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);
