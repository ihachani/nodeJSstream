'use strict';

const stream = require('stream');
const readline = require('readline');

const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/resources/sample.txt');

const filterAndTransformStream = new stream.Transform({
    transform(chunk, encoding, callback) {
        if (chunk.toString() !== 'line 2') {
            let splitSting = chunk.toString().split(' ');
            switch (splitSting[1]) {
                case '3': {
                    this.push(splitSting[0] + ' 333' + '\n');
                    break;
                }
                default:
                    this.push(chunk.toString().toUpperCase() + '\n');
            }
        }
        callback();
    }
});

const writableStream = fs.createWriteStream(__dirname + '/output/filterAndTransform.txt');


// Readable Stream into Writable Stream Pipe

readableStream.on("error", (error) => {
    console.error(error);
})

writableStream.on("error", (error) => {
    console.error(error);
})

filterAndTransformStream.pipe(writableStream);

const rl = readline.createInterface({
    input: readableStream,
    // output: upperCaseTr,
    terminal: false
});

rl.on('line', function (line) {
    filterAndTransformStream.write(line);

});


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
