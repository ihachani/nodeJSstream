'use strict';

// BAD EXAMPLE DO NOT USE

const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/sample1.txt');
const writableStream = fs.createWriteStream(__dirname + '/output/outputBigFile.txt');

// Readable Stream into Buffer in memory
let fileContent = '';

readableStream.on("error", (error) =>{
    console.error(error);
})

readableStream.on('data', (data) =>{
    // console.log(data.toString());
    fileContent = fileContent + data.toString();
});

readableStream.on('end', () =>{

    writableStream.write(fileContent);
    writableStream.end();
    // console.log(`end result \n${fileContent}`);
    // CALL API DATABASE
})


writableStream.on("error", (error) =>{
    console.error(error);
})

// cat sample.txt >> sample1.txt   INFINITE LOOP
// readable.on('data', (chunk) => {
//     writable.write(chunk);
// });
//
// readable.on('end', () => {
//     writable.end();
// });


// Readable Stream ====> Memory --> Use from memory

// Readable Stream ==XXXXXX==> Memory --> Use from memory



// Input File ====> Memory --> File

// Readable Stream ====> Writable Stream
// Input File ====> Output File
