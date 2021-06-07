const readlineSync = require('readline-sync');

const todoList = [];
const funcList = ["add", "list", "check", "remove"];

function start() {
    const index = readlineSync.keyInSelect(funcList);
    if (funcList[index] === "add") {
        const newTodo = readlineSync.question('Qual a todo a ser adicionada? ');
        todoList.push(`[ ] ${newTodo}`);
        start();
    } else if (funcList[index] === "list") {
        console.log('====================');
        todoList.forEach(e => console.log(e));
        console.log('====================');
        start();
    } else if (funcList[index] === "check") {
        const todoToCheck = readlineSync.keyInSelect(todoList, 'Qual todo deseja dar check-uncheck? ');
        if (todoList[todoToCheck].length > 0) {
            if (todoList[todoToCheck][1] === " ") {
                todoList[todoToCheck] = todoList[todoToCheck].replace(' ', 'X');
            } else {
                todoList[todoToCheck] = todoList[todoToCheck].replace('X', ' ');
            }
        }
        start();
    } else if (funcList[index] === "remove") {
        const removeTodo = readlineSync.keyInSelect(todoList,'Qual a todo a ser removida? ');
        todoList.splice(removeTodo, 1);
        start();
    }
}

start();



