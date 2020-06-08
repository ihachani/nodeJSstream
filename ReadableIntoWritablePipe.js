'use strict';

const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/sample1.txt');
const writableStream = fs.createWriteStream(__dirname + '/output/outputReadableToWritablePipe.txt');

// Readable Stream into Writable Stream Pipe

readableStream.on("error", (error) =>{
    console.error(error);
})

writableStream.on("error", (error) =>{
    console.error(error);
})

readableStream.pipe(writableStream);



// Readable Stream ====> Memory --> Use from memory
// Input File ====> Memory --> File

// Readable Stream ====> Writable Stream
// Input File ====> Output File
