'use strict';


const stream = require('stream');

const fs = require('fs');

const readableStream = new stream.Readable();
const writableStream = fs.createWriteStream(__dirname + '/output/outputReadableToWritablePipe1.txt');

// Readable Stream into Writable Stream Pipe

readableStream.on("error", (error) =>{
    console.error(error);
})

writableStream.on("error", (error) =>{
    console.error(error);
})

readableStream.pipe(writableStream);

for (let i = 0 ; i < 10; i++) {
    readableStream.push('line' + i + '\n');
}
readableStream.push(null);

// Readable Stream ====> Memory --> Use from memory
// Input File ====> Memory --> File

// Readable Stream ====> Writable Stream
// Input File ====> Output File

// Readable Stream ====>  Transform Stream =====> Writable Stream
