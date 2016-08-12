'use strict';

function g(MemoryManager) {

    let ret = [];
    let isErr = false;

    // Allocate is constrained by memory size
    let mem = new MemoryManager(new Array(256));
    isErr = false;
    try { // cannot allocate more memory than exists
        mem.allocate(512);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);
    let pointer1 = mem.allocate(128);
    ret.push(pointer1 >= 0); // alloc should return pointer
    isErr = false;
    try { // cannot allocate more memory than available
        mem.allocate(129);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);

    // Allocate does not have a memory overhead
    mem = new MemoryManager(new Array(256));
    isErr = false;
    try { // should be able to allocate 256 blocks of size 1
        for (let i = 0; i < 256; i++) {
            mem.allocate(1);
        }
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);

    // Released memory may be re-allocated
    mem = new MemoryManager(new Array(64));
    pointer1 = mem.allocate(32);
    let pointer2 = mem.allocate(32);
    mem.release(pointer1);
    isErr = false;
    try { // should be able to allocate 32 bits
        mem.allocate(32);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);

    // Released memory is merged when free blocks are adjacent
    mem = new MemoryManager(new Array(64));
    pointer1 = mem.allocate(16);
    pointer2 = mem.allocate(16);
    let pointer3 = mem.allocate(16);
    let pointer4 = mem.allocate(16);
    mem.release(pointer2);
    mem.release(pointer3);
    isErr = false;
    try { // deallocated memory should be merged
        mem.allocate(32);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);

    // May not write to unallocated blocks
    mem = new MemoryManager(new Array(64));
    isErr = false;
    try { // no memory has been allocated
        mem.write(1, 1);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);

    // May write to allocated blocks
    let array = new Array(64),
        a = 0,
        b = 1,
        c = 31,
        d = 32;
    mem = new MemoryManager(array);
    pointer1 = mem.allocate(32);
    isErr = false;
    try {
        // should be able to write to allocated pointer'
        mem.write(pointer1, a);
        // should be able to write to allocated pointer + 1'
        mem.write(pointer1 + b, b);
        // should be able to write to allocated pointer + 31'
        mem.write(pointer1 + c, c);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);
    isErr = false;
    try {
        // should throw on write to allocated pointer + 32'
        mem.write(pointer1 + d, d);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);
    ret.push(array[pointer1 + a]);
    ret.push(array[pointer1 + b]);
    ret.push(array[pointer1 + c]);
    ret.push(array[pointer1 + d]);

    // May not read from unallocated blocks
    mem = new MemoryManager(new Array(64));
    isErr = false;
    try { // no memory has been allocated
        mem.read(1);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);

    // May read from allocated blocks
    mem = new MemoryManager(new Array(64));
    pointer1 = mem.allocate(32);
    mem.write(pointer1, 1);
    isErr = false;
    try { // should be able to read at allocated pointer
        mem.read(pointer1);
    } catch (err) {
        isErr = true;
    }
    ret.push(isErr);
    ret.push(mem.read(pointer1));
    ret.push(mem.read(pointer1 + 1));

    return ret;
}

