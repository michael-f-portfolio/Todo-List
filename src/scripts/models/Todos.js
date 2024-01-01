import Todo from "./Todo";

// Contains all the todos for the application and the CRUD methods for them
export default class Todos {
    constructor(todos = []) {
        this.todos = todos;
    }

    bindTodoListChange(callback) {
        this.onTodoListChanged = callback;
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
        this.onTodoListChanged(this.todos);
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


            // todo.id === id
            //     ? new Todo(updatedInputValues.titleInput,
            //         updatedInputValues.descriptionInput,
            //         updatedInputValues.dueDateInput,
            //         updatedInputValues.priorityInput,
            //         updatedInputValues.checklistInput)
            //     : todo;
        });

        this.onTodoListChanged(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.onTodoListChanged(this.todos);
    }

    toggleCompleteTodo(id) {
        this.todos.find(todo => todo.id === id).toggleCompleted();
        this.onTodoListChanged(this.todos);
    }

    toggleTodoChecklistItem(id, checklistItemId) {
        this.todos.find(todo => todo.id === id)
                    .checklist
                    .checklistItems
                    .find(checklistItem =>
                    checklistItem.id === checklistItemId)
                    .toggleChecked();
        this.onTodoListChanged(this.todos);
    }


}