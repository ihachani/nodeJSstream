'use strict';

const stream = require('stream');

const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/sample1.txt');

const upperCaseTr = new stream.Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

const writableStream = fs.createWriteStream(__dirname + '/output/outputTransform.txt');


// Readable Stream into Writable Stream Pipe

readableStream.on("error", (error) =>{
    console.error(error);
})

writableStream.on("error", (error) =>{
    console.error(error);
})

readableStream
    .pipe(upperCaseTr)
    .pipe(writableStream);

// for (let i = 0 ; i < 10; i++) {
//     readableStream.push('line' + i + '\n');
// }
// readableStream.push(null);

// Readable Stream ====> Memory --> Use from memory
// Input File ====> Memory --> File

// Readable Stream ====> Writable Stream
// Input File ====> Output File

// Readable Stream ====> Transform Stream =====> Writable Stream
// Readable Stream ====> Transform Stream =====> Transform Stream =====> Transform Stream =====> Writable Stream
// csv file
// readfile ===> Parse File ==> Clean Data ==> Transform fields ==> Send to database
