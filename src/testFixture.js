'use strict';

import {
    ArrayManip,
    stringManip,
    randBoolean,
    randNumber,
    randChoice,
    randString,
    randStringBy,
    range,
} from './common';

stringManip();

const assert = require('assert');

export

function TestFixture(sol, genSets, cmpr = null) {
    var tF = {};
    var props = Object.getOwnPropertyNames(sol);
    tF.subSols = [];
    for (let i in props) {
        let prop = props[i];
        if (typeof sol[prop] == "object") {
            if ('d' in sol[prop] && 'f' in sol[prop]) {
                let subSol = sol[prop];
                tF.subSols.push([prop, subSol]);
            }
        }
    }
    tF.cmpr = cmpr;

    tF.nTime = 10;
    tF.nName = 'SubSol'.length;
    tF.nDescr = 'Descr'.length;
    for (let i in tF.subSols) {
        let [name, subSol] = tF.subSols[i];
        tF.nName = name.length > tF.nName ? name.length : tF.nName;
        tF.nDescr = subSol.d.length > tF.nDescr ? subSol.d.length : tF.nDescr;
    }

    tF.tabFmt = [
        [
            '  --{0}--'.format('-'.repeat(tF.nName)),
            '    {0}'.format('SubSol'.padRight(tF.nName)),
            '  --{0}--'.format('-'.repeat(tF.nName)),
            '    {0}',
        ],
        [
            '  --{0}---{1}--'.format('-'.repeat(tF.nName), '-'.repeat(tF.nDescr)),
            '    {0} | {1}'.format('SubSol'.padRight(tF.nName), 'Descr'),
            '  --{0}---{1}--'.format('-'.repeat(tF.nName), '-'.repeat(tF.nDescr)),
            '    {0} | {1}',
        ],
    ];

    tF.tabFmtSpd = [
        [
            '  --{0}---{1}--'.format('-'.repeat(tF.nName), '-'.repeat(tF.nTime)),
            '    {0} | {1}'.format('SubSol'.padRight(tF.nName), 'Time[s]'.padLeft(tF.nTime)),
            '  --{0}---{1}--'.format('-'.repeat(tF.nName), '-'.repeat(tF.nTime)),
            '    {0} | {1}',
        ],
        [
            '  --{0}---{1}---{2}--'.format(
                '-'.repeat(tF.nName), '-'.repeat(tF.nTime), '-'.repeat(tF.nDescr)),
            '    {0} | {1} | {2}'.format(
                'SubSol'.padRight(tF.nName), 'Time[s]'.padLeft(tF.nTime), 'Descr'),
            '  --{0}---{1}---{2}--'.format(
                '-'.repeat(tF.nName), '-'.repeat(tF.nTime), '-'.repeat(tF.nDescr)),
            '    {0} | {1} | {2}',
        ],
    ];
    tF.prep = function (reqSubSol = true) {
        console.log('>>> prep');
        let [name, subSol] = tF.subSols[0];
        tF.testSets = reqSubSol ? genSets(subSol) : genSets();
        let testSet = tF.testSets[0];
        let mapFunc = x => typeof x + (Array.isArray(x) ? '(Array)' : '');
        console.log('\t{0} -> {1} TestSets of Type(\n\t    #01: {2},\n\t    #02: {3},\n\t    #03: {4}\n\t)'.format(
            reqSubSol ? name : null,
            tF.testSets.length,
            testSet[0].map(mapFunc),
            Array.isArray(testSet[1]) ?
            testSet[1].map(mapFunc) : typeof testSet[1],
            Array.isArray(testSet[2]) ?
            testSet[2].map(mapFunc) : typeof testSet[2]
        ));
        console.log('<<< prep');
    };
    tF.test = function (prtDescr = true) {
        console.log(">>> test");
        let tabFmt = tF.tabFmt[+prtDescr];
        console.log(tabFmt[0]);
        console.log(tabFmt[1]);
        console.log(tabFmt[2]);
        for (let i = 0; i < tF.subSols.length; i++) {
            // for (let i in tF.subSols) {
            let [name, subSol] = tF.subSols[i];
            for (let j in tF.testSets) {
                // for (let j = 0; j < tF.testSets.length; j++) {
                let testSet = tF.testSets[j];
                let toMatch;
                if (testSet.length == 2) {
                    toMatch = subSol.f.apply(subSol, testSet[0]);
                } else if (testSet.length == 3) {
                    toMatch = subSol.f.apply(subSol, testSet[0]).apply(subSol, testSet[1]);
                }
                let expect = testSet[testSet.length - 1];

                if (tF.cmpr) {
                    assert(tF.cmpr(toMatch, testSet),
                        '\n\t------ !!! ' + name + ' ------\n' +
                        '\tinput:\n\t\t{0}\n'.format(JSON.stringify(testSet[0])) +
                        '\toutput:\n\t\texpect: {0}\n\t\tactual: {1}\n'.format(JSON.stringify(expect), JSON.stringify(toMatch)) +
                        '\t-----------' + '-'.repeat(name.length) + '-------\n');
                } else {
                    assert.deepEqual(toMatch, testSet[testSet.length - 1],
                        '\n\t------ !!! ' + name + ' ------\n' +
                        '\tinput:\n\t\t{0}\n'.format(JSON.stringify(testSet[0])) +
                        '\toutput:\n\t\texpect: {0}\n\t\tactual: {1}\n'.format(JSON.stringify(expect), JSON.stringify(toMatch)) +
                        '\t-----------' + '-'.repeat(name.length) + '-------\n');
                }
            }
            console.log(tabFmt[3].format(
                name.padRight(tF.nName),
                subSol.d.trim()
            ));
        }
        console.log("<<< test");
    };
    tF.testSpd = function (number = 100, prtDescr = true) {
        console.log(">>> testSpd");
        let tabFmt = tF.tabFmtSpd[+prtDescr];
        console.log(tabFmt[0]);
        console.log(tabFmt[1]);
        console.log(tabFmt[2]);
        for (let i = 0; i < tF.subSols.length; i++) {
            // for (let i in tF.subSols) {
            let [name, subSol] = tF.subSols[i];
            let timeArr = [];
            for (let k = 0; k < number; k++) {
                let startTime = process.hrtime();
                // for (let j = 0; j < tF.testSets.length; j++) {
                for (let j in tF.testSets) {
                    let testSet = tF.testSets[j];
                    subSol.f.apply(subSol, testSet[0]);
                }
                let elapsedTime = process.hrtime(startTime);
                timeArr.push(elapsedTime[0] + elapsedTime[1] / 1000000000);
            }
            let averageTime = (timeArr.reduce((a, b) => a + b) / number).toFixed(6).toString();
            console.log(tabFmt[3].format(
                name.padRight(tF.nName),
                averageTime.padLeft(tF.nTime),
                subSol.d.trim()
            ));
        }
        console.log("<<< testSpd");
    };
    return tF;
}
// let testFixture = TestFixture();