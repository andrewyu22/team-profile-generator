// import Engineer Class
const Engineer = require('../lib/Engineer.js');

// test Engineer objects
test('create Engineer Object', () => {
    const engineer = new Engineer('Test1', 1, 'test1@gmail.com', 'github1');

    expect(engineer.name).toBe('Test1');
    expect(engineer.id).toBe(1);
    expect(engineer.email).toBe('test1@gmail.com');
    expect(engineer.github).toBe('github1');
})

// test getGithub() method
test('get Engineers github as an object', () => {
    const engineer = new Engineer('Test2', 2, 'test2@gmail.com', 'github2');

    expect(engineer.getGithub()).toEqual('github2');
})

// test getRole() method
test('get Engineers role as an object', () => {
    const engineer = new Engineer('Test3', 3, 'test3@gmail.com', 'github3');

    expect(engineer.getRole()).toEqual("Engineer");
})