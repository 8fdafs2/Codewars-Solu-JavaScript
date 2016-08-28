'use strict';

function g(subSol, asciiStr) {
  delete String.prototype.toBase64;
  delete String.prototype.fromBase64;
  subSol();
  let ret = [];
  ret.push(asciiStr.toBase64());
  ret.push(ret[0].fromBase64());
  return ret;
}

let Solution = {
  d: `
    Description
    `
};
Solution.subSol_01 = {
  d: `built-in`,
  f: function (asciiStr) {
    return g(this.f$, asciiStr);
  },
  f$: function () {
    String.prototype.toBase64 = function () {
      return Buffer.from(this.toString(), 'ascii').toString('base64');
      // return Buffer.from(this.valueOf(), 'ascii').toString('base64');
      // return Buffer.from(this + '', 'binary').toString('base64');
    };
    String.prototype.fromBase64 = function () {
      return Buffer.from(this.toString(), 'base64').toString('ascii');
      // return Buffer.from(this.valueOf(), 'base64').toString('ascii');
      // return Buffer.from(this = '', 'base64').toString('ascii');
    };
  }
};
Solution.subSol_02 = {
  d: `intuitive`,
  f: function (asciiStr) {
    return g(this.f$, asciiStr);
  },
  f$: function () {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    String.prototype.toBase64 = function () {
      let l = this.length;
      let r = l % 3;
      let ret = '';
      let j = 0;
      let c;
      for (; j < l - r; j += 3) {
        c = [
                    this.charCodeAt(j),
                    this.charCodeAt(j + 1),
                    this.charCodeAt(j + 2),
                ];
        ret += letters.charAt(c[0] >> 2);
        ret += letters.charAt(((c[0] & 3) << 4) | (c[1] >> 4));
        ret += letters.charAt(((c[1] & 15) << 2) | (c[2] >> 6));
        ret += letters.charAt(c[2] & 63);
      }
      if (r == 1) {
        c = [this.charCodeAt(j), this.charCodeAt(j + 1)];
        ret += letters.charAt(c[0] >> 2);
        ret += letters.charAt((c[0] & 3) << 4);
        ret += '==';
      } else if (r == 2) {
        c = [this.charCodeAt(j), this.charCodeAt(j + 1)];
        ret += letters.charAt(c[0] >> 2);
        ret += letters.charAt(((c[0] & 3) << 4) | (c[1] >> 4));
        ret += letters.charAt((c[1] & 15) << 2);
        ret += '=';
      }
      return ret;
    };
    String.prototype.fromBase64 = function () {
      let l = this.length;
      if (l < 4)
        return '';
      let ret = '';
      let j = 0;
      let c;
      for (; j < l - 4; j += 4) {
        c = [
                    letters.indexOf(this.charAt(j)),
                    letters.indexOf(this.charAt(j + 1)),
                    letters.indexOf(this.charAt(j + 2)),
                    letters.indexOf(this.charAt(j + 3)),
                ];
        ret += String.fromCharCode((c[0] << 2) | (c[1] >> 4));
        ret += String.fromCharCode(((c[1] & 15) << 4) | (c[2] >> 2));
        ret += String.fromCharCode(((c[2] & 3) << 6) | c[3]);
      }
      c = [
                letters.indexOf(this.charAt(j)),
                letters.indexOf(this.charAt(j + 1)),
                letters.indexOf(this.charAt(j + 2)),
                letters.indexOf(this.charAt(j + 3)),
            ];
      if (c[2] < 0) {
        ret += String.fromCharCode((c[0] << 2) | (c[1] >> 4));
      } else if (c[3] < 0) {
        ret += String.fromCharCode((c[0] << 2) | (c[1] >> 4));
        ret += String.fromCharCode(((c[1] & 15) << 4) | (c[2] >> 2));
      } else {
        ret += String.fromCharCode((c[0] << 2) | (c[1] >> 4));
        ret += String.fromCharCode(((c[1] & 15) << 4) | (c[2] >> 2));
        ret += String.fromCharCode(((c[2] & 3) << 6) | c[3]);
      }
      return ret;
    };
  }
};
Solution.subSol_03 = {
  d: `string`,
  f: function (asciiStr) {
    return g(this.f$, asciiStr);
  },
  f$: function () {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    String.prototype.toBase64 = function () {
      let r = this.length % 3;
      let nPadZero = r === 0 ? 0 : r == 1 ? 4 : 2;
      return (this.split('').map(function (val) {
        return ("00000000" + val.charCodeAt(0).toString(2)).slice(-8);
      }).join('') + '0'.repeat(nPadZero)).match(/.{6}/g).map(function (val) {
        return t[parseInt(val, 2)];
      }).join('') + '='.repeat(nPadZero >> 1);
    };
    String.prototype.fromBase64 = function () {
      return this.split('').map(function (val) {
        return ("000000" + t.indexOf(val).toString(2)).slice(-6);
      }).join('').match(/.{8}/g).map(function (val) {
        return val == '00000000' ? '' : String.fromCharCode(parseInt(val, 2));
      }).join('');
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

function genSets(subSol) {
  let testSets = [];
  for (let i = 10; i < 1000; i++) {
    let asciiStr = randString(i);
    let match = subSol.f(asciiStr);
    testSets.push([
            [asciiStr, ],
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
testFixture.testSpd(10);
