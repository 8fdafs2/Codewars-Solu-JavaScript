'use strict';

function g(generate) {
  let ret = [];
  for (let x = 1; x < 100; x++) {
    ret.push(generate.f$(x).length == x && generate.f$(x).split('').every(x => (x === '1' || x === '0')));
  }
  return ret;
}

let Solution = {
  /*
https://www.codewars.com/kata/genetic-algorithm-series-number-1-generate

A genetic algorithm is based in groups of chromosomes, 
called populations. To start our population of chromosomes 
we need to generate random binary strings with a specified length.

In this kata you have to implement a function generate that 
receives a length and has to return a random binary strign with length characters.

Example:

Generate a chromosome with length of 4 generate(4) could 
return the chromosome 0010, 1110, 1111... or any of 2^4 possibilities.

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
Solution.generate_01 = {
  d: `intuitive`,
  f: function () {
    return g(this);
  },
  f$: function (length) {
    let ret = '';
    while (length--)
      ret += Math.round(Math.random());
    return ret;
  }
};
Solution.generate_02 = {
  d: ``,
  f: function () {
    return g(this);
  },
  f$: function (length) {
    return Array.from(Array(length), x => Math.floor(Math.random() * 2)).join('');
  }
};
Solution.generate_03 = {
  d: ``,
  f: function () {
    return g(this);
  },
  f$: function (length) {
    return Array.from({ length: length }, _ => ~~(Math.random() > 0.5)).join("");
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

function genSets(generate) {
  let testSets = [];
  for (let i = 0; i < 1; i++) {
    let match = generate.f();
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
