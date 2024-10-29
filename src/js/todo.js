export class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.initializeEventListeners();
        this.renderTodos();
    }

    initializeEventListeners() {

        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });


        this.todoList.addEventListener('click', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;

            const todoId = parseInt(todoItem.dataset.id, 10);

            if (e.target.classList.contains('delete-btn')) {
                this.deleteTodo(todoId);
            } else if (e.target.classList.contains('todo-checkbox')) {
                this.toggleTodo(todoId);
            }
        });
    }

    addTodo() {
        const todoText = this.todoInput.value.trim();
        if (!todoText) return;

        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        this.todos.push(todo);
        this.saveTodos();
        this.renderTodos();
        this.todoInput.value = '';
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.renderTodos();
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.saveTodos();
        this.renderTodos();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    renderTodos() {
        this.todoList.innerHTML = this.todos
            .map(todo => `
                <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn">Delete</button>
                </div>
            `)
            .join('');
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}


if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        new TodoApp();
    });
}
