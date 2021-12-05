const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
let id = 0;

const promptManager = () => {
    return inquirer.prompt([{
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

const promptEmployee = employeeData => {
    console.log(`
    =================
    Add a New Employee
    =================`);
    // If there is no employee array, create a new array
    if (!employeeData.employees) {
        employeeData.employees = [];
    }
    return inquirer.prompt([{
                type: 'confirm',
                name: 'newEmployee',
                message: "Would you like to add a new Employee?",
                default: true
            },
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
            {
                type: 'list',
                name: 'employeeRole',
                message: "Select employee's role: (Required)",
                when: confirmEmployee => confirmEmployee.newEmployee,
                choices: ['Engineer', 'Intern']
            },
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
            employeeData.employees.push(newEmployee);
            if (newEmployee.newEmployee) {
                return promptEmployee(employeeData)
            } else {
                return employeeData;
            }
        });
}
promptManager()
    .then(promptEmployee)
    .then(answers => console.log(answers));