'use strict';
let Solution = {
  /*
https://www.codewars.com/kata/526156943dfe7ce06200063e

Inspired from real-world Brainf**k, we want to create an interpreter of that language which will support the following instructions (the machine memory or 'data' should behave like a potentially infinite array of bytes, initialized to 0):

> increment the data pointer (to point to the next cell to the right).
< decrement the data pointer (to point to the next cell to the left).
+ increment (increase by one, truncate overflow: 255 + 1 = 0) the byte at the data pointer.
- decrement (decrease by one, treat as unsigned byte: 0 - 1 = 255 ) the byte at the data pointer.
. output the byte at the data pointer.
, accept one byte of input, storing its value in the byte at the data pointer.
[ if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
] if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.
The function will take in input...

the program code, a string with the sequence of machine instructions,
the program input, a string, eventually empty, that will be interpreted as an array of bytes using each character's ASCII code and will be consumed by the , instruction
... and will return ...

the output of the interpreted code (always as a string), produced by the . instruction.
  */
};
Solution.brainLuck_01 = {
  d: `intuitive`,
  f: function (code, input) {
    let ret = [];
    let data = new Array(128).fill(0);
    let ptrData = 0;
    let ptrInst = 0;
    let prtInpu = 0;
    while (ptrInst < code.length) {
      let inst = code[ptrInst++];
      switch (inst) {
      case '>':
        ++ptrData;
        while (ptrData > data.length - 1)
          data = data.concat(new Array(128).fill(0));
        break;
      case '<':
        --ptrData;
        break;
      case '+':
        data[ptrData] = (data[ptrData] + 1) % 256;
        break;
      case '-':
        data[ptrData] = (data[ptrData] + 255) % 256;
        break;
      case '.':
        ret.push(data[ptrData]);
        break;
      case ',':
        data[ptrData] = input.charCodeAt(prtInpu++);
        break;
      case '[':
        if (data[ptrData] === 0) {
          let cnt = 0;
          do {
            let inst_ = code[ptrInst++];
            if (inst_ == ']') ++cnt;
            else if (inst_ == '[') --cnt;
          } while (cnt != 1);
        }
        break;
      case ']':
        if (data[ptrData] !== 0) {
          let cnt = 0;
          ptrInst -= 2;
          do {
            let inst_ = code[ptrInst--];
            if (inst_ == ']') ++cnt;
            else if (inst_ == '[') --cnt;
          } while (cnt != -1);
          ptrInst += 2;
        }
        break;
      }
    }
    return String.fromCharCode(...ret);
  }
};
Solution.brainLuck_02 = {
  d: ``,
  f: function (code, input) {
    let data = [],
      pos = 0,
      ipos = 0,
      output = [],
      skipping = 0,
      backwards = 0;

    let COMMANDS = {
      '>': function () {++pos; },
      '<': function () {--pos; },
      '+': function () { data[pos] = ((data[pos] || 0) + 1) % 256; },
      '-': function () { data[pos] = ((data[pos] || 0) + 255) % 256; },
      '.': function () { output.push(data[pos]); },
      ',': function () { data[pos] = (input[ipos++] || '').charCodeAt(); },
      '[': function () {
        if (!data[pos]) { skipping = 1; }
      },
      ']': function () {
        if (data[pos]) { backwards = 1; }
      }
    };

    for (let cpos = 0, l = code.length; cpos <= l; ++cpos) {
      if (skipping) {
        if (code[cpos] === '[') { skipping++; }
        if (code[cpos] === ']') { skipping--; }
      } else if (backwards) {
        cpos -= 2;
        if (code[cpos] === ']') { backwards++; }
        if (code[cpos] === '[') { backwards--; }
      } else {
        code[cpos] && COMMANDS[code[cpos]]();
      }
    }

    return String.fromCharCode.apply(null, output);
  }
};
Solution.brainLuck_03 = {
  d: ``,
  f: function (code, input) {
    if (code.match(/[^\<\>\+\-\.\,\[\]]/)) {
      throw new Error('Invalid Brainf**k code');
    }

    let js = {
      '>': 'd += $;',
      '<': 'd -= $;',
      '+': 'data[d] = (data[d]|0) + $ & 0xff;',
      '-': 'data[d] = (data[d]|0) - $ & 0xff;',
      '.': 'output.push(data[d]);',
      ',': 'data[d] = input.charCodeAt(i++);',
      '[': 'while (data[d]|0 !== 0) {',
      ']': '}',
    };

    return new Function('input', 'let output = [], data = [0], ip = -1, d = 0, i = 0;' + code.replace(/[\.\,\[\]]|\<+|\>+|\++|\-+/g, function (match) {
      return js[match[0]].replace('$', match.length);
    }) + 'return String.fromCharCode.apply(null, output);')(input);
  }
};
Solution.brainLuck_04 = {
  d: ``,
  f: function (code, input) {
    let src = "let ptr = 0, inptr = 0, output = '', data = new Uint8Array(30000);",
      op = {
        '>': '++ptr;',
        '<': '--ptr;',
        '+': '++data[ptr];',
        '-': '--data[ptr];',
        '.': 'output += String.fromCharCode(data[ptr]);',
        ',': 'data[ptr] = input.charCodeAt(inptr++)||0;',
        '[': 'while(data[ptr]){',
        ']': '}'
      };

    code.split('').map(function (c) { src += op[c] || ''; });

    return (new Function('input', src + 'return output;')).call(0, typeof input == 'string' ? input : '');
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

  let code_input_lst = [
    ['++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.', ''],
    [',+[-.,+]', 'AnyToken' + String.fromCharCode(255)],
    [',[.[-],]', 'AnyToken' + String.fromCharCode(0)],
    [',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(67, 68)],
    [',>+>>>>++++++++++++++++++++++++++++++++++++++++++++>++++++++++++++++++++++++++++++++<<<<<<[>[>>>>>>+>+<<<<<<<-]>>>>>>>[<<<<<<<+>>>>>>>-]<[>++++++++++[-<-[>>+>+<<<-]>>>[<<<+>>>-]+<[>[-]<[-]]>[<<[>>>+<<<-]>>[-]]<<]>>>[>>+>+<<<-]>>>[<<<+>>>-]+<[>[-]<[-]]>[<<+>>[-]]<<<<<<<]>>>>>[++++++++++++++++++++++++++++++++++++++++++++++++.[-]]++++++++++<[->-<]>++++++++++++++++++++++++++++++++++++++++++++++++.[-]<<<<<<<<<<<<[>>>+>+<<<<-]>>>>[<<<<+>>>>-]<-[>>.>.<<<[-]]<<[>>+>+<<<-]>>>[<<<+>>>-]<<[<+>-]>[<+>-]<<<-]', String.fromCharCode(10)],
  ];

  let testSets = [];
  for (let i = 0; i < code_input_lst.length; ++i) {
    let [code, input] = code_input_lst[i];
    let match = subSol.f(code, input);
    testSets.push([
      [code, input],
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
