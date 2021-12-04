// import Manager Class
const Manager = require('../lib/Manager.js');

// test Manager objects
test('create Manager Object', () => {
    const manager = new Manager('Test1', 1, 'test1@gmail.com', '123-456-7890');

    expect(manager.name).toBe('Test1');
    expect(manager.id).toBe(1);
    expect(manager.email).toBe('test1@gmail.com');
    expect(manager.OfficeNumber).toBe('123-456-7890');
})

// test getOfficeNumber() method
test('get Managers OfficeNumber as an object', () => {
    const manager = new Manager('Test2', 2, 'test2@gmail.com', '123-456-7890');

    expect(manager.getOfficeNumber()).toEqual('123-456-7890');
})

// test getRole() method
test('get Managers Role as an object', () => {
    const manager = new Manager('Test3', 3, 'test3@gmail.com', '123-456-7890');

    expect(manager.getRole()).toEqual('Manager');
})