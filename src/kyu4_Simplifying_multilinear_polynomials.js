'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/55f89832ac9a66518f000118
    
    When we attended middle school were asked to simplify 
    mathematical expressions like "3x-yx+2xy-x" (or usually bigger), 
    and that was easy-peasy ("2x+xy"). 
    But tell that to your pc and we'll see! 

    Write a function:
        simplify(poly)

    that takes a string in input, 
    representing a multilinear non-constant polynomial in 
    integers coefficients (like "3x-zx+2xy-x"), 
    and returns another string as output where the 
    same expression has been simplified in the following way 
    ( -> means application of simplify):

        All possible sums and subtraction of equivalent 
        monomials ("xy==yx") has been done, e.g.:
        "cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab" 

        All monomials appears in order of increasing 
        number of variables, e.g.:
        "-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz" 

        If two monomials have the same number of variables, 
        they appears in lexicographic order, e.g.:
        "a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz" 

        There is no leading + sign if the first coefficient is positive, e.g.:
        "-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y" 

    N.B. to keep it simplest, the string in input is restricted to 
    represent only multilinear non-constant polynomials, 
    so you won't find something like ' - 3 + yx ^ 2 '. 
    Multilinear means in this context: of degree 1 on each variable.

    Warning: the string in input can contain arbitrary variables 
    represented by lowercase characters in the english alphabet.

    Good Work: )
`
};
Solution.simplify_01 = {
    d: `intuitive`,
    f: function (poly) {
        poly += '+';
        if (poly[0] != '-')
            poly = '+' + poly;
        let hashTab = {};
        for (let i = 0, fac = 0, token, token$ = ''; i < poly.length; i++) {
            token = poly[i];
            if (token == '-' || token == '+') {
                if (token$) {
                    if (token$.length > 1)
                        token$ = token$.split('').sort().join('');
                    if (token$ in hashTab)
                        hashTab[token$] += +fac;
                    else
                        hashTab[token$] = +fac;
                    token$ = '';
                }
                fac = token;
                while (poly[i + 1] > -1) {
                    fac += poly[i + 1];
                    i++;
                }
                if (fac.length == 1)
                    fac += '1';
                fac = +fac;
            } else
                token$ += token;
        }
        let ret = Object.keys(hashTab).filter(key => hashTab[key]).sort(
            (a, b) => a.length - b.length || a > b
        );
        let val;
        ret = ret.map(
            (key, i) => (val = hashTab[key]) == 1 ? key : val == -1 ? '-' + key : val + key
        );
        return ret.join('+').replace(/\+\-/g, '-');
    }
};
Solution.simplify_02 = {
    d: `regex`,
    f: function (poly) {
        let h = {};
        poly.match(/[+-]?[^+-]+/g).forEach(x => {
            let m = x.match(/[a-z]+/)[0];
            let k = x.replace(m, '');
            m = m.split('').sort().join('');
            k = Number(/\d/.test(k) ? k : k + '1');
            h[m] = (h[m] || 0) + k;
        });
        return Object.keys(h)
            .filter(m => h[m])
            .sort((x, y) => x.length - y.length || (x < y ? -1 : 1))
            .map((m, i) => ({
                sign: h[m] < 0 ? '-' : i > 0 ? '+' : '',
                k: Math.abs(h[m]),
                m: m
            }))
            .map(o => o.sign + (o.k == 1 ? '' : o.k) + o.m).join('');
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

function genSets(simplify) {
    let polys = [
        "dc+dcba",
        "2xy-yx",
        "-a+5ab+3a-c-2a",
        "-abc+3a+2ac",
        "xyz-xz",
        "a+ca-ab",
        "xzy+zby",
        "-y+x",
        "y-x",
        "3a+b+4ac+bc-ab+3a-cb-a-a",
        "+n-5hn+7tjhn-4nh-3n-6hnjt+2jhn+9hn",
        "-8fk+5kv-4yk+7kf-qk+yqv-3vqy+4ky+4kf+yvqkf",
        "-15cb-12cb-0c+7cb",
        "-12dy+9yzd-9dyz-13y+8y-10yzd-11yd+15yd+9y",
        "+11x+11x+0xd-12x+5adx+4xd",
        "-0axz-0xz+0axz+0x+4xaz+14x+14zax",
    ];
    let testSets = [];
    for (let i = 0; i < polys.length; i++) {
        let poly = polys[i];
        let match = simplify.f(poly);
        testSets.push([
            [poly, ],
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