'use strict';

function g(mapPopulationFit) {
  const population = ['10100111', '11011100',
    '01101000', '01100111', '01000010', '10001001', '10111100', '11111000', '11001100',
    '00001011', '01011011', '01000111', '11010101', '00101101', '00100111', '00000111',
    '00101000', '00101011', '01011011', '10100001', '00111000', '00010110', '00101100',
    '11111110', '10101001', '11101001', '00011001', '10100011', '11000001', '11010101',
    '11000110', '01111000', '11011000', '00111010', '11110100', '00100111', '10001101',
    '11000100', '01110010', '10011111', '10110101', '11001100', '00110111', '00000100',
    '10010010', '00011000', '10111010', '10001000', '00010011', '01001011', '00100010',
    '01111000', '01110111', '11101011', '00001010', '00000000', '01100011', '00011111',
    '10000001', '01100010', '11011100', '10001100', '01110010', '11011011', '00000111',
    '10100100', '00101101', '00001101', '10010110', '10101110', '00111010', '00011001',
    '11000110', '01010101', '00101000', '00000110', '11001000', '11000110', '01010100',
    '01011010', '00101101', '00011001', '00010101', '10101110', '01100010', '01110101',
    '01111011', '00111000', '11101110', '00110100', '11100100', '01011101', '10000110',
    '11111101', '11000001', '11000111', '11000111', '01011000', '10011011', '10110101'];
  const fitness = (c) => {
    const ideal = '10011001';
    let r = 0;
    for (let i = 0; i < c.length; ++i)
      if (c[i] === ideal[i]) ++r;
    return r / ideal.length;
  };
  let ret;
  ret = mapPopulationFit.f$(population, fitness);
  return ret;
}

let Solution = {
  /*
http://www.codewars.com/kata/567b468357ed7411be00004a

In a genetic algorithm, a population is a collection of 
candidates that may evolve toward a better solution.

We determine how close a chromosome is to a ideal 
solution by calculating its fitness.

You are given two parameters, the population containing 
all individuals and a function fitness that determines 
how close to the solution a chromosome is.

Your task is to return a collection containing an 
object with the chromosome and the calculated fitness.

[
  { chromosome: c, fitness: f },
  { chromosome: c, fitness: f },
  ...
]
Note: In C# you have a pre-loaded class ChromosomeWrap 
and you should return a collection of it instead.

public class ChromosomeWrap
{
    public string Chromosome { get; set; }
    public double Fitness { get; set; }
}
Note: In Python you have a pre-loaded namedtuple ChromosomeWrap 
and you should return a collection of it instead.

ChromosomeWrap = namedtuple("ChromosomeWrap", ["chromosome", "fitness"])
Note: In PHP you have to return an array of associative arrays instead:

// E.g.
array(
  array("chromosome" => $c, "fitness" => $f),
  array("chromosome" => $c, "fitness" => $f),
  // ... 
  array("chromosome" => $c, "fitness" => $f)
);
See other katas from this series

Genetic Algorithm Series - #1 Generate
Genetic Algorithm Series - #2 Mutation
Genetic Algorithm Series - #3 Crossover
Genetic Algorithm Series - #4 Get population and fitnesses
Genetic Algorithm Series - #5 Roulette wheel selection
This kata is a piece of  2 kyu Binary Genetic Algorithm
  */
};
Solution.subSol_01 = {
  d: `intuitive`,
  f: function () {
    return g(this);
  },
  f$: function (population, fitness) {
    return population.map(function (c) {
      return { chromosome: c, fitness: fitness(c) };
    });
  }
};
Solution.subSol_02 = {
  d: ``,
  f: function () {
    return g(this);
  },
  f$: function (population, fitness) {
    return population.map(chromosome => ({ chromosome, fitness: fitness(chromosome) }));
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

function genSets(mapPopulationFit) {
  let testSets = [];
  for (let i = 0; i < 1; i++) {
    let match = mapPopulationFit.f();
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
