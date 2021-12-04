const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, OfficeNumber) {
        super(name, id, email);
        this.OfficeNumber = OfficeNumber;
    }

    getOfficeNumber() {
        return `Office Number: ${this.OfficeNumber}`;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;