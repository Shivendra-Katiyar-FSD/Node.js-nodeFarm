///////////////////////////////////
//////////FileSystem///////////////
///////////////////////////////////

const fs = require('fs');

// Synchronous way - Blocking Behaviour
console.log("Synchronous way - Blocking Behaviour");
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textInput);

const textOut = `This is what we know about the avocados: ${textInput}. \nCreated on: ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log("File written Successfully");


// Asynchronous way - Non Blocking Behaviour
console.log(`\nAsynchronous way - Non Blocking Behaviour`);
fs.readFile('./txt/start.txt', 'utf-8', (err, data) =>{
    console.log(data);
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) =>{
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) =>{
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) =>{
                console.log("Your file has been written successfully✅");
            })
        })
    });
});

console.log("Reading your files 🔃");
