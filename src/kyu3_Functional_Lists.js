'use strict';

// implement everything but length/remove/append properties
var List = function() {};
var EmptyList = function() {};
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;
EmptyList.prototype.toString = function() {
    return '()';
};
EmptyList.prototype.isEmpty = function() {
    return true;
};
EmptyList.prototype.length = function() {
    return 0;
};
EmptyList.prototype.push = function(x) {
    return new ListNode(x, this);
};
EmptyList.prototype.remove = function(x) {
    return this;
};
EmptyList.prototype.append = function(xs) {
    return xs;
};

function ListNode(value, next) {
    this.value = value;
    this.next = next;
}
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;
ListNode.prototype.isEmpty = function() {
    return false;
};
ListNode.prototype.toString = function() {
    let ret = [];
    let node = this;
    while (!node.isEmpty()) {
        ret.push(node.value);
        node = node.next;
    }
    return '(' + ret.join(' ') + ')';
};
ListNode.prototype.head = function() {
    return this.value;
};
ListNode.prototype.tail = function() {
    return this.next;
};
ListNode.prototype.push = function(x) {
    return new ListNode(x, this);
};
// ---------------------------------------------
function g() {
    let mt, l1, l2, l3, l4;
    mt = new EmptyList();
    l1 = mt.push('a');
    l2 = l1.push('b');
    l3 = l1.push('c');
    l4 = l3.append(l2);
    let ret = [];
    // Tests on the empty list.
    ret.push(mt.length() === 0);
    ret.push(mt.isEmpty() === true);
    ret.push(mt.toString() === '()');
    // After pushing an 'a'"
    ret.push(l1.length() === 1);
    ret.push(l1.isEmpty() === false);
    ret.push(l1.head() === 'a');
    ret.push(l1.tail().isEmpty());
    ret.push(l1.toString() === '(a)');
    // After pushing a 'b'"
    ret.push(l2.length() === 2);
    ret.push(l2.head() === 'b');
    ret.push(l2.tail() === l1);
    ret.push(l2.toString() === '(b a)');
    // After pushing a 'c' onto the list of just 'a'"
    ret.push(l3.length() === 2);
    ret.push(l3.head() === 'c');
    ret.push(l3.tail() === l1);
    ret.push(l3.toString() === '(c a)');
    // Appending (b a) to (c a)"
    ret.push(l4.length() === 4);
    ret.push(l4.head() === 'c');
    ret.push(l4.tail().head() === 'a');
    ret.push(l4.tail().tail() === l2);
    // Removing 'a' from '(c a b a)'"
    ret.push(l4.remove('a').length() === 2);
    // Removing 'b' from '(c a b a)'"
    ret.push(l4.remove('b').length() === 3);
    ret.push(l4.remove('b').tail().tail() === l4.tail().tail().tail());
    // Removing 'c' from '(c a b a)'"
    ret.push(l4.remove('c').length() === 3);
    ret.push(l4.remove('c') === l4.tail());
    // Removing 'a' from '(a)'"
    ret.push(l1.remove('a') === mt);
    return ret;
}

