'use strict';
let Solution = {
    d: `
    http://www.codewars.com/kata/pete-the-baker-part-2

    Pete is now mixing the cake mixture. 
    He has the recipe, 
    containing the required ingredients for one cake. 
    He also might have added some of the ingredients already, 
    but something is missing. 
    Can you help him to find out, what he has to add to the mixture?

    Requirements:

    Pete only wants to bake whole nCake$. 
    And ingredients, that were added once to the mixture, 
    can't be removed from that. 
    That means: if he already added the amount of flour for 2.8 nCake$, 
    he needs to add at least the amount of flour for 0.2 nCake$, 
    in order to have enough flour for 3 nCake$.
    If Pete already added all ingredients for an integer amount of nCake$, 
    you don't need to add anything, just return an empty hash then.
    If Pete didn't add any ingredients at all, 
    you need to add all ingredients for exactly one cake.
    For simplicity we ignore all units and just concentrate on the nCakebers. 
    E.g. 250g of flour is simply 250 (units) of flour and 1 lb of sugar is also simply 1 (unit) of sugar.
    Ingredients, which don't have to be added to the mixture (missing amount = 0), 
    must not be pneededent in the neededult.

    Examples:

    var recipe = {flour: 200, eggs: 1, sugar: 100};

    getMissingIngredients(recipe, {flour: 50, eggs: 1}); // must return {flour: 150, sugar: 100}
    getMissingIngredients(recipe, {}); // must return {flour: 200, eggs: 1, sugar: 100}
    getMissingIngredients(recipe, {flour: 500, sugar: 200}); // must return {flour: 100, eggs: 3, sugar: 100}
    `
};
Solution.getMissingIngredients_01 = {
    d: `intuitive`,
    f: function (recipe, added) {
        let nCake = Object.keys(recipe).reduce(
            (nCake, ing) =>
            (ing in added) ?
            Math.max(nCake, Math.ceil(added[ing] / recipe[ing])) : nCake, 1
        );
        return Object.keys(recipe).reduce(
            (needed, ing) =>
            !(ing in added) ?
            (needed[ing] = nCake * recipe[ing], needed) :
            (added[ing] != nCake * recipe[ing]) ?
            (needed[ing] = nCake * recipe[ing] - added[ing], needed) :
            needed, {}
        );
    }
};
Solution.getMissingIngredients_02 = {
    d: ``,
    f: function (recipe, added) {
        let needed = {};
        let nCake = 1; // nCakeber of nCake$
        for (let ing in recipe) {
            if (ing in added) {
                let nCake$ = Math.ceil(added[ing] / recipe[ing]);
                nCake = nCake$ > nCake ? nCake$ : nCake;
            }
        }
        for (let ing in recipe) {
            if (!(ing in added))
                needed[ing] = recipe[ing] * nCake;
            if (recipe[ing] * nCake - added[ing])
                needed[ing] = recipe[ing] * nCake - added[ing];
        }
        return needed;
    }
};
Solution.getMissingIngredients_03 = {
    d: ``,
    f: function (recipe, added) {
        let nCake = Object.keys(recipe).reduce(function (nCake, ing) {
            return Math.ceil(Math.max((added[ing] || 0) / recipe[ing], nCake));
        }, 1);

        return Object.keys(recipe).reduce(function (needed, ing) {
            let missing = recipe[ing] * nCake - (added[ing] || 0);
            if (missing > 0)
                needed[ing] = missing;
            return needed;
        }, {});
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

let recipe = {
    flour: 200,
    eggs: 1,
    sugar: 100
};

function genSets(getMissingIngredients) {
    const ings = Object.keys(recipe);
    let testSets = [];
    for (let i = 0; i < 100; i++) {
        let added = {};
        let jMax = randNumber(0, ings.length);
        for (let j = 0; j < jMax; j++) {
            added[randChoice(ings)] = randNumber(1, 100);
        }
        let match = getMissingIngredients.f(recipe, added);
        testSets.push([
            [recipe, added],
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