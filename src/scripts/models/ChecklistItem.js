export default class ChecklistItem {
    constructor(content, checked = false) {
        this.id = `checklistItem-${Math.floor((Math.random() * 1000000))}`;
        this.content = content;
        this.checked = checked;
    }

    toggleChecked() {
        this.checked = this.checked ? false : true;
    }
}
