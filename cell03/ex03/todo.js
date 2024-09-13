function addTodoItem(todoText) {
    if (todoText.trim() === "") return;

    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.textContent = todoText;

    todoItem.addEventListener('click', function() {
        if (confirm("Do you want to remove this item?")) {
            todoItem.remove();
            saveTodos();
        }
    });

    const list = document.getElementById('ft_list');
    list.insertBefore(todoItem, list.firstChild);

    saveTodos();
}

document.getElementById('new-todo').addEventListener('click', function() {
    const todoText = prompt("Enter your new TO-DO:");
    if (todoText !== null) {
        addTodoItem(todoText);
    }
});

function saveTodos() {
    const list = document.getElementById('ft_list');
    const todos = [];
    
    for (let i = 0; i < list.children.length; i++) {
        todos.push(list.children[i].textContent);
    }
    
    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
}

function loadTodos() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("todos=")) {
            const todoList = JSON.parse(cookie.substring("todos=".length));
            todoList.forEach(function(todoText) {
                addTodoItem(todoText);
            });
        }
    }
}

window.onload = loadTodos;
