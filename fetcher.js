const request = require('request');
const fs = require('fs');
const readline = require('readline');
const arg = process.argv.splice(2);
const webpage = arg[0];
const filepath = arg[1];

request(webpage, (err, response, body) => {
  if (err) {
    console.log(`Incorrect url - ${webpage}`);
    process.exit();
  }
  fs.exists(filepath, exist => {
    if (! exist) writeToFile(body, response);
    else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(`${filepath} already exists do you want to rewrite it? (y/n)`, answer => {
        if (answer.toLowerCase() === 'n') process.exit();
        else writeToFile(body,response);
      });
    }
  });
});

const writeToFile = (body, response) => {
  fs.writeFile(filepath, body, err => {
    if (err) {
      console.log(`Incorrect path - ${filepath}`);
      process.exit();
    }
    console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${filepath}`);
  });
};

