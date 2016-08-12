'use strict';

function Reader(text) {
    this.index = 0;
    this.size = 0;
    this.getChunk = function () {
        if (this.index > text.length - 1)
            return '';
        this.index += this.size;
        this.size = (1 + Math.random() * (text.length - this.index)) | 0; // [1 ~ ]
        return text.substring(this.index, this.index + this.size);
    };
}

function DocumentParser(reader) {
    this.reader = reader;
    this.reset();
}

DocumentParser.prototype.reset = function () {
    this.wordCount = 0;
    this.charCount = 0;
    this.lineCount = 0;
};

function g() {

}

let Solution = {
    d: `
    https://www.codewars.com/kata/word-char-and-line-count

    Goal

    The goal is to count the number of words, 
    chars and lines in a block of text. 
    [Pretty much like the wc command].

    Fill the parse method so that the 3 counters 
    (wordCount, charCount & lineCount) are 
    properly setted in the DocumentParser object.

    Helper

    In order to handle large blocks of text, 
    you do not receive any string in the constructor or in the parse method.

    Instead, you receive a Reader instance as 
    a parameter of your DocumentParser constructor.

    This reader expose only one method : getChunk()

    Returns the following fragment of text from the file it is reading
    Returns a string of random size
    Returns at least one char
    Returns an empty string when finished
    Constraints

    You have to call getChunk as many times as needed to fully read the file.
    You cannot concatenete calls to getChunk: 
    to simulate limited memory, each chunk must be parsed individually.
    Regex are not allowed.
    Technical note: 
    This is to simulate the processing of every kind of file, 
    especially huge files that cannot fits into memory.

    Word boundaries

    What is a word ? Keep it simple :

    Words are separated with one or more space character(s), examples:
    "Hello world" is 2 words
    "Hello   world" is 2 words
    "mother-in-law" is 1 word
    Lines are separated with "\n"
    "Hello\nworld" is 2 words
    "Hello World.\nBraaaiiiiiiinnnnsss" is 3 words
    Control character \n should be ignored in the character count
    Punctuation is correctly located: no need to parse punctuation
    Examples

    "Hello World"

    Chars: 11
    Words: 2
    Lines: 1
    "Is it me, or you?"

    Chars: 17
    Words: 5
    Lines: 1
    "You can try, but you'll never catch me.\nBazinga!"

    Chars: 47
    Words: 9 (you'll = 1 word)
    Lines: 2
    `
};
Solution.parse_01 = {
    d: `intuitive`,
    f: function (text) {
        this.f$();
        let reader = new Reader(text);
        let parser = new DocumentParser(reader);
        parser.parse();
        return [parser.charCount, parser.wordCount, parser.lineCount];
    },
    f$: function () {
        DocumentParser.prototype.parse = function () {
            let chunk;
            let char;
            let cntWord = false;
            this.reset();
            while ((chunk = this.reader.getChunk())) {
                for (let i = 0; i < chunk.length; i++) {
                    char = chunk[i];
                    if (char == '\n') {
                        this.lineCount++;
                        if (cntWord) {
                            this.wordCount++;
                            cntWord = false;
                        }
                    } else {
                        this.charCount++;
                        if (char == ' ') {
                            if (cntWord) {
                                this.wordCount++;
                                cntWord = false;
                            }
                        } else {
                            cntWord = true;
                        }
                    }
                }
            }
            if (this.lineCount || this.charCount)
                this.lineCount++;
            if (cntWord)
                this.wordCount++;
        };
    }
};
Solution.parse_02 = {
    d: ``,
    f: function (text) {
        this.f$();
        let reader = new Reader(text);
        let parser = new DocumentParser(reader);
        parser.parse();
        return [parser.charCount, parser.wordCount, parser.lineCount];
    },
    f$: function () {
        DocumentParser.prototype.parse = function () {
            let onSpace = true;
            let chunk = '';
            while (chunk = this.reader.getChunk()) {
                for (let i = 0, c; i < chunk.length; ++i) {
                    c = chunk[i];
                    if (c == '\n') {
                        onSpace = true;
                        ++this.lineCount;
                    } else {
                        ++this.charCount;
                        if (c != ' ' && onSpace)
                            ++this.wordCount;
                        onSpace = c == ' ';
                    }
                }
            }
            if (this.lineCount || this.charCount)
                ++this.lineCount;
        };
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

function genSets(parse) {
    let testSets = [];
    for (let i = 10; i < 1000; i++) {
        let text = randStringBy(i, 'abcdefgABCDEFG0123456789;.,\n ');
        let match = parse.f(text);
        testSets.push([
            [text, ],
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