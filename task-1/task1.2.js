import csv from 'csvtojson';
import fs from 'fs';
import { pipeline, Transform } from 'stream';

const csvFilePath= './task-1/csv/nodejs-hw1-ex1.csv';
const outputFilePath = './task-1/csv/csv-to-txt.txt';

const writeStream = fs.createWriteStream(outputFilePath, 'utf8');
const readStream = fs.createReadStream(csvFilePath, {highWaterMark: 20});

writeStream.on('error', (err) => {
    console.log('writeStream error', err);
});

const stringTransform = new Transform();
stringTransform._transform = function(chunk, encoding, done) {
    const stringToObj = JSON.parse(chunk.toString());
    const newObj = {};
    Object.entries(stringToObj).forEach(([key, value]) => {
        if (key === 'Amount') {
            return;
        }
        if (key === 'Price') {
            newObj[key.toLowerCase()] = Number(value);
            return;
        }
        newObj[key.toLowerCase()] = value;
    });
    done(null, JSON.stringify(newObj) + '\n');
};

pipeline(
    readStream,
    csv(),
    stringTransform,
    writeStream,
    (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        } else {
          console.log('Pipeline succeeded.');
        }
    }
);
