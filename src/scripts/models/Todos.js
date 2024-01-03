import Todo from "./Todo";

// Contains all the todos for the application and the CRUD methods for them
export default class Todos {
    constructor(todos = []) {
        this.todos = todos;

        //placeholder todos
        this.todos.push(new Todo("My Title", "A short description.", "2024-01-05", "Low"));
        this.todos.push(new Todo("My Very Very Very Very Descriptive Title",
                                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                 "2024-05-29", "Normal"));
        this.todos.push(new Todo("My Single Checklist Title", "A single thing to do.", "2024-01-05", "High",
                                [{content: "Clean room"}]));
        this.todos.push(new Todo("My Checklist Title", "A number of things to do.", "2024-01-05", "Urgent",
                                [{content:"Wake up"},
                                 {content: "Eat breakfast"},
                                 {content: "Make bed"},
                                 {content: "A rather long thing to do that is very important"},
                                 {content: "Go to bed"}]));
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