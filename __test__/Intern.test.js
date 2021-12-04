// import Intern Class
const Intern = require('../lib/Intern.js');

// test Intern objects
test('create Intern Object', () => {
    const intern = new Intern('Test1', 1, 'test1@gmail.com', 'Columbia');

    expect(intern.name).toBe('Test1');
    expect(intern.id).toBe(1);
    expect(intern.email).toBe('test1@gmail.com');
    expect(intern.school).toBe('Columbia');
})

// test getSchool() method
test('get Interns School as an object', () => {
    const intern = new Intern('Test2', 2, 'test2@gmail.com', 'Columbia');

    expect(intern.getSchool()).toEqual('Columbia');
})

// test getRole() method
test('get Interns Role as an object', () => {
    const intern = new Intern('Test3', 3, 'test3@gmail.com', 'Columbia');

    expect(intern.getRole()).toEqual('Intern');
})