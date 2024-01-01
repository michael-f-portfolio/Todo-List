export default class Header {
    constructor() {
        this.app = document.querySelector("#main-content-container");
        this.header = document.createElement("header");

        this.mainTitle = document.createElement("h1");
        this.mainTitle.textContent = "My Todo List";

        this.showNewTodoDialogButton = document.createElement("button");
        this.showNewTodoDialogButton.textContent = "Create Todo";
        this.showNewTodoDialogButton.addEventListener("click", () => {
            const newTodoDialog = document.querySelector("#new-todo-dialog");
            newTodoDialog.showModal();
        })


        this.header.append(this.mainTitle, this.showNewTodoDialogButton);
        this.app.appendChild(this.header);
    }
}