'use strict';

const csv = require('csv');
const parser = csv.parse({
    columns: true
});

const fs = require('fs');
const path = require('path');

const creaturesFilePath = path.join(__dirname, '..', 'resources', 'creatures.csv');
const creaturesFileReadStream = fs.createReadStream(creaturesFilePath);

const stream = require('stream');

const stringifyStream = new stream.Transform({
    objectMode: true,
    transform(data, encoding, callback) {
        console.log(data.name);
        this.push(JSON.stringify(data) + '\n');
        callback();
    }
});

creaturesFileReadStream
    .pipe(parser)
    .pipe(stringifyStream);




