'use strict';

function g(select) {

  let ret = [];

  let population = [1, 2, 3];
  let fitnesses = [0.05, 0.05, 0.90];

  for (let n = 0; n < 10; ++n) {
    let results = [];
    for (let i = 0; i < 10; ++i)
      results.push(select.f$(population, fitnesses));
    let threes = results.filter(x => x == 3).length;
    ret.push(threes >= 6);
  }

  population = [0, 42, 1337];
  fitnesses = [1e-20, 0.55, 0.99999999];

  population.push(...(Array.from(Array(50), x => Math.random())));
  fitnesses.push(...(Array.from(Array(50), x => 0.01 * Math.random())));

  for (let n = 0; n < 10; ++n) {
    let results = [];
    for (let i = 0; i < 15; ++i) {
      results.push(select.f$(population, fitnesses));
    }
    let l33t = results.filter(x => x == 1337).length;
    let isMostRet = results.filter(x => x != 42 && x != 1337).every(x => {
      let r = results.filter(y => x == y);
      return l33t > r.length;
    });
    ret.push(isMostRet);
    ret.push(results.some(x => x == 1337));
    ret.push(results.some(x => x == 42));
    ret.push(!results.some(x => x === 0));
  }

  return ret;
}

let Solution = {
  /*
http://www.codewars.com/kata/567b21565ffbdb30e3000010

The "Roulette wheel selection", 
also known as "Fitness proportionate selection", 
is a genetic operator used in genetic algorithms for 
selecting potentially useful solutions for recombination.

Your task is to implement it.

roulette

You throw a coin in and has a chance to fall in one of the slots, 
the higher the fitness the higher the chance the element has to be selected.

Given the population and fitnesses, 
your task is to run the roulette to return one element.

Note: Some tests are random. 
If you think your algorithm is correct but the result fails, 
trying again should work.

See other katas from this series

Genetic Algorithm Series - #1 Generate
Genetic Algorithm Series - #2 Mutation
Genetic Algorithm Series - #3 Crossover
Genetic Algorithm Series - #4 Get population and fitnesses
Genetic Algorithm Series - #5 Roulette wheel selection
This kata is a piece of  2 kyu Binary Genetic Algorithm
  */
};
Solution.select_01 = {
  d: `intuitive`,
  f: function () {
    return g(this);
  },
  f$: function (population, fitnesses) {
    let r = Math.random() * fitnesses.reduce((a, b) => a + b);
    let s = 0;
    for (let i = 0; i < population.length; ++i) {
      s += fitnesses[i];
      if (s > r) return population[i];
    }
  }
};
Solution.select_02 = {
  d: ``,
  f: function () {
    return g(this);
  },
  f$: function (population, fitnesses) {
    const p = Math.random() * fitnesses.reduce((a, b) => a + b);
    let i = 0;
    let ac = 0;
    do ac += fitnesses[i++]; while (ac < p);
    return population[i - 1];
  }
};
Solution.select_03 = {
  d: ``,
  f: function () {
    return g(this);
  },
  f$: function (population, fitnesses) {
    let weight = Math.random() * fitnesses.reduce((a, b) => a + b);
    for (let i = 0; i < population.length; ++i) {
      if (weight < fitnesses[i]) return population[i];
      weight -= fitnesses[i];
    }
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

function genSets(select) {
  let testSets = [];
  for (let i = 0; i < 1; i++) {
    let match = select.f();
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
