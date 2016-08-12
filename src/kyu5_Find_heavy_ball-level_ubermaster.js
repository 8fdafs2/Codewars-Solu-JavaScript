'use strict';

var Scales = function (ball, ball_count) {
    this.refresh = function () {
        this.dura = Math.ceil(Math.log(ball_count) / Math.log(3));
    };
    this.refresh();
    this.getWeight = function (balls_01, balls_02) {
        if (this.dura === 0)
            throw 'scale is broken';
        this.dura--;
        if (balls_01.indexOf(ball) > -1)
            return -1;
        else if (balls_02.indexOf(ball) > -1)
            return 1;
        return 0;
    };
};

var Solution = {
    d: `
    https://www.codewars.com/kata/find-heavy-ball-level-ubermaster

    There are a n balls numbered from 0 to n-1 (0,1,2,3,etc). 
    Most of them have the same weight, but one is heavier. 
    Your task is to find it.

    Your function will receive two arguments - 
    a scales object, and a ball count. 
    The scales object has only one method:

    getWeight(left, right)
    where left and right are arrays of numbers of 
    balls to put on left and right pan respectively.

    If getWeight returns -1 - left pan is heavier

    If getWeight returns 1 - right pan is heavier

    If getWeight returns 0 - both pans weight the same

    So what makes this the "ubermaster" version of this kata? 
    First, it's not restricted to 8 balls as in the previous versions - 
    your solution has to work for 8-500 balls.

    Second, you can't use the scale any more than mathematically necessary. 
    Here's a chart:

    ball count | uses
    -----------------
           0-9 |    2
         10-27 |    3
         28-81 |    4
        82-243 |    5
       244-500 |    6
    Too hard? Try lower levels by tiriana:

    novice
    conqueror
    master
    `
};
Solution.findBall_01 = {
    d: `recursion`,
    f: function (scales, ball_count) {
        scales.refresh();
        let l, i, balls_01, balls_02, balls_03, w;
        let balls = [];
        for (let i = 0; i < ball_count; i++) balls.push(i);
        return recur(balls);

        function recur(balls) {
            l = balls.length;
            if (l == 1) return balls[0];
            i = l == 2 ? 1 : Math.ceil(l / 3);
            balls_01 = balls.slice(0, i);
            balls_02 = balls.slice(i, i + i);
            balls_03 = balls.slice(i + i);
            w = scales.getWeight(balls_01, balls_02);
            if (w < 0) return recur(balls_01);
            else if (w > 0) return recur(balls_02);
            return recur(balls_03);
        }
    }
};
Solution.findBall_02 = {
    d: `iteration`,
    f: function (scales, ball_count) {
        scales.refresh();
        let balls = [];
        for (let i = 0; i < ball_count; i++) balls.push(i);
        let l, i, balls_01, balls_02, balls_03, w;
        while (1) {
            l = balls.length;
            if (l == 1) return balls[0];
            i = l == 2 ? 1 : Math.ceil(l / 3);
            balls_01 = balls.slice(0, i);
            balls_02 = balls.slice(i, i + i);
            balls_03 = balls.slice(i + i);
            w = scales.getWeight(balls_01, balls_02);
            if (w < 0) balls = balls_01;
            else if (w > 0) balls = balls_02;
            else balls = balls_03;
        }
    }
};
Solution.findBall_03 = {
    d: `splice`,
    f: function (scales, ball_count) {
        scales.refresh();
        let balls;
        let pans;
        let i;
        for (balls = []; ball_count--; balls.unshift(ball_count));
        for (; balls[1]; balls = pans[scales.getWeight(pans[0], pans[2]) + 1]) {
            pans = [balls.splice(0, i = Math.ceil(balls.length / 3)), balls.splice(i), balls];
        }
        return balls[0];
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

function genSets(findBall) {
    var testSets = [];
    for (let i = 0; i < 100; i++) {
        var ball_count = randNumber(8, 9);
        var ball = randNumber(0, ball_count - 1);
        var scales = new Scales(ball, ball_count);
        var match = findBall.f(scales, ball_count);
        testSets.push([
            [scales, ball_count, ],
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