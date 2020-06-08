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

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url)
    .then(function (db) { // <- db as first argument
        const dbo = db.db('streamsDB');

        const mongoDBWritable = new stream.Writable({
            objectMode: true,
            write: function (record, encoding, next) {
                // console.log(record);
                dbo.collection('creatures').insertOne(record).then(() => {
                        next();
                    }
                ).catch(error => {
                    next(error);
                });
            }
        });

        mongoDBWritable.on('finish',() =>{
            console.log('end');
            db.close();
        })
        creaturesFileReadStream
            .pipe(parser)
            .pipe(mongoDBWritable);

    })







