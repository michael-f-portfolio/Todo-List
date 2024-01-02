import "styles/newTodo.css";

export default class NewTodo {
    constructor() {
        this.app = document.querySelector("#main-content-container");

        this.newTodoDialog = document.createElement("dialog");
        this.newTodoDialog.id = "new-todo-dialog";
        this.newTodoDialog.addEventListener("click", () => {
            this.#clearInput();
            this.newTodoDialog.close()

        });

        this.newTodoDialogContainer = document.createElement("div");
        this.newTodoDialogContainer.id = "new-todo-dialog-container";
        this.newTodoDialogContainer.addEventListener("click", (event) => event.stopPropagation());

        this.form = document.createElement("form");

        this.formTitle = document.createElement("h2");
        this.formTitle.textContent = "Create A New Todo";
        this.form.appendChild(this.formTitle);

        this.validationMessageContainer = document.createElement("div");
        this.validationMessageContainer.classList.add("validationContainer");
        this.validationMessageContainer.id = "newTodo-validation-message-container";
        this.form.appendChild(this.validationMessageContainer);

        //title input
        const titleInputId = "newTodo-title-input";
        this.titleInputContainer = document.createElement("div");
        this.titleInputContainer.classList.add("titleInput");

        this.titleInputLabel = document.createElement("label");
        this.titleInputLabel.setAttribute("for", titleInputId);
        this.titleInputLabel.textContent = "Title";

        this.titleInput = document.createElement("input");
        this.titleInput.type = "text";
        this.titleInput.id = titleInputId;

        this.titleInputContainer.append(this.titleInputLabel,
                                        this.titleInput);
        this.form.appendChild(this.titleInputContainer);

        //dueDate input
        const dueDateId = "newTodo-dueDate-input";
        this.dueDateInputContainer = document.createElement("div");
        this.dueDateInputContainer.classList.add("dueDateInput");

        this.dueDateLabel = document.createElement("label");
        this.dueDateLabel.setAttribute("for", dueDateId);
        this.dueDateLabel.textContent = "Due Date";

        this.dueDateInput = document.createElement("input");
        this.dueDateInput.type = "date";
        this.dueDateInput.id = dueDateId;

        this.dueDateInputContainer.append(this.dueDateLabel, this.dueDateInput);
        this.form.appendChild(this.dueDateInputContainer);

        // priority selection
        const priorityOptionsArray = ["Low", "Normal", "High", "Urgent", "Critical"];
        const prioritySelectId = "newTodo-priority-select";
        this.prioritySelectContainer = document.createElement("div");
        this.prioritySelectContainer.classList.add("prioritySelect")

        this.prioritySelectLabel = document.createElement("label");
        this.prioritySelectLabel.setAttribute("for", prioritySelectId);
        this.prioritySelectLabel.textContent = "Priority";

        this.prioritySelect = document.createElement("select");
        this.prioritySelect.id = prioritySelectId;
        priorityOptionsArray.forEach(element => {
            const option = document.createElement("option");
            option.value = element;
            option.textContent = element;
            this.prioritySelect.appendChild(option);
        });

        this.prioritySelectContainer.append(this.prioritySelectLabel, this.prioritySelect);
        this.form.appendChild(this.prioritySelectContainer);

        //description input
        const descriptionInputId = "newTodo-description-input";
        this.descriptionInputContainer = document.createElement("div");
        this.descriptionInputContainer.classList.add("descriptionInput");

        this.descriptionInputLabel = document.createElement("label");
        this.descriptionInputLabel.setAttribute("for", descriptionInputId);
        this.descriptionInputLabel.textContent = "Description";

        this.descriptionInput = document.createElement("textarea");
        this.descriptionInput.id = descriptionInputId;
        this.descriptionInput.setAttribute("rows", 5);
        this.descriptionInput.setAttribute("cols", 20);

        this.descriptionInputContainer.append(this.descriptionInputLabel,
                                              this.descriptionInput);
        this.form.appendChild(this.descriptionInputContainer);

        //show checklist items checkbox, label and add checklist item button
        this.checklistActionsContainer = document.createElement("div");
        this.checklistActionsContainer.classList.add("checklistActions");

        this.showChecklistContainer = document.createElement("div");
        this.showChecklistContainer.classList.add("showChecklist");

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

        this.addChecklistItemButton = document.createElement("button");
        this.addChecklistItemButton.id = "newTodo-add-checklist-item";
        this.addChecklistItemButton.textContent = "+";
        this.addChecklistItemButton.style.visibility = "hidden";
        this.addChecklistItemButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.addChecklistItem();
        });

        this.showChecklistContainer.append(this.showChecklistCheckbox, this.showChecklistCheckboxLabel);
        this.checklistActionsContainer.append(this.showChecklistContainer, this.addChecklistItemButton);
        this.form.appendChild(this.checklistActionsContainer);

        //checklist items container and empty ul to contain checklist items
        this.checklistItemsInputContainer = document.createElement("div");
        this.checklistItemsInputContainer.classList.add("checklistItems");
        this.checklistItemsInputContainer.style.visibility = "hidden";

        this.checklistItemsUnorderedList = document.createElement("ul");

        this.checklistItemsInputContainer.append(this.checklistItemsUnorderedList);
        this.form.appendChild(this.checklistItemsInputContainer);

        //// Form actions
        this.formActionContainer = document.createElement("div");
        this.formActionContainer.classList.add("formActions");
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
        this.validationMessageContainer.textContent = "";
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
        const checklistItem = document.createElement("li");

        const checklistItemTextInput = document.createElement("input");
        checklistItemTextInput.type = "text";
        checklistItemTextInput.classList.add("checklistItem");
        checklistItem.appendChild(checklistItemTextInput);

        const checklistItemRemoveButton = document.createElement("button");
        checklistItemRemoveButton.classList.add("removeButton");
        checklistItemRemoveButton.textContent = "-";
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
            this.addChecklistItemButton.removeAttribute("style");
        } else {
            this.checklistItemsInputContainer.style.visibility = "hidden";
            this.checklistItemsInputContainer.style.maxHeight = "0";
            this.addChecklistItemButton.style.visibility = "hidden";
            // this.addChecklistItemButton.style.maxHeight = "0";

        }
    }
}