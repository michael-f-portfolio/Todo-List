import "styles/editTodoForm.css"
import TodoForm from "./todoForm";

export default class EditTodoForm extends TodoForm {
    constructor() {
        super("edit");
        this.app = document.querySelector("#main-content-container");

        this.editTodoDialog = document.createElement("dialog");
        this.editTodoDialog.id = "edit-todo-dialog";
        this.editTodoDialog.addEventListener("click", () => {
            this.resetInput();
            this.editTodoDialog.close()
        });

        this.editTodoDialogContainer = document.createElement("div");
        this.editTodoDialogContainer.id = "edit-todo-dialog-container";
        this.editTodoDialogContainer.addEventListener("click", (event) => event.stopPropagation());

        this.editTodoDialogContainer.appendChild(this.form);
        this.editTodoDialog.appendChild(this.editTodoDialogContainer);
        this.app.appendChild(this.editTodoDialog);

        this.closeDialogButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.resetInput();
            this.editTodoDialog.close();
        });
    }

    populateEditForm(id, title, description, dueDate, priority, checklist = [], completed) {
        this.form.id = id;
        this.form.classList = completed ? "complete" : "incomplete";
        this.titleInput.value = title;
        this.descriptionInput.value = description;

        // const dueDateToDisplay = new Date(dueDate);
        // const dateToFormat = dueDateToDisplay
        //                     .toUTCString()
        //                     .substring(0, dueDateToDisplay.toUTCString().length - 4);
        this.dueDateInput.valueAsDate = new Date(dueDate);

        if (checklist.length > 0) {
            this.showChecklistCheckbox.checked = true;
            let numberOfChecklistItems = 0;
            checklist.forEach(item => {
                numberOfChecklistItems++;
                const checklistItem = document.createElement("li");
                checklistItem.id = item.id;
                checklistItem.classList = item.checked ? "checked" : "unchecked";
                const checklistItemTextInput = document.createElement("input");
                checklistItemTextInput.type = "text";
                checklistItemTextInput.value = item.content;
                checklistItem.appendChild(checklistItemTextInput);

                const checklistItemRemoveButton = document.createElement("button");
                checklistItemRemoveButton.textContent = "-";
                checklistItemRemoveButton.classList.add("removeButton");
                checklistItemRemoveButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.removeChecklistItem(checklistItem);
                });
                checklistItem.appendChild(checklistItemRemoveButton);
                this.checklistItemsUnorderedList.appendChild(checklistItem);
                this.toggleChecklistItemsInputVisibility(true);
            })
        } else {
            this.toggleChecklistItemsInputVisibility(false);
        }
        this.prioritySelect.value = priority;

    }

    showEditForm(todoToEdit) {
        this.editTodoDialog.showModal();
        this.populateEditForm(todoToEdit.id,
                            todoToEdit.title,
                            todoToEdit.description,
                            todoToEdit.dueDate,
                            todoToEdit.priority,
                            todoToEdit.checklist.checklistItems,
                            todoToEdit.completed);
    }

    bindEditTodo(handler) {
        this.submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const inputValues = this.getTodoInputValues();
            handler(inputValues);
            this.resetInput();
            this.editTodoDialog.close();
        });
    }
}