'use strict';

let Solution = {
  /*
http://www.codewars.com/kata/56b4af8ac6167012ec00006f

Here is a new kata that Codewars asked me to do related to interviewing and working in a production setting.

You might be familar with and have used Angular.js. Among other things, it lets you create your own filters that work as functions. You can then put these in a page to perform specific data changes, such as shortening a number to display a more concise notation.

In this kata, we will create a function which returns another function (or process, in Ruby) that shortens very long numbers. Given an initial array of values replace the Xth power of a given base. If the input of the returned function is not a numerical string, it should return the input itself as a string.

Here's an example, which is worth a thousand words:

filter1 = shortenNumber(['','k','m'],1000);
filter1('234324') == '234k';
filter1('98234324') == '98m';
filter1([1,2,3]) == '1,2,3';
filter2 = shortenNumber(['B','KB','MB','GB'],1024);
filter2('32') == '32B';
filter2('2100') == '2KB';
filter2('pippi') == 'pippi';
If you like to test yourself on kata related to actual work and interviews, consider trying this kata where you will build a breadcrumb generator
  */
};

Solution.shortenNumber_01 = {
  d: `intuitive`,
  f: function (num) {
    return this.f$(suffixes, base)(num);
  },
  f$: function (suffixes, base) {
    return function filter(num) {
      if (num === '' || isNaN(num)) return String(num);
      num = Number(num);
      let bases = suffixes.map((_, i) => Math.pow(base, i));
      for (let i = bases.length - 1; i > -1; --i) {
        let numS = Math.floor(num / bases[i]);
        if (numS !== 0) return numS + suffixes[i];
      }
    };
  }
};

Solution.shortenNumber_02 = {
  d: ``,
  f: function (num) {
    return this.f$(suffixes, base)(num);
  },
  f$: function (suffixes, base) {
    return function filter(s) {
      if (String(+s) === s) {
        let n = +s;
        let i = Math.min(~~(Math.log(n) / Math.log(base)), suffixes.length - 1);
        return String(~~(n / Math.pow(base, i))) + suffixes[i];
      } else {
        return String(s);
      }
    };
  }
};

Solution.shortenNumber_03 = {
  d: ``,
  f: function (num) {
    return this.f$(suffixes, base)(num);
  },
  f$: function (suffixes, base) {
    return function (string) {
      if (typeof string != 'string' || !/^[0-9]+$/.test(string)) return string.toString();
      let i = suffixes.length,
        n = +string;
      while (i) {
        let divisor = Math.pow(base, --i);
        if (n >= divisor) return Math.floor(n / divisor) + suffixes[i];
      }
      return string;
    };
  }
};

Solution.shortenNumber_04 = {
  d: ``,
  f: function (num) {
    return this.f$(suffixes, base)(num);
  },
  f$: function (suffixes, base) {
    return function (str) {
      let count = 0;
      while (str > base) {
        str = Math.floor(str / base);
        count++;
        if (count > suffixes.length - 2) break;
      }
      return str + suffixes[count];
    };
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

const suffixes = ['', 'KB', 'MB', 'GB'];
const base = 1024;

function genSets(subSol) {
  let testSets = [];
  for (let i = 0; i < 100; ++i) {
    let num = String(randNumber(0, 1000000000));
    let match = subSol.f(num);
    testSets.push([
      [num, ],
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
