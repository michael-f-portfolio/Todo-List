export default class TodosDisplay {
    constructor() {
        this.app = document.querySelector("#main-content-container");

        this.todoDisplayContainer = document.createElement("div");
        this.todoDisplayContainer.id = "todo-display-container";

        this.app.appendChild(this.todoDisplayContainer);
    }

    displayTodos = (todos) => {
        this.todoDisplayContainer.textContent = "";

        if (todos.length === 0) {
            this.todoDisplayContainer.textContent = "No todos.. add one?";
        } else {
            todos.forEach(todo => this.displayTodo(todo));
        }
    }

    displayTodo = (todo) => {
        const todoContainer = document.createElement("div");
        todoContainer.id = todo.id;
        todoContainer.classList.add("todoContainer", todo.completed
                                                     ? "complete"
                                                     : "incomplete");

        const todoTitle = document.createElement("div");
        todoTitle.classList.add("todoTitle");
        todoTitle.textContent = todo.title;
        todoContainer.appendChild(todoTitle);

        const todoDescription = document.createElement("div");
        todoDescription.classList.add("todoDescription");
        todoDescription.textContent = todo.description;
        todoContainer.appendChild(todoDescription);

        const todoDueDate = document.createElement("div");
        todoDueDate.classList.add("todoDueDate");
        todoDueDate.textContent = todo.dueDate;
        todoContainer.appendChild(todoDueDate);

        const todoPriority = document.createElement("div");
        todoPriority.classList.add("todoPriority");
        todoPriority.textContent = todo.priority;
        todoContainer.appendChild(todoPriority);

        if (todo.checklist.checklistItems.length > 0) {
            const todoChecklist = document.createElement("div");
            todoChecklist.classList.add("todoChecklist");
            todo.checklist.checklistItems.forEach((checklistItem) => {
                const todoChecklistItem = document.createElement("div");
                todoChecklistItem.classList.add(checklistItem.checked
                                                ? "checked"
                                                : "unchecked");

                const todoChecklistItemCheckbox = document.createElement("input");
                todoChecklistItemCheckbox.type = "checkbox";
                todoChecklistItemCheckbox.checked = checklistItem.checked ? true : false;
                todoChecklistItemCheckbox.id = checklistItem.id;
                todoChecklistItemCheckbox.addEventListener("click", () =>
                    this.onTodoChecklistItemCheckboxClick(todo.id, checklistItem.id));
                todoChecklistItem.appendChild(todoChecklistItemCheckbox);

                const todoChecklistItemContent = document.createElement("label");
                todoChecklistItemContent.textContent = checklistItem.content;
                todoChecklistItemContent.setAttribute("for", checklistItem.id);
                todoChecklistItem.appendChild(todoChecklistItemContent);

                todoChecklist.appendChild(todoChecklistItem);
            });
            todoContainer.appendChild(todoChecklist);
        }

        const completeTodoButton = document.createElement("button");
        completeTodoButton.textContent = "Toggle Status";
        completeTodoButton.addEventListener("click", () => this.onTodoCompleteButtonClick(todoContainer.id));
        todoContainer.appendChild(completeTodoButton);

        const editTodoButton = document.createElement("button");
        editTodoButton.textContent = "Edit";
        editTodoButton.addEventListener("click", () => this.onTodoEditButtonClick(todoContainer.id));

        todoContainer.appendChild(editTodoButton);

        const deleteTodoButton = document.createElement("button");
        deleteTodoButton.textContent = "Delete";
        deleteTodoButton.addEventListener("click", () => this.onTodoDeleteButtonClick(todoContainer.id));
        todoContainer.appendChild(deleteTodoButton);

        this.todoDisplayContainer.appendChild(todoContainer);
    }

    bindToggleTodoChecklistItemChecked = (handler) => {
        this.onTodoChecklistItemCheckboxClick = handler;
    }

    bindToggleCompleteTodo = (handler) => {
        this.onTodoCompleteButtonClick = handler;
    }

    bindDeleteTodo = (handler) => {
        this.onTodoDeleteButtonClick = handler;
    }

    bindShowEditor(handler) {
        this.onTodoEditButtonClick = handler;
    }



}