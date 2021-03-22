import csv from 'csvtojson';
import fs from 'fs';

const csvFilePath= './task-1/csv/nodejs-hw1-ex1.csv';
const outputFilePath = './task-1/csv/csv-to-txt.txt';

const writeStream = fs.createWriteStream(outputFilePath, 'utf8');

writeStream.on('error', (err) => {
    console.log('writeStream error', err);
});

csv({ checkType: true })
    .fromFile(csvFilePath)
    .on('data', (line) => {
        writeStream.write(line)

    })
    .on('error', (err) => {
        console.log('error while parsing data', err);
    });