import Header from "../../components/header";
import NewTodo from "../../components/newTodo";
import Footer from "../../components/footer";
import Todos from "../../models/Todos";
import TodosDisplay from "../../components/todosDisplay";
import EditTodo from "../../components/editTodo";

export class TodoController {
    constructor() {
        this.headerView = new Header();
        this.newTodo = new NewTodo();
        this.editTodo = new EditTodo();
        this.todosDisplay = new TodosDisplay();
        this.footerView = new Footer();

        this.todoModel = new Todos();

        // display initial todos
        this.onTodoListChange(this.todoModel.todos);

        this.newTodo.bindAddTodo(this.handleAddTodo);
        this.todosDisplay.bindDeleteTodo(this.handleDeleteTodo);
        this.todosDisplay.bindToggleCompleteTodo(this.handleToggleCompleteTodo)
        this.todosDisplay.bindToggleTodoChecklistItemChecked(this.handleToggleTodoChecklistItemChecked);
        this.todosDisplay.bindShowEditor(this.handleDisplayEditTodoDialog);
        this.editTodo.bindEditTodo(this.handleEditTodo);

        this.todoModel.bindTodoListChange(this.onTodoListChange);
    }

    onTodoListChange = (todos) => {
        this.todosDisplay.displayTodos(todos);
    }

    handleAddTodo = (todo) => {
        this.todoModel.addTodo(todo);
    }

    handleEditTodo = (todo) => {
        this.todoModel.editTodo(todo.id, todo);
    }

    handleDisplayEditTodoDialog = (todoId) => {
        this.editTodo.showEditor(this.todoModel.getTodo(todoId));
    }

    handleDeleteTodo = (todoId) => {
        this.todoModel.deleteTodo(todoId);
    }

    handleToggleCompleteTodo = (todoId) => {
        this.todoModel.toggleCompleteTodo(todoId);
    }

    handleToggleTodoChecklistItemChecked = (todoId, checklistItemId) => {
        this.todoModel.toggleTodoChecklistItem(todoId, checklistItemId);
    }

}