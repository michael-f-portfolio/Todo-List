export default class NewTodo {
    constructor() {
        this.app = document.querySelector("#main-content-container");

        this.newTodoDialog = document.createElement("dialog");
        this.newTodoDialog.id = "new-todo-dialog";
        this.newTodoDialog.addEventListener("click", () => this.newTodoDialog.close());

        this.newTodoDialogContainer = document.createElement("div");
        this.newTodoDialogContainer.id = "new-todo-dialog-container";
        this.newTodoDialogContainer.addEventListener("click", (event) => event.stopPropagation());

        this.form = document.createElement("form");

        this.formTitle = document.createElement("h2");
        this.formTitle.textContent = "Create A New Todo";
        this.form.appendChild(this.formTitle);

        this.validationMessageContainer = document.createElement("div");
        this.validationMessageContainer.id = "newTodo-validation-message-container";
        this.form.appendChild(this.validationMessageContainer);

        //title input
        this.titleInput = document.createElement("input");
        this.titleInput.type = "text";
        this.titleInput.id = "newTodo-title-input";
        this.titleInput.placeholder = "Todo Title";
        this.form.appendChild(this.titleInput);

        //description input
        this.descriptionInput = document.createElement("input");
        this.descriptionInput.type = "text";
        this.descriptionInput.id = "newTodo-description-input";
        this.descriptionInput.placeholder = "Todo Description";
        this.form.appendChild(this.descriptionInput);

        //dueDate input
        this.dueDateInput = document.createElement("input");
        this.dueDateInput.type = "date";
        this.dueDateInput.id = "newTodo-due-date-input";
        // this.dueDateInput.value = new Date();
        this.form.appendChild(this.dueDateInput);

        //show checklist items checkbox and label
        this.showChecklistCheckboxContainer = document.createElement("div");
        this.showChecklistCheckbox = document.createElement("input");
        this.showChecklistCheckbox.type = "checkbox";
        this.showChecklistCheckbox.id = "newTodo-show-checklist-items-input";
        this.showChecklistCheckbox.addEventListener("click", (event) => {
            event.target.checked ? this.toggleChecklistItemsInputVisibility(true)
                                 : this.toggleChecklistItemsInputVisibility(false);
        });
        this.showChecklistCheckboxLabel = document.createElement("label");
        this.showChecklistCheckboxLabel.setAttribute("for", "newTodo-show-checklist-items-input");
        this.showChecklistCheckboxLabel.textContent = "Add Checklist?";

        this.showChecklistCheckboxContainer.append(this.showChecklistCheckbox, this.showChecklistCheckboxLabel);
        this.form.appendChild(this.showChecklistCheckboxContainer);

        this.numberOfChecklistItems = 0;

        //checklist items container, add item button and empty ul to contain checklist items
        this.checklistItemsInputContainer = document.createElement("div");
        this.checklistItemsInputContainer.id = "newTodo-checklist-items-input-container";
        this.checklistItemsInputContainer.style.visibility = "hidden";

        this.addChecklistItemButton = document.createElement("button");
        this.addChecklistItemButton.id = "newTodo-add-checklist-item";
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
        this.prioritySelect.id = "newTodo-priority-select";
        this.priorityOptionsArray.forEach(element => {
            const option = document.createElement("option");
            option.value = element;
            option.textContent = element;
            this.prioritySelect.appendChild(option);
        });
        this.form.appendChild(this.prioritySelect);

        //// Form actions
        this.formActionContainer = document.createElement("div");
        this.formActionContainer.id = "form-action-container";
        // create new todo button
        this.createTodoButton = document.createElement("button");
        this.createTodoButton.id = "create-todo";
        this.createTodoButton.textContent = "Create";
        this.formActionContainer.appendChild(this.createTodoButton)

        // hide new todo dialog button
        this.hideNewTodoDialogButton = document.createElement("button");
        this.hideNewTodoDialogButton.textContent = "Cancel";
        this.hideNewTodoDialogButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.newTodoDialog.close();
        });
        this.formActionContainer.appendChild(this.hideNewTodoDialogButton);
        this.form.appendChild(this.formActionContainer);


        // testing placeholder values
        this.titleInput.value = "placeholder-title";
        this.descriptionInput.value = "placeholder-description";
        this.dueDateInput.valueAsDate = new Date();

        this.newTodoDialogContainer.appendChild(this.form);
        this.newTodoDialog.appendChild(this.newTodoDialogContainer);
        this.app.appendChild(this.newTodoDialog);
    }

    // returns an object containing the input values or a
    // or a validation error message with the invalid inputs id
    #getTodoInputValues() {
        const inputValues = {};
        this.validationMessageContainer.textContent = "";

        inputValues.titleInput = this.titleInput.value;
        if(inputValues.titleInput.trim() === "") {
            inputValues.isValidInput = false;
            inputValues.validationErrorMessage = "A title is required";
            inputValues.invalidInputId = this.titleInput.id;
            return inputValues;
        } else if (inputValues.titleInput.trim().length < 3) {
            inputValues.isValidInput = false;
            inputValues.validationErrorMessage = "At least 3 characters required for a title";
            inputValues.invalidInputId = this.titleInput.id;
            return inputValues;
        } else {
            this.titleInput.removeAttribute("style");
        }

        inputValues.descriptionInput = this.descriptionInput.value;
        if (inputValues.descriptionInput.trim() === "") {
            inputValues.isValidInput = false;
            inputValues.validationErrorMessage = "A description is required";
            inputValues.invalidInputId = this.descriptionInput.id;
            return inputValues;
        } else if (inputValues.descriptionInput.trim().length < 3) {
            inputValues.isValidInput = false;
            inputValues.validationErrorMessage = "At least 3 characters required for a description";
            inputValues.invalidInputId = this.descriptionInput.id;
            return inputValues;
        } else {
            this.descriptionInput.removeAttribute("style");
        }

        inputValues.dueDateInput = this.dueDateInput.value;
        if (inputValues.dueDateInput === "") {
            inputValues.isValidInput = false;
            inputValues.validationErrorMessage = "Please select a due date";
            inputValues.invalidInputId = this.dueDateInput.id;
            return inputValues;
        } else {
            this.dueDateInput.removeAttribute("style");
        }

        // date validation is not fun to write on new years eve
        // if (new Date(inputValues.dueDateInput) < new Date()) {
        //     inputValues.isValidInput = false;
        //     inputValues.validationErrorMessage = "Due Date must be in the future or today's date";
        //     return inputValues;
        // }
        inputValues.checklistInput = [];
        if (this.showChecklistCheckbox.checked) {
            const checklistInputListItems = this.checklistItemsUnorderedList.querySelectorAll("li");
            checklistInputListItems.forEach(item => {
                const checklistInput = item.querySelector("input");
                if (checklistInput.value.trim() !== "") {
                    inputValues.checklistInput.push({content: checklistInput.value, checked: false});
                }
            });
            if (inputValues.checklistInput.length === 0) {
                delete inputValues.checklistInput;
            }
        }
        inputValues.priorityInput = this.prioritySelect.value;

        inputValues.isValidInput = true;
        return inputValues;
    }

    #clearInput() {
        this.titleInput.value = "";
        this.descriptionInput.value = "";
        this.dueDateInput.value = "";
        this.showChecklistCheckbox.checked = false;
        this.toggleChecklistItemsInputVisibility(false);
        while (this.checklistItemsUnorderedList.firstChild) {
            this.checklistItemsUnorderedList
                .removeChild(this.checklistItemsUnorderedList.firstChild)
        }
        this.prioritySelect.value = "Low";
    }

    bindAddTodo(handler) {
        this.createTodoButton.addEventListener("click", (event) => {
            event.preventDefault();
            const inputValues = this.#getTodoInputValues();
            if (inputValues.isValidInput) {
                handler(inputValues);
                // then clear the inputs
                this.#clearInput();
                // then close the dialog modal
                this.newTodoDialog.close();
            } else {
                this.displayValidationError(inputValues);
            }
        });
    }

    displayValidationError(inputValues) {
        this.validationMessageContainer.textContent = inputValues.validationErrorMessage;
        const invalidInput = this.form.querySelector(`#${inputValues.invalidInputId}`);
        invalidInput.style.border = "2px red solid";
    }

    addChecklistItem() {
        // const checklistItemsUnorderedList = document.querySelector("#newTodo-checklist-items-input-container ul");
        // this.numberOfChecklistItems++;

        const checklistItem = document.createElement("li");
        // checklistItem.id = `checklist-item:${numberOfChecklistItems + 1}`;
        // checklistItem.id = `checklist-item:${this.numberOfChecklistItems}`;

        const checklistItemTextInput = document.createElement("input");
        checklistItemTextInput.type = "text";
        // checklistItemTextInput.id = `checklist-item-textInput:${numberOfChecklistItems + 1}`;
        // checklistItemTextInput.id = `checklist-item-textInput:${this.numberOfChecklistItems}`;
        checklistItemTextInput.classList.add("checklistItem");
        checklistItem.appendChild(checklistItemTextInput);

        const checklistItemRemoveButton = document.createElement("button");
        // checklistItemRemoveButton.id = `checklist-remove-button:${numberOfChecklistItems + 1}`;
        // checklistItemRemoveButton.id = `checklist-remove-button:${this.numberOfChecklistItems}`;
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

    toggleChecklistItemsInputVisibility(toggle) {
        if (toggle) {
            this.checklistItemsInputContainer.removeAttribute("style");
        } else {
            this.checklistItemsInputContainer.style.visibility = "hidden";
            this.checklistItemsInputContainer.style.maxHeight = "0";
        }
    }
}