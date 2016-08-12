'use strict';

function g(pointInPoly) {
    let ret = [];
    //
    let poly = [
        [-5, -5],
        [5, -5],
        [5, 5],
        [-5, 5]
    ];
    ret.push(pointInPoly(poly, [1, 1]));
    ret.push(pointInPoly(poly, [4, 1]));
    ret.push(pointInPoly(poly, [6, 1]));
    ret.push(pointInPoly(poly, [-6, -6]));
    //
    poly = [
        [-5, -5],
        [5, -5],
        [0, 5]
    ];
    ret.push(pointInPoly(poly, [-4, -4]));
    ret.push(pointInPoly(poly, [1, -3]));
    ret.push(pointInPoly(poly, [6, -4]));
    ret.push(pointInPoly(poly, [-1, -6]));
    //
    poly = [];
    for (let t = 0; t < 1; t += 0.01) {
        let theta = t * 2 * Math.PI;
        poly.push([5 * Math.cos(theta), 5 * Math.sin(theta)]);
    }
    ret.push(pointInPoly(poly, [1, 1]));
    ret.push(pointInPoly(poly, [4, 0]));
    ret.push(pointInPoly(poly, [4, 4]));
    ret.push(pointInPoly(poly, [0, -6]));
    //
    poly = [];
    let minR = Infinity,
        minTheta;
    let maxR = 0,
        maxTheta;
    for (let t = 0; t < 1; t += 0.05) {
        let r = 3 + Math.random() * 2;
        let theta = t * 2 * Math.PI;
        theta += Math.random() * 0.04;
        if (r < minR) {
            minR = r;
            minTheta = theta;
        }
        if (r > maxR) {
            maxR = r;
            maxTheta = theta;
        }
        poly.push([r * Math.cos(theta), r * Math.sin(theta)]);
    }
    //Two tricky points: one barely inside and one barely outside
    minR += 0.5;
    maxR -= 0.5;
    let justOutside = [
        minR * Math.cos(minTheta),
        minR * Math.sin(minTheta)
    ];
    let justInside = [
        maxR * Math.cos(maxTheta),
        maxR * Math.sin(maxTheta)
    ];
    ret.push(pointInPoly(poly, [1, 1]));
    ret.push(pointInPoly(poly, [2, 0]));
    ret.push(pointInPoly(poly, [6, 6]));
    ret.push(pointInPoly(poly, [0, -6]));
    ret.push(pointInPoly(poly, justInside));
    ret.push(pointInPoly(poly, justOutside));

    return ret;
}

