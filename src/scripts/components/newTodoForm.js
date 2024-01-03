import "styles/newTodoForm.css";
import TodoForm from "./todoForm";

export default class NewTodoForm extends TodoForm {
    constructor() {
        super("create");
        this.app = document.querySelector("#main-content-container");

        this.newTodoDialog = document.createElement("dialog");
        this.newTodoDialog.id = "new-todo-dialog";
        this.newTodoDialog.addEventListener("click", () => {
            this.resetInput();
            this.newTodoDialog.close()
        });

        this.newTodoDialogContainer = document.createElement("div");
        this.newTodoDialogContainer.id = "new-todo-dialog-container";
        this.newTodoDialogContainer.addEventListener("click", (event) => event.stopPropagation());

        this.newTodoDialogContainer.appendChild(this.form);
        this.newTodoDialog.appendChild(this.newTodoDialogContainer);
        this.app.appendChild(this.newTodoDialog);
    }

    bindAddTodo(handler) {
        this.submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const inputValues = this.getTodoInputValues();
            if (inputValues) {
                handler(inputValues);
                this.resetInput();
                this.newTodoDialog.close();
            }
        });
    }
}