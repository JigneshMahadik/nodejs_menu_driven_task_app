const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataFilePath = "TaskList.json";

function loadTasks() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, 2));
}

function addTask(taskName) {
    const tasks = loadTasks();
    tasks.push({ name: taskName, completed: false });
    saveTasks(tasks);
}

function viewTasks() {
    const tasks = loadTasks();
    console.log('Tasks:');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.name}`);
    });
}

function markTaskComplete(index) {
    const tasks = loadTasks();
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        saveTasks(tasks);
        console.log('Task marked as complete.');
    } else {
        console.log('Invalid task index.');
    }
}

function removeTask(index) {
    const tasks = loadTasks();
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log('Task removed successfully.');
    } else {
        console.log('Invalid task index.');
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log('\nMain Menu:');
    console.log('1. Add a new task');
    console.log('2. View list of tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');
    rl.question('Select an option: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Enter task name: ', (taskName) => {
                    addTask(taskName);
                    mainMenu();
                });
                break;
            case '2':
                viewTasks();
                mainMenu();
                break;
            case '3':
                rl.question('Enter task index to mark as complete: ', (index) => {
                    markTaskComplete(parseInt(index) - 1);
                    mainMenu();
                });
                break;
            case '4':
                rl.question('Enter task index to remove: ', (index) => {
                    removeTask(parseInt(index) - 1);
                    mainMenu();
                });
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                mainMenu();
                break;
        }
    });
}

mainMenu();
