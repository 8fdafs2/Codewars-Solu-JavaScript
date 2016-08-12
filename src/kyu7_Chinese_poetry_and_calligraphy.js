'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/t-dot-t-t-dot-31-chinese-poetry-and-calligraphy-zhong-guo-shi-ci-yu-shu-fa

    Complete function layout() that accepts two arguments:
    poem: A string of Chinese Poetry.

    height: The number of Chinese character of each column.

    You need to return an array contains all characters of poem and conform to the rules.

    Examples

    poem="白日依山尽，黄河入海流。欲穷千里目，更上一层楼。"
    height=5
    layout(poem,height) ===
    [
    ["更","欲","黄","白"],
    ["上","穷","河","日"],
    ["一","千","入","依"],
    ["层","里","海","山"],
    ["楼","目","流","尽"]
    ]
    Please note: the Chinese punctuation mark(，。！？；、) 
                 and some spaces should be omitted.

    poem="白日依山尽，黄河入海流。欲穷千里目，更上一层楼。"
    height=6
    layout(poem,height) ===
    [
    ["层","千","河","白"],
    ["楼","里","入","日"],
    ["  " "目","海","依"],
    ["  ","更","流","山"],
    ["  ","上","欲","尽"],
    ["  ","一","穷","黄"]
    ]

    The unused grid should be two space "  "
    (In order to maintain the overall appearance)

    poem="滚滚长江东逝水，浪花淘尽英雄，是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中！"
    height=7
    layout(poem,height) ===
    [
    ["付","逢","风","渚","阳","山","非","浪","滚"],
    ["笑","古","一","上","红","依","成","花","滚"],
    ["谈","今","壶","惯","白","旧","败","淘","长"],
    ["中","多","浊","看","发","在","转","尽","江"],
    ["  ","少","酒","秋","渔","几","头","英","东"],
    ["  ","事","喜","月","樵","度","空","雄","逝"],
    ["  ","都","相","春","江","夕","青","是","水"]
    ]
    `
};
Solution.layout_01 = {
    d: ``,
    f: function(poem, height) {
        let ignore = ["，", "。", "！", "？", "；", "、", " "];
        let ret = new Array(height).fill(null).map(x => []);
        for (let i = 0, c, j = 0; i < poem.length; ++i)
            if (ignore.indexOf(c = poem[i]) == -1)
                ret[(j++) % height].unshift(c);
        for (let i = 1, l = ret[0].length; i < ret.length; i++)
            while (ret[i].length < l)
                ret[i].unshift("  ");
        return ret;
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
    for (let i = 0; i < 100; i++) {
        let x = randNumber(0, 100);
        let match = subSol.f(x);
        testSets.push([
            [x, ],
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
