import csv from 'csvtojson';
import fs from 'fs';
import { pipeline, Transform } from 'stream';
import { createInterface } from 'readline';


const csvFilePath= './task-1/csv/nodejs-hw1-ex1.csv';
const outputFilePath = './task-1/csv/csv-to-txt.txt';

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


// Method 1

// const writeStream = fs.createWriteStream(outputFilePath, 'utf8');
// const readStream = fs.createReadStream(csvFilePath, {highWaterMark: 20});

// pipeline(
//     readStream,
//     csv(),
//     stringTransform,
//     writeStream,
//     (err) => {
//         if (err) {
//           console.error('Pipeline failed.', err);
//         } else {
//           console.log('Pipeline succeeded.');
//         }
//     }
// );


// Method 2

const writeStream = fs.createWriteStream(outputFilePath, 'utf8');
const readStream = fs.createReadStream(csvFilePath);
const readlineInterface = createInterface({ input: readStream });
const converter = csv();
converter.pipe(stringTransform).pipe(writeStream);

readlineInterface.on('line', (line) => {
    return converter.write(line + '\n');
});

writeStream.on('error', (err) => {
    console.log('writeStream error', err);
});
readStream.on('error', (err) => {
    console.log('readStream error', err);
});
