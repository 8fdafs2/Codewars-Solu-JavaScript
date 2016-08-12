'use strict';

var clone = function (object) {
    var ret = {};
    for (let i in object)
        ret[i] = object[i];
    return ret;
};

var g = function (object) {
    var ret = [];
    var unRe = this.wrapper;
    unRe.clear();
    unRe.object = clone(object);

    var [x, y] = [object.x, object.y];

    unRe.set('y', y * 2);
    unRe.set('y', y * 3);
    unRe.set('x', x * 2);
    unRe.set('x', x * 3);

    ret.push(unRe.get('y'));
    ret.push(unRe.get('x'));
    unRe.undo();
    ret.push(unRe.get('x'));
    ret.push(unRe.get('y'));
    unRe.redo();
    ret.push(unRe.get('x'));
    ret.push(unRe.get('y'));
    unRe.undo();
    unRe.undo();
    ret.push(unRe.get('x'));
    ret.push(unRe.get('y'));
    unRe.undo();
    unRe.undo();
    ret.push(unRe.get('y'));
    ret.push(unRe.get('x'));

    try {
        unRe.undo();
        ret.push(undefined);
    } catch (e) {
        ret.push(unRe.get('y'));
    }

    unRe.redo();
    unRe.redo();
    unRe.redo();
    unRe.redo();
    ret.push(unRe.get('y'));
    ret.push(unRe.get('x'));

    try {
        unRe.redo();
        ret.push(undefined);
    } catch (e) {
        ret.push(unRe.get('y'));
    }

    return ret;
};

