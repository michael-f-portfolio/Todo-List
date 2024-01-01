export default class EditTodo {
    constructor() {
        this.app = document.querySelector("#main-content-container");

        this.editTodoDialog = document.createElement("dialog");
        this.editTodoDialog.id = "edit-todo-dialog";
        this.editTodoDialog.addEventListener("click", () => {
            this.#clearInputValues();
            this.editTodoDialog.close()
        });

        this.editTodoDialogContainer = document.createElement("div");
        this.editTodoDialogContainer.id = "edit-todo-dialog-container";
        this.editTodoDialogContainer.addEventListener("click", (event) => event.stopPropagation());

        this.form = document.createElement("form");

        this.formTitle = document.createElement("h2");
        this.formTitle.textContent = "Edit Todo";
        this.form.appendChild(this.formTitle);

        this.validationMessageContainer = document.createElement("div");
        this.validationMessageContainer.id = "editTodo-validation-message-container";
        this.form.appendChild(this.validationMessageContainer);

        // title input
        this.titleInput = document.createElement("input");
        this.titleInput.type = "text";
        this.titleInput.id = "editTodo-title-input";
        this.titleInput.placeholder = "Edit Todo Title";
        this.form.appendChild(this.titleInput);

        // description input
        this.descriptionInput = document.createElement("input");
        this.descriptionInput.type = "text";
        this.descriptionInput.id = "editTodo-description-input";
        this.descriptionInput.placeholder = "Edit Todo Description";
        this.form.appendChild(this.descriptionInput);

        this.dueDateInput = document.createElement("input");
        this.dueDateInput.type = "date";
        this.dueDateInput.id = "editTodo-due-date-input"
        this.form.appendChild(this.dueDateInput);

        // show checklist items checkbox and label
        this.showChecklistCheckboxContainer = document.createElement("div");
        this.showChecklistCheckbox = document.createElement("input");
        this.showChecklistCheckbox.type = "checkbox";
        this.showChecklistCheckbox.id = "editTodo-show-checklist-items-input";
        this.showChecklistCheckbox.addEventListener("click", (event) => {
            event.target.checked ? this.toggleChecklistItemsInputVisibility(true)
                                 : this.toggleChecklistItemsInputVisibility(false);
        });
        this.showChecklistCheckboxLabel = document.createElement("label");
        this.showChecklistCheckboxLabel.setAttribute("for", "editTodo-show-checklist-items-input");
        this.showChecklistCheckboxLabel.textContent = "Add Checklist?";

        this.showChecklistCheckboxContainer.append(this.showChecklistCheckbox, this.showChecklistCheckboxLabel);
        this.form.appendChild(this.showChecklistCheckboxContainer);

        this.numberOfChecklistItems = 0;

        // checklist items container, add item button and empty ul to contain checklist items
        this.checklistItemsInputContainer = document.createElement("div");
        this.checklistItemsInputContainer.id = "editTodo-checklist-items-input-container";

        this.addChecklistItemButton = document.createElement("button");
        this.addChecklistItemButton.id = "editTodo-addChecklistItem";
        this.addChecklistItemButton.textContent = "Add Item";
        this.addChecklistItemButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.addChecklistItem();
        });

        this.checklistItemsUnorderedList = document.createElement("ul");

        this.checklistItemsInputContainer.append(this.addChecklistItemButton,
                                                 this.checklistItemsUnorderedList);
        this.form.appendChild(this.checklistItemsInputContainer);

        // priority selection
        this.priorityOptionsArray = ["Low", "Normal", "High", "Urgent", "Critical"];
        this.prioritySelect = document.createElement("select");
        this.prioritySelect.id = "editTodo-priority-select";
        this.priorityOptionsArray.forEach(element => {
            const option = document.createElement("option");
            option.value = element;
            option.textContent = element;
            this.prioritySelect.appendChild(option);
        });
        this.form.appendChild(this.prioritySelect);

        //// Form actions
        this.formActionContainer = document.createElement("div");
        this.formActionContainer.id = "editTodo-form-action-container";
        // Confirm edit button
        this.editTodoButton = document.createElement("button");
        this.editTodoButton.id = "edit-todo";
        this.editTodoButton.textContent = "Confirm Edit";
        this.formActionContainer.appendChild(this.editTodoButton);

        // hide edit todo dialog button
        this.hideEditTodoDialogButton = document.createElement("button");
        this.hideEditTodoDialogButton.textContent = "Cancel";
        this.hideEditTodoDialogButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.#clearInputValues();
            this.editTodoDialog.close();
        });
        this.formActionContainer.appendChild(this.hideEditTodoDialogButton);
        this.form.appendChild(this.formActionContainer);

        this.editTodoDialogContainer.appendChild(this.form);
        this.editTodoDialog.appendChild(this.editTodoDialogContainer);
        this.app.appendChild(this.editTodoDialog);
    }

    addChecklistItem() {
        const checklistItem = document.createElement("li");
        const checklistItemTextInput = document.createElement("input");
        checklistItemTextInput.type = "text";
        checklistItem.appendChild(checklistItemTextInput);

        const checklistItemRemoveButton = document.createElement("button");
        checklistItemRemoveButton.textContent = "Remove";
        checklistItemRemoveButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.removeChecklistItem(checklistItem);
        });
        checklistItem.appendChild(checklistItemRemoveButton);
        this.checklistItemsUnorderedList.appendChild(checklistItem);
    }

    removeChecklistItem(checklistItem) {
        this.checklistItemsUnorderedList.removeChild(checklistItem);
    }

    #clearInputValues() {
        this.titleInput.value = "";
        this.descriptionInput.value = "";
        this.dueDateInput.value = "";
        this.showChecklistCheckbox.checked = false;
        this.toggleChecklistItemsInputVisibility(false);
        while (this.checklistItemsUnorderedList.firstChild) {
            this.checklistItemsUnorderedList
                .removeChild(this.checklistItemsUnorderedList.firstChild);
        }
        this.prioritySelect.value = "Low";
    }

    #getTodoInputValues() {
        const inputValues = {};
        inputValues.id = this.form.id;
        inputValues.titleInput = this.titleInput.value;
        inputValues.descriptionInput = this.descriptionInput.value;
        inputValues.dueDateInput = this.dueDateInput.value;
        inputValues.checklistInput = [];
        if (this.showChecklistCheckbox.checked) {
            const checklistInputListItems = this.checklistItemsUnorderedList.querySelectorAll("li");
            checklistInputListItems.forEach(listItem => {
                const checklistInput = listItem.querySelector("input");
                if (checklistInput.value.trim() !== "") {
                    const checked = listItem.classList.contains("checked") ? true : false;
                    inputValues.checklistInput.push({content: checklistInput.value, checked: checked});
                }
            });
            if (inputValues.checklistInput.length === 0) {
                delete inputValues.checklistInput;
            }
        }
        inputValues.priorityInput = this.prioritySelect.value;
        inputValues.completed = this.form.classList.contains("complete") ? "complete" : "incomplete";
        return inputValues;
    }

    toggleChecklistItemsInputVisibility(toggle) {
        if (toggle) {
            this.checklistItemsInputContainer.removeAttribute("style");
        } else {
            this.checklistItemsInputContainer.style.visibility = "hidden";
            this.checklistItemsInputContainer.style.maxHeight = "0";
        }
    }

    populateEditor(id, title, description, dueDate, priority, checklist = [], completed) {
        this.form.id = id;
        this.form.classList = completed ? "complete" : "incomplete";
        this.titleInput.value = title;
        this.descriptionInput.value = description;
        this.dueDateInput.valueAsDate = dueDate;
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
                checklistItemRemoveButton.textContent = "Remove";
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

    showEditor(todoToEdit) {
        this.editTodoDialog.showModal();
        this.populateEditor(todoToEdit.id,
                            todoToEdit.title,
                            todoToEdit.description,
                            todoToEdit.dueDate,
                            todoToEdit.priority,
                            todoToEdit.checklist.checklistItems,
                            todoToEdit.completed);
    }

    bindEditTodo(handler) {
        this.editTodoButton.addEventListener("click", (event) => {
            event.preventDefault();
            const inputValues = this.#getTodoInputValues();
            handler(inputValues);
            this.#clearInputValues();
            this.editTodoDialog.close();
        });
    }
}