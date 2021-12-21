// PORTFOLIO GENERATOR  

// import { writeFile } from 'fs';
const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username',
      validate: username => {
        if (username) {
          return true;
        } else {
          console.log('Please enter your github username');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
  ================
  Add a New Project
  ================
  `);
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: projectName => {
        if (projectName) {
          return true;
        } else {
          console.log('Please enter your github Project name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: description => {
        if (description) {
          return true;
        } else {
          console.log('Please enter your github Project description');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'Languages',
      message: 'What was used to build this project? (Check all that apply)',
      choices: ['JavaScript', 'HTML','CSS','ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub URL to the project. (Required)',
      validate: link => {
        if (link) {
          return true;
        } else {
          console.log('Please enter your github Project link');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  })
}

// promptUser().then(answers => {console.log(answers)});
// promptProject().then(answers => {console.log(answers)});
promptUser()
  .then(promptProject)
  .then(portfolioData => {console.log(portfolioData)});
