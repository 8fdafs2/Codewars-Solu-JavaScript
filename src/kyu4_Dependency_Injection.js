'use strict';

let g = function (DIWrapper) {
    let ret = [];
    let modules = {
        'app': function () {
            return 'module app';
        },
        'login': function () {
            return 'module login';
        },
        'i18n': function () {
            return 'module i18n';
        }
    };
    let DI = DIWrapper();
    let di = new DI(modules);
    let myFunc = di.inject(function (i18n, login, app) {
        return [i18n(), login(), app()].join(', ');
    });
    ret.push(myFunc());
    let myFuncWithUndefined = di.inject(function (nonExistingVar) {
        return nonExistingVar;
    });
    ret.push(myFuncWithUndefined());
    let myFuncWithoutDependencies = di.inject(function () {
        return arguments.length;
    });
    ret.push(myFuncWithoutDependencies());
    let myFuncWithNested = di.inject(function (app, login, i18n) {
        function nested(d, e, f) {}
        let args = Array.prototype.slice.call(arguments, 0);
        return args.length;
    });
    ret.push(myFuncWithNested());
    return ret;
};

let Solution = {
    d: `
    https://www.codewars.com/kata/5302d655be2a91068b0001fb

    Did you hear about Dependency Injection pattern? 
    The main idea of this pattern is that you may have 
    ability to pass dependencies into your function in
    any order and they will be resolved automatically. 
    Take a look at this:

    var myDependentFunc = inject(function (secondDepency, firstDependency) {
      firstDependency();
      secondDepency();
    });

    myDependentFunc();
    As you can see we just put some variables into the 
    function's signature and work with them as usualy. 
    But we know nothing about where these variables are located! 
    Let's assume that all dependencies are stored in the 
    single hash object (for instanse 'deps') and the injector 
    function will be sought among 'deps' properties:

    var deps = {
      'firstDependency': function () {return 'this is firstDependency';},
      'secondDepency': function () {return 'this is secondDepency';},
    };

    Ok, I hope this is clear. 
    Also, in order to setup DependencyInjector (DI) 
    we need to specify dependency object:

    var DI = function (dependency) {
      this.dependency = dependency;
    };

    Your task is create DI.prototype.
    inject method that will return a new function with 
    resolved dependencies. 
    And don't forget about nested functions. 
    You shouldn't handle them.
    `
};
Solution.DIWrapper_01 = {
    d: `arg extract complete solution`,
    f: function () {
        return g(this.f$);
    },
    f$: function () {
        let DI = function (dependency) {
            this.dependency = dependency;
        };
        DI.prototype.inject = function (func) {
            function $args(func) {
                return (func + '')
                    .replace(/[/][/].*$/mg, '') // strip single-line comments
                    .replace(/\s+/g, '') // strip white space
                    .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
                    .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
                    .replace(/=[^,]+/g, '') // strip any ES6 defaults  
                    .split(',').filter(Boolean); // split & filter [""]
            }
            let this$ = this;
            return function () {
                return func(...$args(func).map(arg => this$.dependency[arg]));
            };
        };
        return DI;
    }
};
Solution.DIWrapper_02 = {
    d: ``,
    f: function () {
        return g(this.f$);
    },
    f$: function () {
        let DI = function (dependency) {
            this.dependency = dependency;
        };
        DI.prototype.inject = function (func) {
            let deps = /^[^(]+\(([^)]+)/.exec(func.toString());
            deps = deps ? deps[1]
                .split(/\s?,\s?/)
                .map(function (dep) {
                    return this.dependency[dep];
                }.bind(this)) : [];
            return () => func.apply(null, deps);
        };
        return DI;
    }
};
Solution.DIWrapper_03 = {
    d: ``,
    f: function () {
        return g(this.f$);
    },
    f$: function () {
        let DI = function (dependency) {
            this.dependency = dependency;
        };
        DI.prototype.inject = function (func) {
            let deps = this.dependency;
            let args = func.toString().match(/^function\s*\(([^()]*)\)/)[1].split(',')
                .map((dep) => deps[dep.trim()])
                .filter((dep) => dep);
            return () => func.apply(null, args);
        };
        return DI;
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

function genSets(DI) {
    let testSets = [];
    for (let i = 0; i < 100; i++) {
        let match = DI.f();
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
testFixture.testSpd(1000);