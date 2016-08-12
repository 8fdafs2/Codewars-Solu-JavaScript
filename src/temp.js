'use strict';

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
ret.push(pointer1); // alloc should return pointer
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

// // Released memory is merged when free blocks are adjacent
// mem = new MemoryManager(new Array(64));
// pointer1 = mem.allocate(16);
// pointer2 = mem.allocate(16);
// let pointer3 = mem.allocate(16);
// let pointer4 = mem.allocate(16);
// mem.release(pointer2);
// mem.release(pointer3);
// isErr = false;
// try { // deallocated memory should be merged
//     mem.allocate(32);
// } catch (err) {
//     isErr = true;
// }
// ret.push(isErr);

// // May not write to unallocated blocks
// mem = new MemoryManager(new Array(64));
// isErr = false;
// try { // no memory has been allocated
//     mem.write(1, 1);
// } catch (err) {
//     isErr = true;
// }
// ret.push(isErr);

// // May write to allocated blocks
// let array = new Array(64),
//     a = 0,
//     b = 1,
//     c = 31,
//     d = 32;
// mem = new MemoryManager(array);
// pointer1 = mem.allocate(32);
// isErr = false;
// try {
//     // should be able to write to allocated pointer'
//     mem.write(pointer1, a);
//     // should be able to write to allocated pointer + 1'
//     mem.write(pointer1 + b, b);
//     // should be able to write to allocated pointer + 31'
//     mem.write(pointer1 + c, c);
// } catch (err) {
//     isErr = true;
// }
// ret.push(isErr);
// isErr = false;
// try {
//     // should throw on write to allocated pointer + 32'
//     mem.write(pointer1 + d, d);
// } catch (err) {
//     isErr = true;
// }
// ret.push(isErr);
// ret.push(array[pointer1 + a]);
// ret.push(array[pointer1 + b]);
// ret.push(array[pointer1 + c]);
// ret.push(array[pointer1 + d]);

// // May not read from unallocated blocks
// mem = new MemoryManager(new Array(64));
// isErr = false;
// try { // no memory has been allocated
//     mem.read(1);
// } catch (err) {
//     isErr = true;
// }
// ret.push(isErr);

// // May read from allocated blocks
// mem = new MemoryManager(new Array(64));
// pointer1 = mem.allocate(32);
// mem.write(pointer1, 1);
// isErr = false;
// try { // should be able to read at allocated pointer
//     mem.read(pointer1);
// } catch (err) {
//     isErr = true;
// }
// ret.push(isErr);
// ret.push(mem.read(pointer1));
// ret.push(mem.read(pointer1 + 1));