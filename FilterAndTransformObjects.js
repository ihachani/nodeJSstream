'use strict';

const stream = require('stream');
const readline = require('readline');

const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/resources/generated/sampleBig.txt');

function parseInputString(chunk) {
    let splitSting = chunk.toString().split(' ');
    return {
        fieldName: splitSting[0],
        value: splitSting[1]
    };
}

const parseStream = new stream.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        const data = parseInputString(chunk);
        this.push(data);
        callback();
    }
});
const filterStream = new stream.Transform({
    objectMode: true,
    transform(data, encoding, callback) {
        if (data.value !== 2) {
            this.push(data);
        }
        callback();
    }
})
const stringifyStream = new stream.Transform({
    objectMode: true,
    transform(data, encoding, callback) {
        this.push(JSON.stringify(data) + '\n');
        callback();

    }
});

const writableStream = fs.createWriteStream(__dirname + '/output/filterAndTransformObjectsBig.txt');


// Readable Stream into Writable Stream Pipe

readableStream.on("error", (error) => {
    console.error(error);
})

writableStream.on("error", (error) => {
    console.error(error);
})

parseStream
    .pipe(filterStream)
    .pipe(stringifyStream)
    .pipe(writableStream);

const rl = readline.createInterface({
    input: readableStream,
    // output: upperCaseTr,
    terminal: false
});

rl.on('line', function (line) {
    parseStream.write(line);

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
