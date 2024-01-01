import Checklist from "./Checklist";

export default class Todo {
    constructor(title, description, dueDate, priority, checklistItems, completed = false) {
        this.id = `todo-${Math.floor((Math.random() * 1000000))}`;
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.checklist = new Checklist(checklistItems);
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = this.completed ? false : true;
    }
}