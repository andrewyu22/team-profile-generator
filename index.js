const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const { writeFile, copyFile } = require('./lib/generateFile.js');
const generateHTML = require('./src/html-template.js');
let id = 0;

// increment ID
function generateid() {
    // increase id by 1
    id++;
    return id;
}

// prompt for new Manager's Information
const promptManager = () => {
    // prompt users questions and return the answers
    return inquirer.prompt([
        // get Managers Name
        {
            type: 'input',
            name: 'managerName',
            message: "Please enter the manager's name: (Required)",
            validate: managerName => {
                if (managerName) {
                    return true;
                } else {
                    console.log("Please enter a manager's name!")
                    return false;
                }
            }
        },
        // get Managers Email
        {
            type: 'input',
            name: 'managerEmail',
            message: "Please enter the manager's Email: (Required)",
            validate: managerEmail => {
                if (managerEmail) {
                    return true;
                } else {
                    console.log("Please enter a manager's Email!")
                    return false;
                }
            }
        },
        // get Managers Office Number
        {
            type: 'input',
            name: 'managerNumber',
            message: "Please enter the manager's office number: (Required)",
            validate: managerNumber => {
                if (managerNumber) {
                    return true;
                } else {
                    console.log("Please enter a manager's office number!")
                    return false;
                }
            }
        }
    ])
}

// prompt for new Employee's Information
const promptEmployee = employeeData => {
    console.log(`
    =================
    Add a New Employee
    =================`);
    // If there is no employee array, create a new array
    if (!employeeData.employees) {
        employeeData.employees = [];
    }
    // prompt users questions and return the answers
    return inquirer.prompt([
            // Confirm if we would like to add a new employee
            {
                type: 'confirm',
                name: 'newEmployee',
                message: "Would you like to add a new Employee?",
                default: true
            },
            // If newEmployee is true, ask for Employee's Name
            {
                type: 'input',
                name: 'employeeName',
                message: "Please enter the employee's name: (Required)",
                when: confirmEmployee => confirmEmployee.newEmployee,
                validate: name => {
                    if (name) {
                        return true;
                    } else {
                        console.log("Please enter a name!");
                        return false;
                    }
                }
            },
            // If newEmployee is true, ask for Employee's Email
            {
                type: 'input',
                name: 'employeeEmail',
                message: "Please enter the employee's Email: (Required)",
                when: confirmEmployee => confirmEmployee.newEmployee,
                validate: email => {
                    if (email) {
                        return true;
                    } else {
                        console.log("Please enter a Email!");
                        return false;
                    }
                }
            },
            // If newEmployee is true, ask for Employee's Role
            {
                type: 'list',
                name: 'employeeRole',
                message: "Select employee's role: (Required)",
                when: confirmEmployee => confirmEmployee.newEmployee,
                choices: ['Engineer', 'Intern']
            },
            // If employeeRole is Engineer, ask for github username
            {
                type: 'input',
                name: 'github',
                message: "Enter github username: (Required)",
                when: role => role.employeeRole === 'Engineer',
                validate: github => {
                    if (github) {
                        return true;
                    } else {
                        console.log("Please enter a github username!");
                        return false;
                    }
                }
            },
            // if employeeRole is Intern, ask for school Name
            {
                type: 'input',
                name: 'school',
                message: "Enter school name: (Required)",
                when: role => role.employeeRole === 'Intern',
                validate: school => {
                    if (school) {
                        return true;
                    } else {
                        console.log("Please enter a School Name!");
                        return false;
                    }
                }
            }
        ])
        .then(newEmployee => {
            // push new Employee information into employees array
            employeeData.employees.push(newEmployee);
            // if newEmployee = true (yes)
            if (newEmployee.newEmployee) {
                // call promptEmployee again and pass on the updated object
                return promptEmployee(employeeData)
            } else {
                // return the array of objects
                return employeeData;
            }
        });
}

promptManager()
    .then(promptEmployee)
    .then(answers => {
        // create empty team array
        let team = [];
        // create a new class object called manager
        const manager = new Manager(answers.managerName, generateid(), answers.managerEmail, answers.managerNumber);
        // push manager object into team array
        team.push(manager);
        // employees is an array of objects of employee (Iterate through each employee)
        answers.employees.forEach(employee => {
            // make sure newEmployee confirm is true
            if (employee.newEmployee) {
                // switch base off employee role
                switch (employee.employeeRole) {
                    // if role === Engineer
                    case 'Engineer':
                        // create a new class object called engineer
                        const engineer = new Engineer(employee.employeeName, generateid(), employee.employeeEmail, employee.github);
                        // push engineer object into team array
                        team.push(engineer);
                        break;
                        // if role === Intern
                    case 'Intern':
                        // create a new class object called engineer
                        const intern = new Intern(employee.employeeName, generateid(), employee.employeeEmail, employee.school);
                        // push intern object into team array
                        team.push(intern);
                        break;
                }
            }
        })

        // return array of class objects
        return team;
    })
    .then(teamData => {
        // take array of class objects and call generateHTML function return a string of HTML template
        return generateHTML(teamData);
    })
    .then(htmlData => {
        // take HTML template and writeFile and Copy Css File into dist folder
        writeFile(htmlData);
        copyFile();
    })
    .catch(err => {
        console.log(err);
    });