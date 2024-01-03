import "styles/todoForm.css";

export default class TodoForm {
    constructor(formType) {
        this.formType = formType;

        this.form = document.createElement("form");

        this.formTitle = document.createElement("h2");
        this.formTitle.textContent =
                `${this.formType.substr(0,1).toUpperCase() +
                   this.formType.substr(1, this.formType.length)} Todo`;
        this.form.appendChild(this.formTitle);

        // Title Input:
        const titleInputId = `${this.formType}-title-input`;
        this.titleInputContainer = document.createElement("div");
        this.titleInputContainer.classList.add("titleInput");

        this.titleInputLabel = document.createElement("label");
        this.titleInputLabel.setAttribute("for", titleInputId);
        this.titleInputLabel.textContent = "Title";

        this.titleInput = document.createElement("input");
        this.titleInput.type = "text";
        this.titleInput.id = titleInputId;
        this.titleInput.minLength = 3;
        this.titleInput.maxLength = 40;
        this.titleInput.required = true;

        this.titleInputContainer.append(this.titleInputLabel, this.titleInput);
        this.form.appendChild(this.titleInputContainer);

        // Due Date Input:
        const dueDateId = `${this.formType}-dueDate-input`;
        this.dueDateInputContainer = document.createElement("div");
        this.dueDateInputContainer.classList.add("dueDateInput");

        this.dueDateLabel = document.createElement("label");
        this.dueDateLabel.setAttribute("for", dueDateId);
        this.dueDateLabel.textContent = "Due Date";

        this.dueDateInput = document.createElement("input");
        this.dueDateInput.type = "date";
        this.dueDateInput.id = dueDateId;

        // Setting date input to california timezone,
        // will cause farrrr eastern timezones to show the previous day's date though
        const todayAsCaliforniaLocale = new Date().toLocaleDateString("fr-ca");
        this.dueDateInput.value = todayAsCaliforniaLocale;
        this.dueDateInput.min = todayAsCaliforniaLocale;

        this.dueDateInputContainer.append(this.dueDateLabel, this.dueDateInput);
        this.form.appendChild(this.dueDateInputContainer);

        // Priority Selection:
        const prioritySelectId = `${this.formType}-priority-select`;
        const priorityOptionsArray = ["Low", "Normal", "High", "Urgent", "Critical"];
        this.prioritySelectContainer = document.createElement("div");
        this.prioritySelectContainer.classList.add("prioritySelect");

        this.prioritySelectLabel = document.createElement("label");
        this.prioritySelectLabel.setAttribute("for", prioritySelectId);
        this.prioritySelectLabel.textContent = "Priority";

        this.prioritySelect = document.createElement("select");
        this.prioritySelect.id = prioritySelectId;
        priorityOptionsArray.forEach(priority => {
            const option = document.createElement("option");
            option.value = priority;
            option.textContent = priority;
            this.prioritySelect.appendChild(option);
        });

        this.prioritySelectContainer.append(this.prioritySelectLabel, this.prioritySelect);
        this.form.appendChild(this.prioritySelectContainer);

        // Description Input:
        const descriptionInputId = `${this.formType}-description-input`;
        this.descriptionInputContainer = document.createElement("div");
        this.descriptionInputContainer.classList.add("descriptionInput");

        this.descriptionInputLabel = document.createElement("label");
        this.descriptionInputLabel.setAttribute("for", descriptionInputId);
        this.descriptionInputLabel.textContent = "Description";

        this.descriptionInput = document.createElement("textarea");
        this.descriptionInput.id = descriptionInputId;
        this.descriptionInput.setAttribute("rows", 5);
        this.descriptionInput.setAttribute("cols", 20);
        this.descriptionInput.maxLength = 256;

        this.descriptionInputContainer.append(this.descriptionInputLabel, this.descriptionInput);
        this.form.appendChild(this.descriptionInputContainer);

        // Show checklist items checkbox, label and add Checklist Item Button
        this.checklistActionsContainer = document.createElement("div");
        this.checklistActionsContainer.classList.add("checklistActions");

        const showChecklistCheckboxId = `${this.formType}-show-checklist-items-input`;
        this.showChecklistContainer = document.createElement("div");
        this.showChecklistContainer.classList.add("showChecklist");

        this.showChecklistCheckbox = document.createElement("input");
        this.showChecklistCheckbox.type = "checkbox";
        this.showChecklistCheckbox.id = showChecklistCheckboxId;
        this.showChecklistCheckbox.addEventListener("click", (event) => {
            event.target.checked ? this.toggleChecklistItemsInputVisibility(true)
                                 : this.toggleChecklistItemsInputVisibility(false);
        });

        this.showChecklistCheckboxLabel = document.createElement("label");
        this.showChecklistCheckboxLabel.setAttribute("for", showChecklistCheckboxId);
        this.showChecklistCheckboxLabel.textContent = "Add Checklist?";

        this.addChecklistItemButton = document.createElement("button");
        this.addChecklistItemButton.textContent = "+";
        this.addChecklistItemButton.style.visibility = "hidden";
        this.addChecklistItemButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.addChecklistItem();
        });

        this.showChecklistContainer.append(this.showChecklistCheckbox, this.showChecklistCheckboxLabel);
        this.checklistActionsContainer.append(this.showChecklistContainer, this.addChecklistItemButton);
        this.form.appendChild(this.checklistActionsContainer);

        // Checklist items container and empty ul to contain checklist items
        this.checklistItemsContainer = document.createElement("div");
        this.checklistItemsContainer.classList.add("checklistItems");
        this.checklistItemsContainer.style.visibility = "hidden";

        this.checklistItemsUnorderedList = document.createElement("ul");

        this.checklistItemsContainer.appendChild(this.checklistItemsUnorderedList);
        this.form.appendChild(this.checklistItemsContainer);

        // Form Actions (Create, Cancel)
        this.formActionsContainer = document.createElement("div");
        this.formActionsContainer.classList.add("formActions");

        this.submitButton = document.createElement("button");
        this.submitButton.id = `${this.formType}-todo`;
        this.submitButton.textContent =
            `${this.formType.substr(0,1).toUpperCase() +
                this.formType.substr(1, this.formType.length)}`;
        this.formActionsContainer.appendChild(this.submitButton);

        this.closeDialogButton = document.createElement("button");
        this.closeDialogButton.textContent = "Cancel";
        this.formActionsContainer.appendChild(this.closeDialogButton);

        this.form.appendChild(this.formActionsContainer);
    }

    toggleChecklistItemsInputVisibility(isVisible) {
        if (isVisible) {
            this.checklistItemsContainer.removeAttribute("style");
            this.addChecklistItemButton.removeAttribute("style");
        } else {
            this.checklistItemsContainer.style.visibility = "hidden";
            this.checklistItemsContainer.style.maxHeight = 0;
            this.addChecklistItemButton.style.visibility = "hidden";
        }
    }

    addChecklistItem() {
        const checklistItem = document.createElement("li");
        checklistItem.classList.add("checklistItem");

        const checklistItemInput = document.createElement("input");
        checklistItemInput.type = "text";
        checklistItemInput.maxLength = 128;

        const checklistItemRemoveButton = document.createElement("button");
        checklistItemRemoveButton.classList.add("removeButton");
        checklistItemRemoveButton.textContent = "-";
        checklistItemRemoveButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.removeChecklistItem(checklistItem);
        });

        checklistItem.append(checklistItemInput, checklistItemRemoveButton);
        this.checklistItemsUnorderedList.appendChild(checklistItem);
    }

    removeChecklistItem(checklistItemToRemove) {
        this.checklistItemsUnorderedList.removeChild(checklistItemToRemove);
    }

    getTodoInputValues() {
        if (this.inputsAreValid()) {
            const inputValues = {};
            inputValues.id = this.form.id;
            inputValues.titleInput = this.titleInput.value;
            inputValues.dueDateInput = this.dueDateInput.value;
            inputValues.priorityInput = this.prioritySelect.value;
            inputValues.descriptionInput = this.descriptionInput.value;

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

            return inputValues;
        }
    }

    resetInput() {
        this.titleInput.value = "";
        this.descriptionInput.value = "";
        this.dueDateInput.value = new Date().toLocaleDateString("fr-ca");
        this.showChecklistCheckbox.checked = false;
        this.toggleChecklistItemsInputVisibility(false);
        while (this.checklistItemsUnorderedList.firstChild) {
            this.removeChecklistItem(this.checklistItemsUnorderedList.firstChild);
        }
        this.prioritySelect.value = "Low";
    }

    inputsAreValid() {
        if (this.titleInput.validity.valueMissing) {
            this.titleInput.setCustomValidity("A title is required!");
        } else if (this.titleInput.validity.tooShort) {
            this.titleInput.setCustomValidity("Title needs at least 3 characters!");
        } else if (this.titleInput.validity.tooLong) {
            this.titleInput.setCustomValidity("Title cannot exceed 40 characters!")
        } else {
            this.titleInput.setCustomValidity("");
        }

        if (this.dueDateInput.validity.rangeUnderflow) {
            this.dueDateInput.setCustomValidity("Date must be at least set to today!");
        } else {
            this.dueDateInput.setCustomValidity("");
        }

        if (this.descriptionInput.validity.tooLong) {
            this.descriptionInput.setCustomValidity(`Description is too long. Max length allowed is 256 characters but was ${this.descriptionInput.value.length} characters long!`);
        } else {
            this.descriptionInput.setCustomValidity("");
        }

        return this.form.reportValidity();
    }
}