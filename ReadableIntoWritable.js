'use strict';

const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/sample1.txt');
const writableStream = fs.createWriteStream(__dirname + '/output/outputReadableToWritable.txt');

// Readable Stream into Writable Stream Pipe

readableStream.on("error", (error) =>{
    console.error(error);
})

readableStream.on('data', (data) =>{
    // Push Data to writable stream directly instead of saving it to memory
    writableStream.write(data);
});

readableStream.on('end', () =>{
    writableStream.end();
    // CALL API DATABASE
})

writableStream.on("error", (error) =>{
    console.error(error);
})








// readable.on('data', (chunk) => {
//     writable.write(chunk);
// });
//
// readable.on('end', () => {
//     writable.end();
// });


// Readable Stream ====> Memory --> Use from memory
// Input File ====> Memory --> File

// Readable Stream ====> Writable Stream
// Input File ====> Output File
