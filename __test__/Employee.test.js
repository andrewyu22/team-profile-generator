// import Employee Class
const Employee = require('../lib/Employee.js');

// test Employee objects
test('create Employee Object', () => {
    const employee = new Employee('Test1', 1, 'test1@gmail.com');

    expect(employee.name).toBe('Test1');
    expect(employee.id).toBe(1);
    expect(employee.email).toBe('test1@gmail.com');
})

// test getName() method
test('get Employees name as an object', () => {
    const employee = new Employee('Test2', 2, 'test2@gmail.com');

    expect(employee.getName()).toEqual('Test2');
})

// test getId() method
test('get Employees id as an object', () => {
    const employee = new Employee('Test3', 3, 'test3@gmail.com');

    expect(employee.getId()).toEqual(3);
})

// test getEmail() method
test('get Employees email as an object', () => {
    const employee = new Employee('Test4', 4, 'test4@gmail.com');

    expect(employee.getEmail()).toEqual('test4@gmail.com');
})

// test getRole() method
test('get Employees role as an object', () => {
    const employee = new Employee('Test5', 5, 'test5@gmail.com');

    expect(employee.getRole()).toEqual('Employee');
})