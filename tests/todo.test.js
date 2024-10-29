import { TodoApp } from '../src/js/todo';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';

describe('TodoApp', () => {
    let todoApp;
    
    beforeEach(() => {

        document.body.innerHTML = `
            <div class="container">
                <form id="todoForm">
                    <input type="text" id="todoInput">
                </form>
                <div id="todoList"></div>
            </div>
        `;

        localStorage.clear();
        todoApp = new TodoApp();
    });

    test('should start with empty todos', () => {
        expect(todoApp.todos).toHaveLength(0);
        expect(todoApp.todoList.children).toHaveLength(0);
    });

    test('should add new todo', () => {

        todoApp.todoInput.value = 'Test todo';
   
        fireEvent.submit(todoApp.todoForm);
    
        expect(todoApp.todos).toHaveLength(1);
        expect(todoApp.todos[0].text).toBe('Test todo');
        expect(todoApp.todos[0].completed).toBe(false);
        expect(todoApp.todoList.children).toHaveLength(1);
        expect(todoApp.todoList.children[0]).toHaveTextContent('Test todo');
    });

    test('should toggle todo completion', () => {
     
        todoApp.todoInput.value = 'Test todo';
        fireEvent.submit(todoApp.todoForm);

        const checkbox = todoApp.todoList.querySelector('.todo-checkbox');
        fireEvent.click(checkbox);

        expect(todoApp.todos[0].completed).toBe(true);
        expect(todoApp.todoList.children[0]).toHaveClass('completed');
    });

    test('should delete todo', () => {
  
        todoApp.todoInput.value = 'Test todo';
        fireEvent.submit(todoApp.todoForm);       
     
        const deleteButton = todoApp.todoList.querySelector('.delete-btn');
        fireEvent.click(deleteButton);

        expect(todoApp.todos).toHaveLength(0);
        expect(todoApp.todoList.children).toHaveLength(0);
    });

    test('should persist todos in localStorage', () => {
  
        todoApp.todoInput.value = 'Test todo';
        fireEvent.submit(todoApp.todoForm);
        
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
 
        expect(storedTodos).toHaveLength(1);
        expect(storedTodos[0].text).toBe('Test todo');
    });

    test('should not add empty todo', () => {
        todoApp.todoInput.value = '   ';
        
        fireEvent.submit(todoApp.todoForm);
        
        expect(todoApp.todos).toHaveLength(0);
        expect(todoApp.todoList.children).toHaveLength(0);
    });
});