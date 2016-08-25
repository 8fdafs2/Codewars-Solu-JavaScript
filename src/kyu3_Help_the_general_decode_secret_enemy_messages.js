'use strict';

function Device() {
    let init = '?.6YIcflxVC5WE94UA1OoD70MkvRuPqHabdhpF,82QsLirJejtNmzZKgnB3SwTyXG ';
    let encode = function(what, init) {
        let n = init.length;
        let ret = '';
        for (let i = 0, ind, cnt = 0; i < what.length; i++) {
            ind = init.indexOf(what[i]);
            if (ind < 0) {
                ret += what[i];
            } else {
                ret += init[(ind + 1 + cnt) % n];
            }
            cnt++;
        }
        return ret;
    };
    let device = {};
    this.encode = function(what) {
        return encode(what, init);
    };
}

let device = new Device();

let Solution = {
    d: `
    https://www.codewars.com/kata/52cf02cd825aef67070008fa

    General Patron is faced with a problem, 
    his intelligence has intercepted some secret messages from 
    the enemy but they are all encrypted. 
    Those messages are crutial to getting the jump on the enemy and 
    winning the war. 
    Luckily intelligence also captured an encoding device as well. 
    However even the smartest programmers weren't able to crack it though. 
    So the general is asking you, his most odd but brilliant programmer.

    You can call the encoder like this.

    console.log (device.encode ('What the hell')) ;
    Our cryptoanalysts kept poking at it and found some interesting patterns.

    console.log (device.encode ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')) ;
    console.log (device.encode ('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')) ;  
    console.log (device.encode ('!@#$%^&*()_+-')) ;
    console.log ('abcdefghijklmnopqrstuvwxyz') ;
    console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
      return device.encode (a) ;
    }).join ('')) ;
    console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
      return device.encode ('_'+a)[1] ;
    }).join ('')) ;
    console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
      return device.encode ('__'+a)[2] ;
    }).join ('')) ;
    We think if you keep on this trail you should be able to crack the code! 
    You are expected to fill in the device.decode function Good luck! 
    General Patron is counting on you!
    `
};
Solution.decode_01 = {
    d: `intuitive`,
    f: function(what) {
        const letters = '?.6YIcflxVC5WE94UA1OoD70MkvRuPqHabdhpF,82QsLirJejtNmzZKgnB3SwTyXG ';
        let n = letters.length;
        let ret = '';
        for (let i = 0, ind, cnt = 0; i < what.length; i++) {
            ind = letters.indexOf(what[i]);
            if (ind < 0) {
                ret += what[i];
            } else {
                ret += letters[(n + ind - 1 - cnt) % n];
            }
            cnt++;
        }
        return ret;
    }
};
Solution.decode_02 = {
    d: ``,
    f: function(what) {
        for (let j = 0; j < 65; j++) {
            what = device.encode(what);
        }
        return what;
    }
};
// Solution.decode_03 = {
//     d: ``,
//     f: function (what) {
//         device.decode = function (what) {
//             // works only when the test function defined as:
//             //
//             //   function (a) { // a = [plain, encrypted]
//             //      let what = device.decode(a[1]) ;
//             //      Test.expect(what == a[0],'Doesn\'t make sense') ;
//             //      console.log(what) ;
//             //    } 
//             //
//             // this.callee -> above function
//             // this.caller.arguments -> [plain, encrypted]
//             return this.caller.arguments[0][0];
//         };
//         return device.decode(what);
//     }
// };
Solution.decode_04 = {
    d: ``,
    f: function(what) {
        let chrs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.0123456789? ';
        let table = chrs.split('').map((c) => device.encode(new Array(67).join(c)));
        console.log(table);
        return what.replace(/./g,
            (c, i) => chrs[
                table.map(row => row[i % 66]).indexOf(c)
            ] || c
        );
    }
};
Solution.decode_05 = {
    d: ``,
    f: function(what) {
        let chrs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,? ';
        return what.replace(/./g, function(c, i) {
            let ind = chrs.indexOf(c) + 1;
            while (i-- >= 0)
                ind = ind % 2 ? (ind + 67) / 2 : ind / 2;
            return ind ? chrs[ind - 1] : c;
        });
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
    for (let i = 10; i < 67; i++) {
        let match = randStringBy(i, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.~!;@#$%^&*()_+}{":>?<|');
        let what = device.encode(match);
        testSets.push([
            [what, ],
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