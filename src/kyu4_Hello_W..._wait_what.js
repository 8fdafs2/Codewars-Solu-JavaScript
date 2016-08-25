'use strict';

/* 0:
 * 1 >> 1
 * 1 - 1
 * +!1
 * +false 
 * ~~false
 * function.length
 * Number()
 * +null
 * ~~null
 * +undefined
 * ~~undefined
 * [].length
 * Array().length
 * +[]
 * ~~[]
 * null - null
 * [] - []
 */

/* 1:
 * 0++
 * +!0
 * +true 
 * ~~true
 * [,].length
 * -~[]
 */

/* Empty String
 * [].toString()
 * String()
 */

let Solution = {
    d: `
    https://www.codewars.com/kata/54db3f2903e88ad6c30002ff

    In order to stop too much communication from happening, 
    your overlords declare that you are no longer allowed 
    to use certain functionality in your code!

    Disallowed functionality:

    Strings
    Numbers
    Regular Expressions
    Functions named "Hello", "World", "HelloWorld" or anything similar.
    Object keys named "Hello", "World", "HelloWorld" or anything similar.
    Without using the above, 
    output the string "Hello World!" to prove that there is always a way.
    `
};
Solution.helloWorld_01 = {
    d: `Array.length`,
    f: function () {
        let $ = String.fromCharCode;
        let H = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let e = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let l = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let o = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let sp = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let W = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let r = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let d = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        let excl = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        return $(H) + $(e) + $(l) + $(l) + $(o) + $(sp) + $(W) + $(o) + $(r) + $(l) + $(d) + $(excl);
    }
};
Solution.helloWorld_02 = {
    d: `Array.length, comments extract`,
    f: function () {
        // Hello World!
        let start = [, , , , , , , , , , , , , , , , , , , , , , , , , , ].length,
            end = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ].length;
        return this.f.toString().slice(start, end);
    }
};
Solution.helloWorld_03 = {
    d: `Boolean`,
    f: function () {
        let one = +true;
        let two = one + one;
        let four = two + two;
        let eight = four + four;
        let sixteen = eight + eight;
        let thirtytwo = sixteen + sixteen;
        let sixtyfour = thirtytwo + thirtytwo;
        let sp = thirtytwo;
        let excl = thirtytwo + one;
        let H = sixtyfour + eight;
        let e = sixtyfour + thirtytwo + four + one;
        let l = sixtyfour + thirtytwo + eight + four;
        let o = sixtyfour + thirtytwo + sixteen - one;
        let W = sixtyfour + sixteen + eight - one;
        let r = sixtyfour + thirtytwo + sixteen + two;
        let d = sixtyfour + thirtytwo + four;
        return [H, e, l, l, o, sp, W, o, r, l, d, excl].map(function (c) {
            return String.fromCharCode(c);
        }).join([]);
    }
};
Solution.helloWorld_04 = {
    d: `Boolean`,
    f: function () {
        let _ = +true;
        let $ = String.fromCharCode;
        let H = $((_ + _ + _) * (_ + _ + _) * (_ + _) * (_ + _) * (_ + _));
        let e = $((_ + _ + _ + _ + _) * (_ + _ + _ + _ + _) * (_ + _) * (_ + _) + _);
        let l = $((_ + _ + _) * (_ + _ + _) * (_ + _ + _) * (_ + _) * (_ + _));
        let o = $((_ + _ + _ + _ + _ + _ + _ + _ + _ + _ + _) * (_ + _ + _ + _ + _) * (_ + _) + _);
        let sp = $((_ + _) * (_ + _) * (_ + _) * (_ + _) * (_ + _));
        let W = $((_ + _ + _ + _ + _ + _ + _) * (_ + _ + _) * (_ + _) * (_ + _) + _ + _ + _);
        let r = $((_ + _ + _ + _ + _ + _ + _) * (_ + _) * (_ + _) * (_ + _) * (_ + _) + _ + _);
        let d = $((_ + _ + _ + _ + _) * (_ + _ + _ + _ + _) * (_ + _) * (_ + _));
        let h = $((_ + _ + _ + _ + _ + _ + _) * (_ + _ + _ + _ + _) * (_ + _ + _) - _);
        let excl = $((_ + _ + _ + _ + _ + _ + _ + _ + _ + _ + _) * (_ + _ + _));
        return H + e + l + l + o + sp + W + o + r + l + d + excl;
    }
};
Solution.helloWorld_05 = {
    d: `JSFuck`,
    f: function () {
        return [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]][([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][
            []
        ] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+!+[]] + (+[![]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+!+[]]] + ([][
            []
        ] + [])[+[]] + ([][
            []
        ] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (+![] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (+![] + [![]] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[!+[] + !+[] + [+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]][([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][
            []
        ] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+!+[]] + (+[![]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (+![] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (+![] + [![]] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[!+[] + !+[] + [+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()(([] + [])[([![]] + [][
            []
        ])[+!+[] + [+[]]] + (!![] + [])[+[]] + (![] + [])[+!+[]] + (![] + [])[!+[] + !+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]]]()[+[]])[+[]] + (!+[] + !+[] + !+[] + !+[] + [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]]) + []) + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[!+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (+[![]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+!+[]]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]][([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][
            []
        ] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+!+[]] + (+[![]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+!+[]]] + ([][
            []
        ] + [])[+[]] + ([][
            []
        ] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (+![] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (+![] + [![]] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[!+[] + !+[] + [+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]][([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][
            []
        ] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+!+[]] + (+[![]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (+![] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (+![] + [![]] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[!+[] + !+[] + [+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()(([] + [])[([![]] + [][
            []
        ])[+!+[] + [+[]]] + (!![] + [])[+[]] + (![] + [])[+!+[]] + (![] + [])[!+[] + !+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]]]()[+[]])[+[]] + (!+[] + !+[] + !+[] + !+[] + !+[] + [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]]) + []) + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]] + (![] + [])[!+[] + !+[]] + ([][
            []
        ] + [])[!+[] + !+[]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]][([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][
            []
        ] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+!+[]] + (+[![]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+!+[]]] + ([][
            []
        ] + [])[+[]] + ([][
            []
        ] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (+![] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (+![] + [![]] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[!+[] + !+[] + [+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]][([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][
            []
        ] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+!+[]] + (+[![]] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (+![] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (+![] + [![]] + ([] + [])[([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + ([][
            []
        ] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][
            []
        ] + [])[+[]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]])[!+[] + !+[] + [+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()(([] + [])[([![]] + [][
            []
        ])[+!+[] + [+[]]] + (!![] + [])[+[]] + (![] + [])[+!+[]] + (![] + [])[!+[] + !+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + ([][(![] + [])[+[]] + ([![]] + [][
            []
        ])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+!+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]]]()[+[]])[+[]] + (!+[] + !+[] + [+!+[]]) + []);

    }
};
Solution.helloWorld_06 = {
    d: `Array, Object.keys`,
    f: function () {
        let $ = String.fromCharCode
        let h = {
                H: [],
                e: [],
                ll: [],
                o: []
            },
            w = {
                W: [],
                o: [],
                r: [],
                l: [],
                d: []
            },
            o = +(!+[]),
            tw = o + o,
            th = o + tw,
            sp = $(th.toString() + tw.toString()),
            excl = $(th.toString() + th.toString()),
            j = [].toString();

        return Object.keys(h).join(j) + sp + Object.keys(w).join(j) + excl;
    }
};
Solution.helloWorld_07 = {
    d: `Number, comments extract`,
    f: function () {
        // Hello World!
        let one = Number();
        one++;
        let two = one << one;
        let four = two << one;
        let five = four + one;
        let six = five + one;
        return this.f.toString().slice(five * five + one, six * six + two);
    }
};
Solution.helloWorld_08 = {
    d: `Function.name, comments extract`,
    f: function () {
        let _ = function () {
            /*_Hello World!_*/
            let three = _.length;
            three += ++three;
            return _.toString().split(_.name)[++three];
        }
        return _();
    }
};
Solution.helloWorld_09 = {
    d: `Function.name`,
    f: function () {
        let $ = String.fromCharCode;
        let zero = +false;
        let one = +true;
        let B = (function B() {}).name;
        let HBeBlBlBo = (function HBeBlBlBo() {}).name;
        let WBoBrBlBd = (function WBoBrBlBd() {}).name;
        return HBeBlBlBo.split(B).join([]) +
            $((B.charCodeAt(zero) >> one) - one) +
            WBoBrBlBd.split(B).join([]) +
            $(B.charCodeAt(zero) >> one);
    }
};
Solution.helloWorld_10 = {
    d: `hash`,
    f: function () {
        let n = (function ĦēīīōǁŴōŕļđǃ() {}).name;
        let m = (function ŜđĬĬŜʏƿŜŤņďʐ() {}).name;
        return n.split(String()).map(
            (c, i) => String.fromCharCode(c.charCodeAt(Number()) - m.charCodeAt(i) / Math.acos(Number()))
        ).join(String());

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

function genSets(helloWorld) {
    let testSets = [];
    for (let i = 0; i < 100; i++) {
        let match = helloWorld.f();
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
testFixture.testSpd(10);