var Solution = {
    d: `
	https://www.codewars.com/kata/531489f2bb244a5b9f00077e

	The purpose of this kata is to implement the undoRedo function.

	This function takes an object and returns an object that has 
	these actions to be performed on the object passed as a parameter:

	set(key, value) Assigns the value to the key. If the key does not exist, creates it.

	get(key) Returns the value associated to the key.

	del(key) removes the key from the object.

	undo() Undo the last operation (set or del) on the object. 
	Throws an exception if there is no operation to undo.

	redo() Redo the last undo operation (redo is only possible after an undo). 
	Throws an exception if there is no operation to redo.

	After set() or del() are called, there is nothing to redo.

	All actions must affect to the object passed to undoRedo(object) function. 
	So you can not work with a copy of the object.

	Any set/del after an undo should disallow new undos.
    `
};
Solution.undoRedo_01 = {
    d: `intuitve`,
    f: function (object) {
        this.wrapper = {
            undoStack: [],
            redoStack: [],
            clear: function () {
                this.undoStack = [];
                this.redoStack = [];
            },
            set: function (key, value) {
                this.undoStack.push(['set', key, value, this.object[key]]);
                this.redoStack = [];
                this.object[key] = value;
            },
            get: function (key) {
                return this.object[key];
            },
            del: function (key) {
                this.undoStack.push(['del', key, this.object[key]]);
                this.redoStack = [];
                delete this.object[key];
            },
            undo: function () {
                if (!this.undoStack)
                    throw 'Nothing to undo';
                var [op, key, value, value$] = this.undoStack.pop();
                this.redoStack.push([op, key, value, value$]);
                switch (op) {
                case 'set':
                    if (value$ === undefined)
                        delete this.object[key];
                    else
                        this.object[key] = value$;
                    break;
                case 'del':
                    this.object[key] = value;
                }
            },
            redo: function () {
                if (!this.redoStack)
                    throw 'Nothing to redo';
                var [op, key, value, value$] = this.redoStack.pop();
                this.undoStack.push([op, key, value, value$]);
                switch (op) {
                case 'set':
                    this.object[key] = value;
                    break;
                case 'del':
                    delete this.object[key];
                }
            }
        };
        this.f = g;
        return this.f(object);
    }
};
Solution.undoRedo_02 = {
    d: `set/del, undo/redo`,
    f: function (object) {
        this.wrapper = {
            undoStack: [],
            redoStack: [],
            clear: function () {
                this.undoStack = [];
                this.redoStack = [];
            },
            set_or_del: function (key, value) {
                this.redoStack = [];
                this.undoStack.push(key in object ? [key, this.object[key]] : [key]);
                if (value !== undefined)
                    this.object[key] = value;
                else
                    delete this.object[key];
            },
            undo_or_redo: function (undoStack, redoStack) {
                var [key, value] = undoStack.pop();
                if (key !== undefined) {
                    redoStack.push(key in object ? [key, this.object[key]] : [key]);
                    if (value !== undefined)
                        this.object[key] = value;
                    else
                        delete this.object[key];
                    return [key, value];
                }
            },
            set: function (key, value) {
                this.set_or_del(key, value);
            },
            get: function (key) {
                return this.object[key];
            },
            del: function (key) {
                this.set_or_del(key);
            },
            undo: function () {
                if (this.undo_or_redo(this.undoStack, this.redoStack) === undefined)
                    throw 'Nothing to undo';
            },
            redo: function () {
                if (this.undo_or_redo(this.redoStack, this.undoStack) === undefined)
                    throw 'Nothing to redo';
            }
        };
        this.f = g;
        return this.f(object);
    }
};
Solution.undoRedo_03 = {
    d: `set_or_del, undo_or_redo`,
    f: function (object) {
        this.wrapper = {
            undoStack: [],
            redoStack: [],
            clear: function () {
                this.undoStack = [];
                this.redoStack = [];
            },
            set_or_del: function (key, value) {
                this.undoStack.push([key, this.object[key]]);
                this.redoStack = [];
                if (value === undefined)
                    delete this.object[key];
                else
                    this.object[key] = value;
            },
            set: function (key, value) {
                this.set_or_del(key, value);
            },
            get: function (key) {
                return this.object[key];
            },
            del: function (key) {
                this.set_or_del(key);
            },
            undo_or_redo: function (undoStack, redoStack) {
                var [key, value] = undoStack.pop();
                if (key in this.object) {
                    redoStack.push([key, this.object[key]]);
                    if (value === undefined) { // new value set
                        delete this.object[key];
                    } else { // value reset
                        this.object[key] = value;
                    }
                } else { // value deleted
                    redoStack.push([key, undefined]);
                    this.object[key] = value;
                }
            },
            undo: function () {
                if (!this.undoStack)
                    throw 'Nothing to undo';
                return this.undo_or_redo(this.undoStack, this.redoStack);
            },
            redo: function () {
                if (!this.redoStack)
                    throw 'Nothing to redo';
                return this.undo_or_redo(this.redoStack, this.undoStack);
            }
        };
        this.f = g;
        return this.f(object);
    }
};
Solution.undoRedo_04 = {
    d: `one command stack`,
    f: function (object) {
        this.wrapper = {
            commands: [],
            index: -1,
            clear: function () {
                this.commands = [];
                this.index = -1;
            },
            add: function (cmd) {
                this.commands.splice(this.index + 1, this.commands.length - this.index);
                this.commands.push(cmd);
                this.index = this.commands.length - 1;
            },
            get: function (key) {
                return this.object[key];
            },
            set: function (key, value) {
                var prev = this.object[key];
                var cmd = {
                    redo: function (object) {
                        object[key] = value;
                    },
                    undo: function (object) {
                        object[key] = prev;
                    }
                };
                cmd.redo(this.object);
                this.add(cmd);
            },
            del: function (key) {
                var prev = this.object[key];
                var cmd = {
                    redo: function (object) {
                        delete object[key];
                    },
                    undo: function (object) {
                        object[key] = prev;
                    }
                };
                cmd.redo(this.object);
                this.add(cmd);
            },
            undo: function () {
                var cmd = this.commands[this.index];
                if (cmd == void 0)
                    throw new Error();
                cmd.undo(this.object);
                this.index--;
            },
            redo: function () {
                var cmd = this.commands[this.index + 1];
                if (cmd === void 0)
                    throw new Error();
                cmd.redo(this.object);
                this.index++;
            },
        };
        this.f = g;
        return this.f(object);
    },
};

// --------------------------------------------------------------
import {
    ArrayManip,
    stringManip,
    randBoolean,
    randNumber,
    randChoice,
    randString,
    randStringBy,
    range,
}
from './common';

function genSets(undoRedo) {
    var testSets = [];
    for (let i = 0; i < 100; i++) {
        let obj = {
            x: randNumber(1, 100),
            y: randNumber(1, 100),
        };
        let match = undoRedo.f(obj);
        testSets.push([
            [obj, ],
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
var testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);