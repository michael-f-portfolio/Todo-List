import "styles/todoDisplay.css";
import { format } from "date-fns";

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

        const todoPriorityContainer = document.createElement("div");
        todoPriorityContainer.classList.add(`priority${todo.priority}`);

        todoContainer.id = todo.id;
        todoContainer.classList.add("todoContainer", todo.completed
                                                     ? "complete"
                                                     : "incomplete");

        const todoTitle = document.createElement("div");
        todoTitle.classList.add("todoTitle");
        todoTitle.textContent = todo.title;
        todoPriorityContainer.appendChild(todoTitle);

        const todoInfoContainer = document.createElement("div");
        todoInfoContainer.classList.add("todoInfo");

        const todoPriority = document.createElement("div");
        todoPriority.classList.add("todoPriority");
        todoPriority.textContent = todo.priority;
        todoInfoContainer.appendChild(todoPriority);

        const todoDueDate = document.createElement("div");
        todoDueDate.classList.add("todoDueDate");
        // format date
        // trim off the timezone so date-fns.format() treats it as locale
        // since input date comes in as UTC but create Date with that value makes it locale
        // "Tue, 02 Jan 2024 00:00:00 GMT" to
        // "Tue, 02 Jan 2024 00:00:00"
        const dateToFormat = todo.dueDate.toUTCString().substr(0, todo.dueDate.toUTCString().length - 4);
        const formattedDate = format(dateToFormat, "MMMM do, yyyy");
        todoDueDate.textContent = formattedDate;
        todoInfoContainer.appendChild(todoDueDate);

        todoPriorityContainer.appendChild(todoInfoContainer);

        const todoDescription = document.createElement("div");
        todoDescription.classList.add("todoDescription");
        todoDescription.textContent = todo.description;
        todoPriorityContainer.appendChild(todoDescription);

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
            todoPriorityContainer.appendChild(todoChecklist);
        }

        // todo actions
        const todoActionsContainer = document.createElement("div");
        todoActionsContainer.classList.add("todoActions");

        const completeTodoButton = document.createElement("button");
        completeTodoButton.textContent = todo.completed
                                         ? "Uncomplete"
                                         : "Complete";
        completeTodoButton.classList.add("toggleComplete")
        completeTodoButton.addEventListener("click", () => this.onTodoCompleteButtonClick(todoContainer.id));

        const editTodoButton = document.createElement("button");
        editTodoButton.textContent = "Edit";
        editTodoButton.addEventListener("click", () => this.onTodoEditButtonClick(todoContainer.id));

        const deleteTodoButton = document.createElement("button");
        deleteTodoButton.classList.add("removeButton");
        deleteTodoButton.textContent = "Delete";
        deleteTodoButton.addEventListener("click", () => this.onTodoDeleteButtonClick(todoContainer.id));

        todoActionsContainer.append(completeTodoButton, editTodoButton, deleteTodoButton);
        todoPriorityContainer.appendChild(todoActionsContainer);
        todoContainer.appendChild(todoPriorityContainer);

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