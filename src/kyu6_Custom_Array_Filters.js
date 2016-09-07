'use strict';

function g(subsol) {
  subsol.f$();
  let arr = [];
  for (let x = -10; x < 11; ++x) {
    arr.push(x);
    arr.push(x + 0.1);
    arr.push(String(x));
  }
  let ret = [];
  ret.push(arr.even());
  ret.push(arr.odd());
  ret.push(arr.under(-5));
  ret.push(arr.over(5));
  ret.push(arr.inRange(-5, 5));

  return ret;
}

let Solution = {
  /*
http://www.codewars.com/kata/53fc954904a45eda6b00097f

Dave has a lot of data he is required to apply filters to, which are simple enough, but he wants a shorter way of doing so.

He wants the following functions to work as expected:

even    // [1,2,3,4,5].even() should return [2,4]
odd     // [1,2,3,4,5].odd() should return [1,3,5]
under   // [1,2,3,4,5].under(4) should return [1,2,3]
over    // [1,2,3,4,5].over(4) should return [5]
inRange // [1,2,3,4,5].inRange(1,3) should return [1,2,3]
They should also work when used together, for example:

[1,2,18,19,20,21,22,30,40,50,100].even().inRange(18,30) // should return [18, 20, 22, 30]
And finally the filters should only accept integer values from an array, for example:

["a", 1, "b", 300, "x", "q", 63, 122, 181, "z", 0.83, 0.11].even() // should return [300, 122]
  */
};
Solution.subSol_01 = {
  d: `intuitive`,
  f: function () {
    let ret = g(this);
    delete Array.prototype.even;
    delete Array.prototype.odd;
    delete Array.prototype.under;
    delete Array.prototype.over;
    delete Array.prototype.inRange;
    return ret;
  },
  f$: function () {
    Array.prototype.even = function () {
      return this.filter(v => parseInt(v) === v && v % 2 === 0);
    };
    Array.prototype.odd = function () {
      return this.filter(v => parseInt(v) === v && v % 2 !== 0);
    };
    Array.prototype.under = function (x) {
      return this.filter(v => parseInt(v) === v && v < x);
    };
    Array.prototype.over = function (x) {
      return this.filter(v => parseInt(v) === v && v > x);
    };
    Array.prototype.inRange = function (min, max) {
      return this.filter(v => parseInt(v) === v && v >= min && v <= max);
    };
  }
};
Solution.subSol_02 = {
  d: ``,
  f: function () {
    let ret = g(this);
    delete Array.prototype.int;
    delete Array.prototype.even;
    delete Array.prototype.odd;
    delete Array.prototype.under;
    delete Array.prototype.over;
    delete Array.prototype.inRange;
    return ret;
  },
  f$: function () {
    Array.prototype.int = function () {
      return this.filter(function (x) {
        return typeof x == 'number' && x == ~~x;
      });
    };
    Array.prototype.even = function () {
      return this.int().filter(function (x) {
        return ~x & 1;
      });
    };
    Array.prototype.odd = function () {
      return this.int().filter(function (x) {
        return x & 1;
      });
    };
    Array.prototype.under = function (x) {
      return this.int().filter(function (y) {
        return y < x;
      });
    };
    Array.prototype.over = function (x) {
      return this.int().filter(function (y) {
        return y > x;
      });
    };
    Array.prototype.inRange = function (min, max) {
      return this.int().filter(function (x) {
        return x >= min && x <= max;
      });
    };
  }
};
Solution.subSol_03 = {
  d: ``,
  f: function () {
    let ret = g(this);
    delete Array.prototype.even;
    delete Array.prototype.odd;
    delete Array.prototype.under;
    delete Array.prototype.over;
    delete Array.prototype.inRange;
    return ret;
  },
  f$: function () {
    let filters = {
      even: "x % 2 === 0",
      odd: "x % 2 !== 0",
      under: "x < y",
      over: "x > y",
      inRange: "(y <= x) && (x <= z)"
    };
    for (let f in filters) {
      Array.prototype[f] = new Function("y", "z",
        "return this.filter(function(x){return " +
        "typeof(x) == 'number' && x % 1 === 0 && " +
        filters[f] + "})");
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

function genSets(subSol) {
  let testSets = [];
  for (let i = 0; i < 1; ++i) {
    let match = subSol.f();
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
