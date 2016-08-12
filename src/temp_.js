'use strict';

function dot([ax, ay, az], [bx, by, bz]) {
    return ax * bx + ay * by + az * bz;
}

function crs([ax, ay, az], [bx, by, bz]) {
    return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

function mag([ax, ay, az]) {
    return Math.sqrt(ax * ax + ay * ay + az * az);
}

function angle(a, b) {
    console.log('-----------------');
    console.log(Math.acos(dot(a, b)));
    console.log(Math.atan2(mag(crs(a, b)), dot(a, b)));
    console.log('-----------------');
    return Math.atan2(dot(a, b), mag(crs(a, b)));
}

function StarTracker(catalog) {
    // TODO: Program Me
    this.catalog = catalog;
    this.n = catalog.maggth;
    let n = this.n;
    this.theta = new Array(n);
    for (let i = 0, a; i < n; i++) {
        a = catalog[i];
        this.theta[i] = new Array(n);
        for (let j = 0, b; j < n; j++) {
            b = catalog[j];
            this.theta[i][j] = angle(a, b);
        }
        this.theta[i].sort();
    }
    // console.log(this.theta);
}

StarTracker.prototype.matches = function (observations) {
    // TODO: Program Me
    let n = this.n;
    let theta = new Array(n);
    for (let i = 0, a; i < n; i++) {
        a = observations[i];
        theta[i] = new Array(n);
        for (let j = 0, b; j < n; j++) {
            b = observations[j];
            theta[i][j] = angle(a, b);
        }
        theta[i].sort();
    }
    // console.log(angle);
    let ret = new Array(n);
    for (let i = 0, aTheta; i < n; i++) {
        aTheta = this.theta[i];
        for (let j = 0, bTheta; j < n; j++) {
            bTheta = theta[j];
            if ((aTheta.map((x, i) => Math.abs(x - bTheta[i]) < 1e-4).every(x => x))) {
                ret[i] = [this.catalog[i], observations[j]];
                break;
            }
        }
    }
    return ret;
};

var catalog = [
    [0.6423109603211583, 0.203715328373485, 0.7388752907202909],
    [0.7275189330711311, 0.2749108543317812, 0.6286018009786585],
    [0.6679273451884815, 0.10972001690331297, 0.7360941376211358],
    [0.020757579023139, 0.4236482927451189, 0.9055888951214254],
    [0.9494538494183702, 0.06670014840323665, 0.30673845215040285],
    [0.1877152065411528, 0.4442142424628979, 0.8760346500146705],
    [0.6806501203205427, 0.7007891302807193, 0.21356499850870678]
];

var observations = [
    [0.7597810892539221, -0.0752935577719106, 0.6458045962751986],
    [0.29342551440616566, 0.38653267964946075, 0.874353449732135],
    [0.852084649661814, 0.5226519302770312, 0.02804834377281004],
    [0.6124503176982832, 0.617304354301765, 0.4938015213740773],
    [0.533453666103194, 0.6695033728133594, 0.5169065872211323],
    [0.8369541313820854, 0.5285367363210877, -0.14197429458008354],
    [0.6214512444287408, 0.5031847305287902, 0.6005026875548838]
];

var solution = [
    [
        [0.020757579023139, 0.4236482927451189, 0.9055888951214254],
        [0.8369541313820854, 0.5285367363210877, -0.14197429458008354]
    ],
    [
        [0.1877152065411528, 0.4442142424628979, 0.8760346500146705],
        [0.852084649661814, 0.5226519302770312, 0.02804834377281004]
    ],
    [
        [0.6423109603211583, 0.203715328373485, 0.7388752907202909],
        [0.6124503176982832, 0.617304354301765, 0.4938015213740773]
    ],
    [
        [0.6679273451884815, 0.10972001690331297, 0.7360941376211358],
        [0.533453666103194, 0.6695033728133594, 0.5169065872211323]
    ],
    [
        [0.6806501203205427, 0.7007891302807193, 0.21356499850870678],
        [0.7597810892539221, -0.0752935577719106, 0.6458045962751986]
    ],
    [
        [0.7275189330711311, 0.2749108543317812, 0.6286018009786585],
        [0.6214512444287408, 0.5031847305287902, 0.6005026875548838]
    ],
    [
        [0.9494538494183702, 0.06670014840323665, 0.30673845215040285],
        [0.29342551440616566, 0.38653267964946075, 0.874353449732135]
    ]
];

var answer = new StarTracker(catalog)
    .matches(observations)
    .map(JSON.stringify)
    .sort()
    .map(JSON.parse);

console.log(JSON.stringify(answer));