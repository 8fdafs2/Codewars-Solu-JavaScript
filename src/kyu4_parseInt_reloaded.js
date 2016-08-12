'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/parseint-reloaded

    In this kata we want to convert a string into an integer.
    The strings simply represent the numbers in keys.

    Examples:

        "one" => 1 
        "twenty" => 20 
        "two hundred forty-six" => 246 
        "seven hundred eighty-three thousand nine hundred and nineteen" => 783919
    
    Additional Notes:

        The minimum number is "zero" (inclusively)
    
    The maximum number, which must be supported is 1 million(inclusively)
    The "and" in e.g. "one hundred and twenty-four"
    is optional, in some cases it's present and in others it's 
    not All tested numbers are valid, you don't need to validate them
    `
};
Solution.parseInt_01 = {
    d: `intuitive`,
    f: function (string) {
        const Nums = {
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11,
            twelve: 12,
            thirteen: 13,
            fourteen: 14,
            fifteen: 15,
            sixteen: 16,
            seventeen: 17,
            eighteen: 18,
            nineteen: 19,
            twenty: 20,
            thirty: 30,
            forty: 40,
            fifty: 50,
            sixty: 60,
            seventy: 70,
            eighty: 80,
            ninety: 90,
        };
        const Factor = {
            hundred: 100,
            thousand: 1000,
            million: 1000000,
            billion: 1000000000,
        };
        let keys = string.split(/ |\-/).filter(w => w != 'and');
        // three levels
        let ret$0 = 0;
        let ret$1 = 0;
        let ret$2 = 0;
        let lastFactor = Factor.billion;
        for (let i = 0, key, f; i < keys.length; i++) {
            key = keys[i];
            if (key in Nums) { // Nums
                ret$0 += Nums[key];
            } else {
                f = Factor[key];
                if (lastFactor > f) {
                    ret$0 *= f;
                    ret$1 += ret$0;
                    ret$0 = 0;
                } else {
                    ret$1 += ret$0;
                    ret$1 *= f;
                    ret$2 += ret$1;
                    ret$0 = 0;
                    ret$1 = 0;
                }
                lastFactor = f;
            }
        }
        ret$1 += ret$0;
        ret$1 *= 1;
        ret$2 += ret$1;
        return ret$2;
    }
};
Solution.parseInt_02 = {
    d: `elegant`,
    f: function (string) {
        let Nums = {
            // zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11,
            twelve: 12,
            thirteen: 13,
            fourteen: 14,
            fifteen: 15,
            sixteen: 16,
            seventeen: 17,
            eighteen: 18,
            nineteen: 19,
            twenty: 20,
            thirty: 30,
            forty: 40,
            fifty: 50,
            sixty: 60,
            seventy: 70,
            eighty: 80,
            ninety: 90
        };
        var Factors = {
            hundred: 100,
            thousand: 1000,
            million: 1000000
        };
        return string.split(/ |-/).reduce(function (ret, w) {
            if (Nums[w])
                ret += Nums[w];
            else if (Factors[w]) {
                let ret$ = ret % Factors[w];
                ret += Factors[w] * ret$ - ret$;
            }
            return ret;
        }, 0);
    }
};
Solution.parseInt_03 = {
    d: `eval`,
    f: function (string) {
        const Nums = {
            zero: '0',
            one: '1',
            two: '2',
            three: '3',
            fourt: '4',
            four: '4',
            five: '5',
            sixt: '6',
            six: '6',
            sevent: '7',
            seven: '7',
            eight: '8',
            ninet: '9',
            nine: '9',
            ten: '10',
            eleven: '11',
            twelve: '12',
            thirt: '3',
            fort: '4',
            fift: '5',
            twent: '2',
            een: '+10',
            y: '*10',
            hundred: '*100+', // before hundred there will only be single number 1~9
            thousand: ')*1000+',
            million: ')*1000000+',
            and: '',
            '-': '+',
        };
        for (let n in Nums)
            string = string.replace(RegExp(n, 'g'), Nums[n]);
        return eval(((string.match(/\)/g)) ? '(' : '') + string.replace(/\+(?= \))/g, '').replace(/\+(?=$)/, ''));
    }
};
Solution.parseInt_04 = {
    d: `compact`,
    f: function (string) {
        /* Explaination of p(Nums[p(s, 36) * 1.58 % 56 | 0], 36);
        // parseInt is the *real* parseInt, not this function
        var wordNumber = parseInt(word, 36);
        var index = Math.floor((wordNumber * 1.58) % 56);
        // numberArray is that crazy string split on spaces
        var wordValue = parseInt(numberArray[index], 36);
        */
        // generate hard-coded hashString
        function hashStringGen() {
            const words = {
                "zero": 0,
                "one": 1,
                "two": 2,
                "three": 3,
                "four": 4,
                "five": 5,
                "six": 6,
                "seven": 7,
                "eight": 8,
                "nine": 9,
                "ten": 10,
                "eleven": 11,
                "twelve": 12,
                "thirteen": 13,
                "fourteen": 14,
                "fifteen": 15,
                "sixteen": 16,
                "seventeen": 17,
                "eighteen": 18,
                "nineteen": 19,
                "twenty": 20,
                "thirty": 30,
                "forty": 40,
                "fifty": 50,
                "sixty": 60,
                "seventy": 70,
                "eighty": 80,
                "ninety": 90,
                "hundred": 100,
                "thousand": 1000,
                "million": 1000000,
            };

            function gen(fac = 1.0) {
                let string = Array(56);
                for (let word in words) {
                    let wordNum = parseInt(word, 36);
                    let index = wordNum * fac % 56 | 0;
                    if (string[index] !== undefined) {
                        return;
                    }
                    string[index] = words[word].toString(36);
                }
                return string;
            }

            let fac = 1.0;
            let ret = '';
            while (1) {
                ret = gen(fac);
                if (ret)
                    return ret;
                else
                    fac += 0.01;
            }
        }

        let p = global.parseInt;

        const Nums = '  8 6  u    7 c rs    a 4 1o 1 9 i 28  2s      b 5  2 lfls h  1y d g e j f     0 k    3 2i 14 1e'.split(' ');

        return string.replace(/\band\b|-/g, ' ').split(/ +/).map(function (s) {
            return p(Nums[p(s, 36) * 1.58 % 56 | 0], 36);
        }).reduce(function (ret, n) {
            let z = /0*$/.exec(n)[0].length;
            let zz = Math.pow(10, z);
            return z < 2 ? ret + n : (ret / zz | 0) * zz + (ret % zz * n);
        }, 0);

    }
};
Solution.parseInt_05 = {
    d: `compact`,
    f: function (string) {
        return string.split(/ |-/).reduce(function (a, e, i) {
            /*
            MAP:
                eleven => 1
                million => 999989
                one => 1
                two/twelve/twenty => 2
                three/thirteen/thirty/thousand => 3
                four/fourteen/forty => 4
                five/fifteen/fifty => 5
                six/sixteen/sixty => 6
                seven/seventeen/seventy => 7
                eight/eighteen/eighty => 8
                nine/nineteen/ninety => 9
                ten => 10
             */
            string = {
                el: 1,
                mi: 999989
            }[i = e[0] + e[1]] | '_ontwthfofisiseeinite'.indexOf(i) / 2 + 0.5;
            return (e[5] < 'b' ? a * 999 : i == 'hu' ? a % 1e3 * 99 : /y/.test(e) ? string * 10 : e[5] ? string + 10 : string) + a;
            /*
            BREAK-DOWN:
                if (e[5] < 'b') // thousand
                    return a * 999 + a;
                if (i == 'hu') // hundred
                    return a % 1000 * 99 + a;
                if (/y/.test(e)) // twenty/thirty/forty/fifty/sixty/seventy/eighty/ninety
                    return string * 10 + a;
                if (e[5]) // eleven/twelve/thirteen/fourteen/fifteen/sixteen/seventeen/eighteen/nineteen/million
                    return string + 10 + a;
                return string + a; // one/two/three/four/five/six/seven/eight/nine/ten
            */
        }, 0);
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

let WORDSLIST = [

    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',

    'twenty',
    'twenty-one',
    'thirty-seven',
    'forty-six',
    'fifty-nine',
    'sixty-eight',
    'seventy-two',
    'eighty-three',
    'ninety-four',

    'one hundred',
    'one hundred one',
    'one hundred and one',
    'one hundred sixty-nine',
    'two hundred and ninety-nine',
    'seven hundred thirty-six',

    'two thousand',
    'one thousand three hundred and thirty-seven',
    'twenty-six thousand three hundred and fifty-nine',
    'thirty-five thousand',
    'ninety-nine thousand nine hundred and ninety-nine',

    'six hundred sixty-six thousand six hundred sixty-six',
    'seven hundred thousand',
    'two hundred thousand three',
    'two hundred thousand and three',
    'two hundred three thousand',
    'five hundred thousand three hundred',
    'eight hundred eighty-eight thousand eight hundred and eighty-eight',

    'one million',
];

function genSets(parseInt) {
    let testSets = [];
    for (let i = 0; i < WORDSLIST.length; i++) {
        let words = WORDSLIST[i];
        let match = parseInt.f(words);
        testSets.push([
            [words, ],
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
testFixture.testSpd(1000);