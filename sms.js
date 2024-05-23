#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    studentId;
    coursesEnrolled;
    balance;
    constructor(name) {
        this.name = name;
        this.studentId = this.generateStudentId();
        this.coursesEnrolled = [];
        this.balance = 100000;
    }
    generateStudentId() {
        const id = Math.floor(10000 + Math.random() * 90000).toString();
        return id;
    }
    enrollCourse(course) {
        this.coursesEnrolled.push(course);
        console.log(chalk.green(`${this.name} has been enrolled in ${course}.`));
    }
    viewBalance() {
        console.log(chalk.yellow(`${this.name}'s balance: ${this.balance}`));
    }
    payFees(amount) {
        this.balance = this.balance - amount;
        console.log(chalk.green(`${this.name} has paid ${amount}. Remaining balance: ${this.balance}`));
    }
    // Show status (name, ID, courses enrolled, balance)
    showStatus() {
        console.log(chalk.blue(`Student Name: ${this.name}`));
        console.log(chalk.blue(`Student ID: ${this.studentId}`));
        console.log(chalk.blue(`Courses Enrolled: ${this.coursesEnrolled.join(", ")}`));
        console.log(chalk.blue(`Balance: ${this.balance}`));
    }
}
// Initialize student
let student;
// Main function
async function main() {
    console.log(chalk.bgGray.bold("Welcome to Student Management System!"));
    const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter student name:",
    });
    student = new Student(name);
    while (true) {
        const { option } = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select an option:",
            choices: [
                "Enroll in a course",
                "View balance",
                "Pay tuition fees",
                "Show status",
                "Exit",
            ],
        });
        // Handle selected option
        switch (option) {
            case "Enroll in a course":
                await enrollCourse();
                break;
            case "View balance":
                student.viewBalance();
                break;
            case "Pay tuition fees":
                await payFees();
                break;
            case "Show status":
                student.showStatus();
                break;
            case "Exit":
                console.log(chalk.bgBlue.bold("Thank you for using Student Management System!"));
                process.exit();
        }
    }
}
// Function to enroll in a course
async function enrollCourse() {
    const { course } = await inquirer.prompt({
        type: "list",
        name: "course",
        message: "select a course  to enroll:",
        choices: [chalk.blueBright.italic.bold("1.   INFORMATION TECHNOLOGY"),
            chalk.green.italic.bold("2.  BUSSINESS ADMINISTRAtION "),
            chalk.cyan.italic.bold("3.   COMPUTER SCIENCE "),
            chalk.magenta.italic.bold("4.  MATHEMATICS "),
            chalk.whiteBright.italic.bold("5.  POLITICAL SCIENCE "),
            chalk.grey.italic.bold("6.  ARTIFICIAL INTELLIGENCE "),
            chalk.red.italic.bold("7.  CHEMISTRY "),
            chalk.yellow.italic.bold("8.  PHYSICS "),
            chalk.green.italic.bold("9.  BOILOGY "),
            chalk.magenta.italic.bold("10.  INTERNATIONAL RELATIONS "),
        ],
    });
    student.enrollCourse(course);
}
// Function to pay tuition fees
async function payFees() {
    const { amount } = await inquirer.prompt({
        type: "number",
        name: "amount",
        message: "Enter amount to pay :",
    });
    student.payFees(amount);
}
// Start the program
main();