var Solution = {
    d: `
    https://www.codewars.com/kata/functional-lists

    In this kata, you will create a simple, immutable, singly-linked list.

    Most list implementations use mutable nodes.
    Mutability brings with it a whole host of problems
    (especially in threaded environments,
    but even just with state saved and shared in multiple places).
    When you shift to immutable nodes,
    you gain a new ability to reason about things.
    If you have a list, it will never contain different things than it does at the moment.

    However, when dealing with immutable nodes,
    one has to take special steps to try to maintain efficiency.
    For example, to add a node to the beginning of a list,
    you don't want to have to duplicate the whole list.
    You want to be able to share as many nodes of
    the list as possible between the original list and
    the newly generated list (while still being a singly-linked list).

    There are two classes involved here: EmptyList and ListNode.
    Each of these should support the following operations:
    toString(), isEmpty(), length(), push(), remove(), and append().
    If isEmpty() returns false,
    then the following two methods should also be supported: head() and tail().

    var list0 = new EmptyList();        // => "()"
    var list1 = list0.push(3);          // => "(3)"
    var list2 = list1.push(2);          // => "(2 3)"
    var list3 = list2.push(1);          // => "(1 2 3)"
    var list13 = list1.append(list3);   // => "(3 1 2 3)"

    list13.head()    // => 3
    list13.tail()    // => list3

    list1 instanceof ListNode
    list1.tail() instanceof EmptyList
    Diagramatically, this is what list3 above should look like:



    Or, if you prefer JSON:

    { value: 1,
      next: { value: 2,
              next: { value: 3,
                      next: {} } } }
    The EmptyList constructor takes no arguments.
    The ListNode constructor takes a value and a next parameter.
    The value parameter can be anything.
    The next parameter will be either a ListNode instance or
    an EmptyList instance representing the rest of the list after this node.

    The toString() method should return "()" for an EmptyList and
    "(1 2 3)" for a list containing the numbers 1, 2, and 3.

    The isEmpty() method will return true for EmptyList instances and
    false for the ListNode instances.

    The length() method will return the number of non-EmptyList nodes in a list.

    The orig.push(x) method will create a list whose first node contains
    the value x and where the new list shares as many nodes as possible with
    orig (while still being a singly-linked list).

    The orig.remove(x) method will create a list where all nodes with
    value x are removed and which shares as many nodes as possible with
    orig (while still being a singly-linked list).

    The orig.append(other) method will create a list which is
    a concatenation of all nodes in orig and all nodes in other and
    which shares as many nodes as possible with orig and other
    (while still being a singly-linked list).

    If orig.isEmpty() returns false, then orig.head() should return
    the value in the first node of the list.
    The orig.tail() should return the sublist of
    orig containing all of the nodes except the first node in orig.
    `
};
Solution.subSol_01 = {
    d: `iterative`,
    f: function() {
        // only implement length/remove/append properties here.
        ListNode.prototype.length = function() {
            let ret = 0;
            let node = this;
            while (!node.isEmpty()) {
                ret++;
                node = node.next;
            }
            return ret;
        };
        ListNode.prototype.append = function(xs) {
            let ret = new ListNode(this.value);
            let node = ret;
            let node$ = this.next;
            while (!node$.isEmpty()) {
                node.next = new ListNode(node$.value);
                node$ = node$.next;
                node = node.next;
            }
            node.next = xs;
            return ret;
        };
        ListNode.prototype.remove = function(x) {
            let ret;
            let node$ = this;
            while (!node$.isEmpty()) {
                if (node$.value !== x) { // append
                    let node$$ = node$.next;
                    while (!node$$.isEmpty() && node$$.value !== x) {
                        node$$ = node$$.next;
                    }
                    if (node$$.isEmpty()) {
                        return node$;
                    }
                    ret = new ListNode(node$.value);
                    node$ = node$.next;
                    break;
                }
                node$ = node$.next;
            }
            if (!ret)
                return node$;
            let node = ret;
            while (!node$.isEmpty()) {
                if (node$.value !== x) { // append
                    let node$$ = node$.next;
                    while (!node$$.isEmpty() && node$$.value !== x) {
                        node$$ = node$$.next;
                    }
                    if (node$$.isEmpty()) {
                        break;
                    }
                    node.next = new ListNode(node$.value);
                    node = node.next;
                }
                node$ = node$.next;
            }
            node.next = node$;
            return ret;
        };
        this.f = g;
        return this.f();
    }
};
Solution.subSol_02 = {
    d: `recursion`,
    f: function() {
        // only implement length/remove/append properties here.
        ListNode.prototype.length = function() {
            return 1 + this.next.length();
        };
        ListNode.prototype.append = function(xs) {
            return new ListNode(this.value, this.next.append(xs));
        };
        ListNode.prototype.remove = function(x) {
            var node = this.next.remove(x);
            if (x == this.value) // skipped
                return node;
            if (node == this.next) // share all the nodes from this to the end
                return this;
            else // non-share
                return new ListNode(this.value, node);
        };
        this.f = g;
        return this.f();
    }
};
Solution.subSol_03 = {
    d: `recursion, head/tail`,
    f: function(x) {
        // only implement length/remove/append properties here.
        ListNode.prototype.length = function() {
            return 1 + this.tail().length();
        };
        ListNode.prototype.append = function(xs) {
            if (this.tail().isEmpty()) {
                return new ListNode(this.head(), xs);
            } else {
                return new ListNode(this.head(), this.tail().append(xs));
            }
        };
        ListNode.prototype.remove = function(x) {
            if (this.head() == x) {
                return this.tail().remove(x);
            } else {
                if (!this.tail().isEmpty() && this.tail().contains(x)) {
                    return new ListNode(this.head(), this.tail().remove(x));
                } else {
                    return this;
                }
            }
        };
        ListNode.prototype.contains = function(x) {
            return this.head() === x || (!this.tail().isEmpty() && this.tail().contains(x));
        };
        this.f = g;
        return this.f();
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
    var testSets = [];
    for (let i = 0; i < 1000; i++) {
        var match = subSol.f();
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
var testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);