let Solution = {
    d: `
    http://www.codewars.com/kata/536e7c7fd38523be14000ca2

    One of the services provided by an operating system is memory management. 
    The OS typically provides an API for allocating and releasing memory in 
    a process's address space. 
    A process should only read and write memory at addresses which 
    have been allocated by the operating system. 
    In this kata you will implement a simulation of a simple memory manager.

    JavaScript has no low level memory API, 
    so for our simulation we will simply use an array as the process address space. 
    The memory manager constructor will accept an array and will 
    allocate blocks of indices from that array rather than memory pages.

    Memory Manager Contract

    allocate

    allocate accepts an integer and returns an integer pointer which 
    should be the index of the beginning of a sequential block of indices of 
    length size in the array passed to the constructor. 
    If there is no such sequential block available this method should throw an exception.

    release

    release accepts an integer which must be a pointer previously returned from 
    allocate and releases the block beginning at that pointer. 
    If the released block is adjacent to another free block, 
    the two blocks should be merged to form a larger free block. 
    Releasing an unallocated block should cause an exception.

    write

    To support testing this simulation our memory manager needs to 
    enforce read/write restrictions. 
    Only indices within allocated blocks may be written to. 
    The write method accepts an index integer and a value. 
    If the index is within an allocated block, 
    the value should be stored to the backing array; 
    otherwise, this method should throw an exception.

    read

    This method is the counterpart to write. 
    Only indices within allocated blocks may be read. 
    The read method accepts an index integer. 
    If the index is within an allocated block, 
    the method should return the value from the backing array at that index; 
    otherwise, this method should throw an exception.
    `
};
Solution.subSol_01 = {
    d: `intuitive`,
    f: function () {
        return g(this.f$());
    },
    f$: function () {
        function MemoryManager(memory) {
            this.memory = memory;
            this.allocated = memory.slice().fill(0);
        }
        MemoryManager.prototype.allocate = function (size) {
            if (this.allocated.length - this.allocated.reduce((s, x) => x !== 0 ? s + 1 : s, 0) < size)
                throw 'No Enough Memory';
            let pointer = this.allocated.indexOf(0);
            let i;
            for (i = pointer; i < pointer + size - 1; i++) {
                this.allocated[i] = 1;
            }
            this.allocated[i] = 2;
            return pointer;
        };
        MemoryManager.prototype.release = function (pointer) {
            if (pointer < 0 || pointer >= this.allocated.length)
                throw 'Invalid Pointer';
            if (this.allocated[pointer] === 0)
                throw 'Not Allocated';
            while (this.allocated[pointer] == 1) {
                this.allocated[pointer++] = 0;
            }
            this.allocated[pointer] = 0;
        };
        MemoryManager.prototype.read = function (pointer) {
            if (pointer < 0 || pointer >= this.allocated.length)
                throw 'Invalid Pointer';
            if (this.allocated[pointer] === 0)
                throw 'Not Allocated';
            return this.memory[pointer];
        };
        MemoryManager.prototype.write = function (pointer, value) {
            if (pointer < 0 || pointer >= this.allocated.length)
                throw 'Invalid Pointer';
            if (this.allocated[pointer] === 0)
                throw 'Not Allocated';
            return (this.memory[pointer] = value);
        };
        return MemoryManager;
    }
};
Solution.subSol_02 = {
    d: `author's`,
    f: function () {
        return g(this.f$());
    },
    f$: function () {
        function Block(address, size, free, next, prev) {
            this.address = address;
            this.size = size;
            this.next = next;
            this.prev = prev;
            this.isFree = free;
            this.allocate = function (size) {
                if (this.size == size) {
                    this.isFree = false;
                    return this.address;
                } else if (this.size > size) {
                    let block = new Block(this.address, size, false, this, this.prev);
                    if (this.prev) {
                        this.prev.next = block;
                    }
                    this.prev = block;
                    this.size -= size;
                    this.address += size;
                    return block.address;
                }
            };
            this.release = function () {
                this.isFree = true;
                if (this.prev && this.prev.isFree) {
                    this.address = this.prev.address;
                    this.size += this.prev.size;
                    this.prev.prev.next = this;
                    this.prev = this.prev.prev;
                }
                if (this.next && this.next.isFree) {
                    this.size += this.next.size;
                    this.next.next.prev = this;
                    this.next = this.next.next;
                }
            };
        }

        function MemoryManager(memory) {
            this.memory = memory || [];
            this.blocks = new Block(0, this.memory.length, true);
        }
        MemoryManager.prototype.allocate = function (size) {
            let block = this.blocks,
                pointer;
            while (block && !(block.isFree && block.size >= size)) {
                block = block.next;
            }
            if (!block) {
                throw 'Out of memory. Could not allocate block with size ' + size + '.';
            }
            pointer = block.allocate(size);
            while (pointer < this.blocks.address) {
                this.blocks = this.blocks.prev;
            }
            return pointer;
        };
        MemoryManager.prototype.release = function (pointer) {
            let block = this.blocks;
            while (block && block.address != pointer) {
                block = block.next;
            }
            if (!block) {
                throw 'Could not release block at address ' + pointer + '. It may not have been allocateated.';
            }
            block.release();
        };
        MemoryManager.prototype.read = function (pointer) {
            let block = this.blocks;
            while (block && (block.isFree || block.address > pointer || block.address + block.size <= pointer)) {
                block = block.next;
            }
            if (!block) {
                throw 'Access fault at ' + pointer;
            }
            return this.memory[pointer];
        };
        MemoryManager.prototype.write = function (pointer, value) {
            let block = this.blocks;
            while (block && (block.isFree || block.address > pointer || block.address + block.size <= pointer)) {
                block = block.next;
            }
            if (!block) {
                throw 'Access fault at ' + pointer;
            }
            this.memory[pointer] = value;
        };
        return MemoryManager;
    }
};
Solution.subSol_03 = {
    d: `interesting way to throw error`,
    f: function () {
        return g(this.f$());
    },
    f$: function () {
        function MemoryManager(memory) {
            this.memory = memory;
            this.blocks = [{
                start: 0,
                size: memory.length,
                allocated: false
            }];
        }
        MemoryManager.prototype.allocate = function (size) {
            // find an unallocated block at least as big as <size>
            for (let i = this.blocks.length - 1; i >= 0; --i) {
                let block = this.blocks[i];
                if (!block.allocated && block.size >= size) {
                    // block size matches exactly; allocate entire block
                    if (block.size == size) {
                        block.allocated = true;
                        return block.start;
                    }
                    // otherwise break off a chunk at the end of the block
                    block.size -= size;
                    let newBlock = {
                        start: block.start + block.size,
                        size: size,
                        allocated: true
                    };
                    this.blocks.splice(i + 1, 0, newBlock);
                    return block.start + block.size;
                }
            }
            // no block found; out of memory
            INSUFFICIENT_MEMORY;
        };
        MemoryManager.prototype.release = function (pointer) {
            // find block at pointer address starting at end
            for (let i = this.blocks.length - 1; i >= 0; --i) {
                let block = this.blocks[i];
                if (block.start == pointer) {
                    // can't release unallocated block
                    if (!block.allocated)
                        BLOCK_NOT_ALLOCATED;
                    block.allocated = false;
                    // combine adjacent unallocated blocks
                    let prevBlock = this.blocks[i - 1];
                    let nextBlock = this.blocks[i + 1];
                    if (nextBlock && !nextBlock.allocated) {
                        block.size += nextBlock.size;
                        this.blocks.splice(i + 1, 1);
                    }
                    if (prevBlock && !prevBlock.allocated) {
                        prevBlock.size += block.size;
                        this.blocks.splice(i, 1);
                    }
                    return;
                }
            }
            // no block found, invalid memory pointer
            NO_SUCH_BLOCK;
        };
        MemoryManager.prototype.read = function (pointer) {
            // ensure pointer is in allocated block
            for (let i = this.blocks.length - 1; i >= 0; --i) {
                let block = this.blocks[i];
                if (block.allocated && block.start <= pointer && block.start + block.size > pointer)
                    return this.memory[pointer];
            }
            // pointer is not within allocated block
            INVALID_MEMORY_POINTER;
        };
        MemoryManager.prototype.write = function (pointer, value) {
            // ensure pointer is in allocated block
            for (let i = this.blocks.length - 1; i >= 0; --i) {
                let block = this.blocks[i];
                if (block.allocated && block.start <= pointer && block.start + block.size > pointer)
                    return this.memory[pointer] = value;
            }
            // pointer is not within allocated block
            INVALID_MEMORY_POINTER;
        };
        return MemoryManager;
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
    for (let i = 0; i < 1; i++) {
        let match = subSol.f();
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