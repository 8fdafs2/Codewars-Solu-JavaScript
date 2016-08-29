'use strict';
let Solution = {
  /*
http://www.codewars.com/kata/567d71b93f8a50f461000019

In genetic algorithms, crossover is a genetic operator used 
to vary the programming of chromosomes from one generation to the next.

The one-point crossover consists in swapping one's cromosome 
part with another in a specific given point. 
The image bellow shows the crossover being applied on 
chromosomes 1011011001111 and 1011100100110 with the cut point (index) 4:

In this kata you have to implement a function crossover 
that receives two chromosomes chromosome1, chromosome2 and 
a zero-based index and it has to return an array with the 
crossover result on both chromosomes [chromosome1, chromosome2].

Example:

crossover('111000', '000110', 3) should return ['111110', 000000']

See other katas from this series

Genetic Algorithm Series - #1 Generate
Genetic Algorithm Series - #2 Mutation
Genetic Algorithm Series - #3 Crossover
Genetic Algorithm Series - #4 Get population and fitnesses
Genetic Algorithm Series - #5 Roulette wheel selection
This kata is a piece of  2 kyu Binary Genetic Algorithm
  */
};
Solution.crossover_01 = {
  d: `substr`,
  f: function (chromosome1, chromosome2, index) {
    return [chromosome1.substr(0, index) + chromosome2.substr(index),
            chromosome2.substr(0, index) + chromosome1.substr(index)];
  }
};
Solution.crossover_02 = {
  d: `substring`,
  f: function (chromosome1, chromosome2, index) {
    return [chromosome1.substring(0, index) + chromosome2.substring(index),
            chromosome2.substring(0, index) + chromosome1.substring(index)];
  }
};
Solution.crossover_03 = {
  d: `slice`,
  f: function (chromosome1, chromosome2, index) {
    return [chromosome1.slice(0, index) + chromosome2.slice(index),
            chromosome2.slice(0, index) + chromosome1.slice(index)];
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

function genSets(crossover) {
  let testSets = [];
  for (let i = 3; i < 100; i++) {
    let chromosome1 = randStringBy(i, '01');
    let chromosome2 = randStringBy(i, '01');
    let index = randNumber(0, i - 1);
    let match = crossover.f(chromosome1, chromosome2, index);
    testSets.push([
      [chromosome1, chromosome2, index],
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
