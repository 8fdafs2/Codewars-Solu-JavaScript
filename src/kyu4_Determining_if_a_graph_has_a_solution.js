'use strict';

function g(solve_graph) {
  let ret = [];
  let arcs = [
    { start: "a", end: "b" },
  ];
  ret.push(solve_graph.f$("a", "b", arcs) === true);
  ret.push(solve_graph.f$("a", "c", arcs) === false);
  ret.push(solve_graph.f$("a", "a", arcs) === true);
  arcs = [
    { start: "a", end: "b" },
    { start: "b", end: "c" },
    { start: "c", end: "a" },
    { start: "c", end: "d" },
    { start: "e", end: "a" }
  ];
  ret.push(solve_graph.f$("a", "d", arcs) === true);
  ret.push(solve_graph.f$("a", "e", arcs) === false);
  ret.push(solve_graph.f$("a", "a", arcs) === true);
  ret.push(solve_graph.f$("a", "b", arcs) === true);
  ret.push(solve_graph.f$("a", "c", arcs) === true);
  return ret;
}

let Solution = {
  /*
  https://www.codewars.com/kata/53223653a191940f2b000877
  
  In this kata, you'll have to implement a function solve_graph(start, end, arcs) 
  that will return true if the end node can be reached from the start node, 
  using 0 or more arcs. It will return false if it is not possible.

  The graph is defined by a list of arcs, 
  where each arc is an object that has two properties, 
  start and end, representing the start and end nodes, respectively. 
  Each arc is unidirectional, in other words it goes from a start node to an end node, 
  and not the other way around. 
  Note that 0 or more arcs can leave a node, and 0 or more can arrive to it. 
  If you need more info on the way these graphs work, 
  you can see there : http://en.wikipedia.org/wiki/Adjacency_list and 
  there : http://en.wikipedia.org/wiki/Directed_graph

  Note that the solve_graph() method doesn't take a list of 
  nodes as input: for simplicity's sake, 
  let's assume that all nodes present in arcs are valid. 
  However, the start or end node may not be in arcs.

  Let's take a simple example :

  var arcs = [
  { start : "a", end : "b" },
  { start : "a", end : "a"}
  ];

  solve_graph("a", "b", arcs);
  // Should return true, because "b" can be reached from "a"

  solve_graph("a", "c", arcs);
  // Should return false, because "c" can never be reached from "a", using any combination of arcs
  */
};
Solution.solve_graph_01 = {
  d: `intuitive`,
  f: function () {
    return g.apply(this, [this]);
  },
  f$: function (start, end, arcs) {
    if (start == end) return true;
    for (let i = 0; i < arcs.length; ++i) {
      let arc = arcs[i];
      if (arc.start == start && arc.end) {
        if (arc.end == end) return true;
        let arcs_ = arcs.slice(0);
        arcs_.splice(i, 1);
        let ret = this.f$(arc.end, end, arcs_);
        if (ret) return true;
      }
    }
    return false;
  }
};
Solution.solve_graph_02 = {
  d: `map`,
  f: function () {
    return g(this);
  },
  f$: function (start, end, arcs) {
    let this_ = this;
    if (start === end) return true;
    return arcs.map(function (arc, i) {
      if (arc.start == start) {
        return this_.f$(arc.end, end, arcs.slice(0, i).concat(arcs.slice(i + 1, arcs.length)));
      }
    }).indexOf(true) != -1;
  }
};

Solution.solve_graph_03 = {
  d: `some`,
  f: function () {
    return g(this);
  },
  f$: function (start, end, arcs) {
    let this_ = this;
    return start == end || arcs.some(function (arc) {
      return arc.start == start && this_.f$(arc.end, end, arcs.filter(function (arc) {
        return arc.start != start;
      }));
    });
  }
};

Solution.solve_graph_04 = {
  d: `visited`,
  f: function () {
    return g(this);
  },
  f$: function (start, end, arcs) {
    var found = false;
    var visited = [];

    function graph_helper(start, end, arcs) {
      if (start === end) found = true;
      arcs.map(function (a) {
        if (a.start === start && visited.indexOf(a.end) === -1) {
          visited.push(a.end);
          graph_helper(a.end, end, arcs);
        }
      });
    }
    graph_helper(start, end, arcs);
    return found;
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

function genSets(solve_graph) {
  let testSets = [];
  for (let i = 0; i < 1; i++) {
    let match = solve_graph.f();
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
