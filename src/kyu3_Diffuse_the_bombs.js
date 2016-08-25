'use strict';

function BombConstructor(global$, silentMode = true) {

    let cnt = 0;
    let diffuses = [];
    let checks = [];
    let hint = '';
    let key = 42;

    Object.defineProperty(this, 'cnt', {
        get: function () {
            return cnt;
        }
    });

    Object.defineProperty(this, 'hint', {
        get: function () {
            return hint;
        }
    });

    Object.defineProperty(this, 'key', {
        get: function () {
            return key;
        }
    });

    let check;
    let checkInternal = function (incCnt = true, silentMode = true, trueOrFalse = true) {
        if (trueOrFalse) {
            if (!silentMode) {
                console.log('Well done, however another bomb has just armed itself! ' + (9 - cnt) + ' bombs left!');
            }
            if (incCnt)
                cnt++;
        } else {
            if (!silentMode) {
                console.log('Sorry, but you guessed incorrectly and a bomb has exploded!!');
                throw 'Bomb Exploded';
            }
        }
    };

    Object.defineProperty(this, 'diffuse', {
        get: function () {
            if (cnt === 0) {
                // key = null;
                hint = 'just keep trying';
            } else if (cnt === 1) {
                hint = 'Check the globals';
                global$.BombKey = 0.33333;
            } else if (cnt === 2) {
                hint = 'Is something missing?';
            } else if (cnt === 3) {
                hint = 'VGhlIGtleSBpcyAiMy4xNDE1OSI= (base64)';
            } else if (cnt === 4) {
                hint = 'Exactly 4 years ago...';
            } else if (cnt === 5) {
                hint = 'Is it freezing in here?';
            } else {
                hint = 'Sorry, no more hints!!';
            }
            check = checks[cnt];
            return diffuses[cnt];
        }
    });

    // Bomb #00
    checks.push(checkInternal.bind(null, true, silentMode));
    diffuses.push(function (code) {
        if (code === this.key) {
            check();
        } else {
            check(false);
        }
    });
    // Bomb #01
    let i = 0;
    checks.push(function () {
        if (++i < 5) {
            checkInternal(false, true);
        } else if (i == 5) {
            checkInternal(true, silentMode);
        }
    });
    diffuses.push(function () {
        check();
    });
    // Bomb #02
    checks.push(function (code) {
        checkInternal(true, silentMode, code == global$.BombKey);
    });
    diffuses.push(function (code) {
        check(code);
    });
    // Bomb #03
    checks.push(checkInternal.bind(null, true, silentMode));
    diffuses.push(function () {
        try {
            if (global$.diffuseTheBomb()) {
                check();
            }
        } catch (err) {
            check(false);
        }
    });
    // Bomb #04
    checks.push(function (code) {
        let code$ = Buffer.from('VGhlIGtleSBpcyAiMy4xNDE1OSI=', 'base64').toString('ascii');
        checkInternal(true, silentMode, code$ == code);
    });
    diffuses.push(function (code) {
        check(code);
    });
    // Bomb #05
    checks.push(function (code) {
        let code$ = new Date();
        checkInternal(true, silentMode, code$.getYear() - 4);
    });
    diffuses.push(function (code) {
        check(code);
    });
    // Bomb #06
    checks.push(checkInternal.bind(null, true, silentMode));
    diffuses.push(function (code) {
        try {
            code.key = 42;
        } catch (err) {}
        check(code.key === 43);
    });
    // Bomb #07
    checks.push(checkInternal.bind(null, true, silentMode));
    diffuses.push(function (code) {
        check((code < 10) && (code > 10));
    });
    // Bomb #08
    checks.push(checkInternal.bind(null, true, silentMode));
    diffuses.push(function (code) {
        check((code === 42) && (Math.random() * Math.random() * Math.random() === 0.5));
    });
    // Bomb #09
    checks.push(function (code, trueOrFalse) {
        checkInternal(true, silentMode, code.trim() === 'yes' && trueOrFalse);
    });
    diffuses.push(function (code) {
        check(
            /* Did you enjoy this little challenge? */
            new Buffer(code, 'base64').toString('ascii'), [1, 2, 3] + [3] + [3, 4, 5, 6, 7, 8] == 42
        );
    });
    // Bomb Sentinel
    diffuses.push(function () {
        /*Congratulations, you have diffused all of the bombs!!*/
        throw 'No need to diffuse any more';
    });
}

function g(subSol) {
    let global$ = {};
    let Bomb = new BombConstructor(global$);
    subSol(global$, Bomb);
    return Bomb.cnt;
}

