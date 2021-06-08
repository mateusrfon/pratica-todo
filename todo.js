const readlineSync = require('readline-sync');
const fs = require('fs');
let todoList = [];

if (fs.existsSync('./todoList.txt')) {
    todoList = JSON.parse(fs.readFileSync('./todoList.txt'));
}

const funcList = ["add", "list", "check", "remove", "pomodoro"];

function start() {
    const index = readlineSync.keyInSelect(funcList);
    if (funcList[index] === "add") {
        const newTodo = readlineSync.question('Qual a todo a ser adicionada? ');
        todoList.push(`🔴 ${newTodo}`);
        fs.writeFileSync('./todoList.txt', JSON.stringify(todoList));
        start();
    } else if (funcList[index] === "list") {
        console.log('========================');
        todoList.length > 0 ? todoList.forEach(e => console.log(e)) : console.log('Nenhuma todo registrada.');
        console.log('========================');
        start();
    } else if (funcList[index] === "check") {
        if (todoList.length > 0) {
            const todoToCheck = readlineSync.keyInSelect(todoList, 'Qual todo deseja dar check-uncheck? ');
            if (todoToCheck > -1) {
                if (todoList[todoToCheck].includes('🔴')) {
                    todoList[todoToCheck] = todoList[todoToCheck].replace('🔴', '🟢');
                    fs.writeFileSync('./todoList.txt', JSON.stringify(todoList));
                } else {
                    todoList[todoToCheck] = todoList[todoToCheck].replace('🟢', '🔴');
                    fs.writeFileSync('./todoList.txt', JSON.stringify(todoList));
                }
            }
        }
        console.log('========================');
        todoList.length > 0 ? todoList.forEach(e => console.log(e)) : console.log('Nenhuma todo registrada.');
        console.log('========================');
        start();
    } else if (funcList[index] === "remove") {
        if (todoList.length > 0) {
            const removeTodo = readlineSync.keyInSelect(todoList,'Qual a todo a ser removida? ');
            todoList.splice(removeTodo, 1);
            fs.writeFileSync('./todoList.txt', JSON.stringify(todoList));
        }
        console.log('========================');
        todoList.length > 0 ? todoList.forEach(e => console.log(e)) : console.log('Nenhuma todo registrada.');
        console.log('========================');
        start();
    } else if (funcList[index] === "pomodoro") {
        if (todoList.length > 0) {
            const pomodoro = readlineSync.keyInSelect(todoList,'Qual a todo a fazer pomodoro? ');
            console.log(`Pomodoro de "${todoList[pomodoro]}" setado!`);
            setTimeout(() => {
                if (todoList[pomodoro].includes("🍅")) {
                    todoList[pomodoro] = todoList[pomodoro] + "🍅";
                } else {
                    todoList[pomodoro] = todoList[pomodoro] + " " + "🍅";
                }            
                fs.writeFileSync('./todoList.txt', JSON.stringify(todoList));
                console.log('========================');
                todoList.length > 0 ? todoList.forEach(e => console.log(e)) : console.log('Nenhuma todo registrada.');
                console.log('========================');
                start();
            }, 2000);
        } else {
            console.log('========================');
            todoList.length > 0 ? todoList.forEach(e => console.log(e)) : console.log('Nenhuma todo registrada.');
            console.log('========================');
            start();
        }
    }
}

start();