let Solution = {
    d: `
    https://www.codewars.com/kata/point-in-polygon-1

    The problem

    In this kata, 
    you're going write a function called pointInPoly to 
    test if a point is inside a polygon.

    Points will be represented as [x,y] arrays.

    The polygon will be an array of points which are 
    the polygon's vertices. 
    The last point in the array connects back to the first point.

    You can assume:

    The polygon will be a valid simple polygon. 
    That is, it will have at least three points, 
    none of its edges will cross each other, 
    and exactly two edges will meet at each vertex.
    In the tests, the point will never fall exactly on an edge of the polygon.
    Testing

    To help you visualize your test cases, 
    the ret.push(poly,point,inside) function is preloaded. 
    It draws the polygon and point and then calls Test.expect automatically.

    So if you call:

    ret.push([[-5, -5], [5, -5], [0, 5]], [0,0], true)
    then you'll see:

    The drawing window is 14x14 units wide and centered at the origin.
    `
};
Solution.pointInPoly_01 = {
    d: `ray-casting, to-right`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // ray-casting algorithm
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        let n = poly.length;
        let [x, y] = point;
        let inside = false;
        for (let i = 0, xi, yi, xj, yj, intersect, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) // intersect
                inside = !inside;
        }
        return inside;
    }
};
Solution.pointInPoly_02 = {
    d: `ray-casting, to-up`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // ray-casting algorithm
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        let n = poly.length;
        let [x, y] = point;
        let inside = false;
        for (let i = 0, xi, yi, xj, yj, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            if (((xi > x) != (xj > x)) && (y < (yj - yi) * (x - xi) / (xj - xi) + yi)) // intersect
                inside = !inside;
        }
        return inside;
    }
};
Solution.pointInPoly_03 = {
    d: `winding number, atan2`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let thetaSum = 0;
        // scalar/dot product
        // a · b = |a||b|cosθ
        let scal = (dxi, dyi, dxj, dyj) => dxi * dxj + dyi * dyj;
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi, xj, yj, dxi, dyi, dxj, dyj, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            dxi = xi - x;
            dyi = yi - y;
            dxj = xj - x;
            dyj = yj - y;
            // atan2 : -pi ~ pi
            thetaSum += Math.atan2(vect(dxi, dyi, dxj, dyj), scal(dxi, dyi, dxj, dyj));
        }
        return Math.abs(thetaSum) > 1e-6;
    }
};
Solution.pointInPoly_04 = {
    d: `winding number, atan2 - atan2`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let pi = Math.PI;
        let pipi = pi + pi;
        let n = poly.length;
        let [x, y] = point;
        let thetaSum = 0;
        for (let i = 0, xi, yi, xj, yj, theta, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            // atan2 - atan2 : -2*pi ~ 2*pi
            theta = Math.atan2(yi - y, xi - x) - Math.atan2(yj - y, xj - x);
            thetaSum += theta > pi ? theta - pipi : theta < -pi ? theta + pipi : theta; // -pi ~ pi
        }
        return Math.abs(thetaSum) > 1e-6;
    }
};
Solution.pointInPoly_05 = {
    d: `winding number, acos`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let thetaSum = 0;
        // scalar/dot product
        // a · b = |a||b|cosθ
        let scal = (dxi, dyi, dxj, dyj) => dxi * dxj + dyi * dyj;
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        // length * length
        // |a||b|
        let leng = (dxi, dyi, dxj, dyj) => Math.sqrt(dxi * dxi + dyi * dyi) * Math.sqrt(dxj * dxj + dyj * dyj);
        for (let i = 0, xi, yi, xj, yj, dxi, dyi, dxj, dyj, theta, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            dxi = xi - x;
            dyi = yi - y;
            dxj = xj - x;
            dyj = yj - y;
            // acos : 0 ~ pi
            theta = Math.acos(scal(dxi, dyi, dxj, dyj) / leng(dxi, dyi, dxj, dyj));
            thetaSum += vect(dxi, dyi, dxj, dyj) < 0 ? -theta : theta; // -pi ~ pi
        }
        return Math.abs(thetaSum) > 1e-6;
    }
};
Solution.pointInPoly_06 = {
    d: `winding number, Dan Sunday, to-right`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        // let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi, xj, yj, dxij, dyij, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            dxij = xj - xi;
            dyij = yj - yi;
            if (((yi > y) != (yj > y)) && (x < dxij * (y - yi) / dyij + xi)) // intersect
            // if (vect(1, 0, dxij, dyij) < 0)
                if (dyij < 0) // upwards
                    w++;
                else // downwards
                    w--;
        }
        return w !== 0;
    }
};
Solution.pointInPoly_07 = {
    d: `winding number, Dan Sunday, to-right, isLeft`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        // let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi, xj, yj, dxij, dyij, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            dxij = xj - xi;
            dyij = yj - yi;
            if ((yi > y) != (yj > y)) { // may intersect
                // if (vect(1, 0, dxij, dyij) < 0) { // upwards
                if (dyij < 0) { // upwards
                    if (dyij * (x - xi) < dxij * (y - yi)) // isLeft
                        w++;
                } else { // downwards
                    if (dyij * (x - xi) > dxij * (y - yi)) // isRight
                        w--;
                }
            }
        }
        return w !== 0;
    }
};
Solution.pointInPoly_08 = {
    d: `winding number, Kai Hormann, 1st version`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        let quadrants = Array(n + 1);
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi; i < n; i++) {
            [xi, yi] = poly[i];
            if ((xi > x) && (yi >= y))
                quadrants[i] = 0;
            else if ((xi <= x) && (yi > y))
                quadrants[i] = 1;
            else if ((xi < x) && (yi <= y))
                quadrants[i] = 2;
            else // if ((xi >= x) && (yi < y))
                quadrants[i] = 3;
        }
        quadrants[n] = quadrants[0];
        poly.push(poly[0]);
        for (let i = 0, xi, yi, xj, yj; i < n; i++) {
            switch (quadrants[i + 1] - quadrants[i]) {
            case 1:
            case -3:
                w++;
                break;
            case -1:
            case 3:
                w--;
                break;
            case 2:
            case -2:
                [xi, yi] = poly[i];
                [xj, yj] = poly[i + 1];
                w += vect(xi - x, yi - y, xj - x, yj - y) > 0 ? 2 : -2;
            }
        }
        return w !== 0; // w / 4 !== 0
    }
};
Solution.pointInPoly_09 = {
    d: `winding number, Kai Hormann, 2nd version`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        let quadrants = Array(n + 1);
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi; i < n; i++) {
            [xi, yi] = poly[i];
            if ((xi > x) && (yi >= y))
                quadrants[i] = 0;
            else if ((xi <= x) && (yi > y))
                quadrants[i] = 1;
            else if ((xi < x) && (yi <= y))
                quadrants[i] = 2;
            else // if ((xi >= x) && (yi < y))
                quadrants[i] = 3;
        }
        quadrants[n] = quadrants[0];
        poly.push(poly[0]);
        for (let i = 0, xi, yi, xj, yj; i < n; i++) {
            switch (quadrants[i + 1] - quadrants[i]) {
            case -3:
                w++;
                break;
            case 3:
                w--;
                break;
            case -2:
                [xi, yi] = poly[i];
                [xj, yj] = poly[i + 1];
                if (vect(xi - x, yi - y, xj - x, yj - y) > 0)
                    w++;
                break;
            case 2:
                [xi, yi] = poly[i];
                [xj, yj] = poly[i + 1];
                if (vect(xi - x, yi - y, xj - x, yj - y) < 0)
                    w--;
            }
        }
        return w !== 0;
    }
};
Solution.pointInPoly_10 = {
    d: `winding number, Kai Hormann, 3rd version`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        let quadrants = Array(n + 1);
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi; i < n; i++) {
            [xi, yi] = poly[i];
            if (yi > y)
                quadrants[i] = xi < x;
            else {
                if (yi < y)
                    quadrants[i] = 2 + (xi >= x);
                else {
                    if (xi > x)
                        quadrants[i] = 0;
                    else {
                        if (xi < x)
                            quadrants[i] = 2;
                    }
                }
            }
        }
        quadrants[n] = quadrants[0];
        poly.push(poly[0]);
        for (let i = 0, xi, yi, xj, yj; i < n; i++) {
            switch (quadrants[i + 1] - quadrants[i]) {
            case -3:
                w++;
                break;
            case 3:
                w--;
                break;
            case -2:
                [xi, yi] = poly[i];
                [xj, yj] = poly[i + 1];
                if (vect(xi - x, yi - y, xj - x, yj - y) > 0)
                    w++;
                break;
            case 2:
                [xi, yi] = poly[i];
                [xj, yj] = poly[i + 1];
                if (vect(xi - x, yi - y, xj - x, yj - y) < 0)
                    w--;
            }
        }
        return w !== 0;
    }
};
Solution.pointInPoly_11 = {
    d: `winding number, Kai Hormann, 4th version`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi, xj, yj, det, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            if ((yi < y && yj >= y) || (yi >= y && yj < y)) {
                det = vect(xi - x, yi - y, xj - x, yj - y);
                if ((det > 0 && yj > yi) || (det < 0 && yj < yi))
                    if (yj > yi)
                        w++;
                    else
                        w--;
            }
        }
        return w !== 0;
    }
};
Solution.pointInPoly_12 = {
    d: `winding number, Kai Hormann, 5th version`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi, xj, yj, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            if ((yi < y) != (yj < y)) { // crossing
                if ((vect(xi - x, yi - y, xj - x, yj - y) > 0) == (yj > yi)) // right_crossing
                    w += 2 * (yj > yi) - 1;
            }
        }
        return w !== 0;
    }
};
Solution.pointInPoly_13 = {
    d: `winding number, Kai Hormann, 6th version`,
    f: function () {
        return g(this.f$);
    },
    f$: function (poly, point) {
        // winding number algorithm
        let n = poly.length;
        let [x, y] = point;
        let w = 0;
        // determinant / |vector/cross product|
        // |a x b| = |a||b|sinθ
        let vect = (dxi, dyi, dxj, dyj) => dxi * dyj - dxj * dyi;
        for (let i = 0, xi, yi, xj, yj, j = n - 1; i < n; j = i++) {
            [xi, yi] = poly[i];
            [xj, yj] = poly[j];
            if ((yi < y) != (yj < y)) { // crossing
                if (xi >= x) {
                    if ((xj > x))
                        w += 2 * (yj > yi) - 1;
                    else if ((vect(xi - x, yi - y, xj - x, yj - y) > 0) == (yj > yi)) // right_crossing
                        w += 2 * (yj > yi) - 1;
                } else if ((xj > x) && (vect(xi - x, yi - y, xj - x, yj - y) > 0) == (yj > yi)) // right_crossing
                    w += 2 * (yj > yi) - 1;
            }
        }
        return w !== 0;
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

function genSets(pointInPoly) {
    let testSets = [];
    for (let i = 0; i < 1; i++) {
        let match = pointInPoly.f();
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
testFixture.testSpd(100);