let Solution = {
    d: `
    https://www.codewars.com/kata/54d558c72a5e542c0600060f

    There are a series of 10 bombs about to go off!
    Diffuse them all! Simple, right?

    Note: This is not an ordinary Kata,
    but more of a series of puzzles.
    The point is to figure out what you are supposed to do,
    then how to do it.
    Instructions are intentionally left vague.
    `
};
Solution.subSol_01 = {
    d: ``,
    f: function () {
        return g(this.f$);
    },
    f$: function (global$, Bomb) {
        // Bomb #00
        Bomb.diffuse(Bomb.key);
        // Bomb #01
        for (let i = 0; i < 5; i++) {
            Bomb.diffuse();
        }
        // Bomb #02
        Bomb.diffuse(global$.BombKey);
        // Bomb #03
        global$.diffuseTheBomb = function () {
            return true;
        };
        Bomb.diffuse();
        delete global$.diffuseTheBomb;
        // Bomb #04
        let code = Buffer.from(Bomb.hint.substring(0, Bomb.hint.length - 10), 'base64').toString('ascii');
        Bomb.diffuse(code);
        // Bomb #05
        code = new Date();
        code.setYear(code.getYear() - 4);
        Bomb.diffuse(code);
        // Bomb #06
        // code = {
        //     get key() {
        //         return 43;
        //     },
        //     set key(val) {}
        // };
        // Bomb.diffuse(code);
        // alternative way
        code = {
            key: 43
        };
        Object.freeze(code);
        Bomb.diffuse(code);
        // Bomb #07
        // code = {
        //     cnt: 9,
        //     valueOf: function () {
        //         var cnt = this.cnt;
        //         this.cnt += 2;
        //         return cnt;
        //     }
        // };
        code = {
            x: false,
            valueOf: function () {
                if (this.x)
                    return 100;
                this.x = true;
                return 0;
            }
        };
        Bomb.diffuse(code);
        // Bomb #08
        Math.i = 0;
        let MathRandomOrig = Math.random;
        Math.random = function () {
            if (this.i++ < 2)
                return 1;
            return 0.5;
        };
        Bomb.diffuse(42);
        delete Math.i;
        Math.random = MathRandomOrig;
        // Bomb #09
        // Array.prototype.valueOf = function () {
        //     return this.reduce(function (a, b) {
        //         return a + b;
        //     });
        // };
        // alternative
        Array.prototype.valueOf = function () {
            return 14;
        };
        // code = Buffer.from('yes', 'ascii').toString('base64');
        code = Buffer.from('yes\n\r', 'ascii').toString('base64');
        Bomb.diffuse(code);
    }
};
// Solution.subSol_02 = {
//     d: ``,
//     f: function () {
//         return g(this.f$);
//     },
//     f$: function (global$, Bomb) {
//         Bomb = Object.freeze(Bomb); //What now?
//         for (let i = 0; i < 10; i++) {
//             console.log(Bomb.cnt);
//             Bomb.diffuse(42);
//         }
//     }
// };
// Solution.subSol_03 = {
//     d: ``,
//     f: function () {
//         return g(this.f$);
//     },
//     f$: function (global$, Bomb) {
//         let b = Bomb.diffuse;
//         Bomb.diffuse(Bomb.key);
//         for (var i = 0; i < 9; i++) {
//             Bomb.diffuse = b;
//             Bomb.diffuse();
//         }
//     }
// };
Solution.subSol_04 = {
    d: ``,
    f: function () {
        return g(this.f$);
    },
    f$: function (global$, Bomb) {
        let crack = {
            key: 0
        };
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(Bomb.diffuse.bind(crack));
    }
};
// Solution.subSol_05 = {
//     d: ``,
//     f: function () {
//         return g(this.f$);
//     },
//     f$: function (global$, Bomb) {
//         let B1 = Object.create(Bomb);
//         for (let k in Bomb)
//             B1[k] = Bomb[k];
//         for (let i = 0; i < 10; i++)
//             B1.diffuse(42);
//     }
// };
Solution.subSol_06 = {
    d: ``,
    f: function () {
        return g(this.f$);
    },
    f$: function (global$, Bomb) {
        let key = Bomb.key;
        let diffuse = Bomb.diffuse.bind({
            key: key
        });
        for (let i = 0; i <= 9; i++) {
            diffuse(key);
        }
    }
};
// Solution.subSol_07 = {
//     d: ``,
//     f: function () {
//         return g(this.f$);
//     },
//     f$: function (global$, Bomb) {
//         Object.freeze(Bomb);
//         [...Array(10)].forEach(() => Bomb.diffuse(42));
//     }
// };

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
    for (let i = 0; i < 1; i++) {
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
// testFixture.testSpd(100);
