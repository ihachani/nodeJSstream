'use strict';


// NOT WORKING
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


const MongoClient = function () {
    MongoClient.connect(url)
        .then(function (db) { // <- db as first argument
            console.log(db)
            return
        })

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        const dbo = db.db('streamsDB');
        const myobj = {name: "Company Inc", address: "Highway 37"};
        dbo.collection("customers").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log('Collection created!');
            db.close();
        });
    });
    const stream = require('stream');
    const mongoDBWritableStream = new stream.writable({
        objectMode: true,
        write: function (record , encoding, next) {
            console.log(record);
            next();
        }
    })


    return mongoDBWritableStream;
}

module.exports = mongoDBWritableStream;
