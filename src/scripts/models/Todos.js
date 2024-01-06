import Todo from "./Todo";

// Contains all the todos for the application and the CRUD methods for them
export default class Todos {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    }

    bindTodoListChange(callback) {
        this.onTodoListChanged = callback;
    }

    commitTodo(todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    getTodo(todoId) {
        return this.todos.find(todo => todo.id === todoId);
    }

    addTodo(inputValues) {
        this.todos.push(new Todo(inputValues.titleInput,
                        inputValues.descriptionInput,
                        inputValues.dueDateInput,
                        inputValues.priorityInput,
                        inputValues.checklistInput));
        this.commitTodo(this.todos)
    }

    editTodo(id, updatedInputValues) {

        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                const newTodo = new Todo(updatedInputValues.titleInput,
                                         updatedInputValues.descriptionInput,
                                         updatedInputValues.dueDateInput,
                                         updatedInputValues.priorityInput,
                                         updatedInputValues.checklistInput,
                                         updatedInputValues.completed);
                return newTodo;
            } else {
                return todo;
            }
        });

        this.commitTodo(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.commitTodo(this.todos);
    }

    toggleCompleteTodo(id) {
        this.todos.find(todo => todo.id === id).toggleCompleted();
        this.commitTodo(this.todos);
    }

    toggleTodoChecklistItem(id, checklistItemId) {
        this.todos.find(todo => todo.id === id)
                    .checklist
                    .checklistItems
                    .find(checklistItem =>
                    checklistItem.id === checklistItemId)
                    .toggleChecked();
        this.commitTodo(this.todos);
    }
}