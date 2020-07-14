'use strict';

const csv = require('csv');
const parser = csv.parse({
    columns: true
});
let parseCounter = 0;
let mongoCounter = 0;

const fs = require('fs');
const path = require('path');

const creaturesFilePath = path.join(__dirname, '..', 'resources', 'creatures.csv');
const creaturesFileReadStream = fs.createReadStream(creaturesFilePath);

const stream = require('stream');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url)
    .then(function (db) { // <- db as first argument
        const dbo = db.db('streamsDB');

        const mongoDBWritable = new stream.Writable({
            highWaterMark: 4,
            objectMode: true,
            write: function (record, encoding, next) {
                // console.log(record);
                dbo.collection('creatures').insertOne(record).then(() => {
                            mongoCounter++;
                            console.log('sent to mongo Database ' + mongoCounter + ' parsed records ' + parseCounter);
                            next();
                    }
                ).catch(error => {
                    next(error);
                });
            }
        });

        parser.on('data', () => {
            parseCounter++;
        });

        mongoDBWritable.on('finish', () => {
            console.log('end');
            db.close();
        })
        creaturesFileReadStream
            .pipe(parser)
            .pipe(mongoDBWritable);

    })

