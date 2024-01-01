import ChecklistItem from "./ChecklistItem.js";

export default class Checklist {
    constructor(checklistItems = []) {
        this.checklistItems = [];
        checklistItems.forEach((checklistItem) => {
            this.checklistItems.push(new ChecklistItem(checklistItem.content, checklistItem.checked));
        });
    }
}