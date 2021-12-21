// PORTFOLIO GENERATOR  

// import { writeFile } from 'fs';
const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2, process.argv.length);
const [_name, github] = profileDataArgs;

const pageHTML = generatePage(_name, github);

fs.writeFile('./index.html', pageHTML, err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see changes.');
});
