'use strict';
const numberOfDuplications = 1000000;

const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/resources/sample.txt');
const writableStream = fs.createWriteStream(__dirname + '/resources/generated/sampleBig.txt', {
    'flags': 'a'
});

readableStream.on("error", (error) => {
    console.error(error);
})

writableStream.on("error", (error) => {
    console.error(error);
})

readableStream.on("end", () => {
    console.log('readable finished');
})

writableStream.on("finish", () => {
    console.log('writable finished');
    copyFileToOutputFile(1);
})

function copyFileToOutputFile(counter) {

    console.log('copyFileToOutputFile called');
    const newReadableStream = fs.createReadStream(__dirname + '/resources/sample.txt');

    const newWritableStream = fs.createWriteStream(__dirname + '/resources/generated/sampleBig.txt', {
        'flags': 'a'
    });

    newReadableStream.pipe(newWritableStream);

    newWritableStream.on("finish", () => {
        console.log(`progress ${counter}/${numberOfDuplications} \t${(counter/numberOfDuplications * 100)}%`);
        if (counter < numberOfDuplications) {
            copyFileToOutputFile(++counter);
        }
    })

}

readableStream.pipe(writableStream);
