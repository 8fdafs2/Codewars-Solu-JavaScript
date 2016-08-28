'use strict';

function solve_graph(start, end, arcs) {
  if (start == end) return true;
  for (let i = 0; i < arcs.length; ++i) {
    let arc = arcs[i];
    if (arc.start == start && arc.end) {
      if (arc.end == end) return true;
      let arcs_ = arcs.slice(0);
      arcs_.splice(i, 1);
      let ret = solve_graph(arc.end, end, arcs_);
      if (ret) return true;
    }
  }
  return false;
}

var arcs = [
  { start: "a", end: "b" },
  ];

console.log(solve_graph("a", "b", arcs), true);

console.log(solve_graph("a", "c", arcs), false);

console.log(solve_graph("a", "a", arcs), true);

arcs = [
  { start: "a", end: "b" },
  { start: "b", end: "c" },
  { start: "c", end: "a" },
  { start: "c", end: "d" },
  { start: "e", end: "a" }
  ];

console.log(solve_graph("a", "d", arcs), true);

console.log(solve_graph("a", "e", arcs), false);

console.log(solve_graph("a", "a", arcs), true);
console.log(solve_graph("a", "b", arcs), true);
console.log(solve_graph("a", "c", arcs), true);
