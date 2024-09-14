$(document).ready(function () {
    function addTodoItem(todoText, appendToEnd = false) {
        if (todoText.trim() === "") return;

        const $todoItem = $('<div></div>').addClass('todo-item').text(todoText);

        $todoItem.on('click', function() {
            if (confirm("Do you want to remove this item?")) {
                $todoItem.remove();
                saveTodos();
            }
        });

        if (appendToEnd) {
            $('#ft_list').append($todoItem);
        } else {
            $('#ft_list').prepend($todoItem);
        }

        saveTodos();
    }

    $('#new-todo').on('click', function() {
        const todoText = prompt("Enter your new TO-DO:");
        if (todoText !== null && todoText.trim() !== "") {
            addTodoItem(todoText);
        }
    });

    function saveTodos() {
        const todos = [];

        $('#ft_list').children().each(function() {
            todos.push($(this).text());
        });

        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
    }

    function loadTodos() {
        const cookies = document.cookie.split(';');
        cookies.forEach(function(cookie) {
            cookie = cookie.trim();
            if (cookie.startsWith("todos=")) {
                const todoList = JSON.parse(decodeURIComponent(cookie.substring("todos=".length)));
                todoList.forEach(function(todoText) {
                    addTodoItem(todoText, true);
                });
            }
        });
    }

    loadTodos();
});
