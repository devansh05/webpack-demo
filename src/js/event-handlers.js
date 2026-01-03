import { addTodo, getAllTodos, removeTodo, updateTodo } from "./data.js";
import { renderTodos, clearNewTodoInput, getTodoId } from "./view.js";
import { capitalize } from "lodash-es";
import { trim } from "./helpers.ts";
import $ from "jquery";
// const trim = (value) =>
//   value
//     .replace(/^\s+/, "")
//     .replace(/\s+$/, "")
//     .replace(/\s{2,}/g, " ")
//     .replace(/^\s+|\s+$/g, "");

export function onLoadEventHandler() {
  renderTodos(getAllTodos());
}

export function newTodoEventHandler(event) {
  let text = capitalize(trim(event.target.value));
  // using pipeline operator
  // let text = event.target.value |> trim |> capitalize;
  addTodo({
    id: Date.now(),
    text: text,
    completed: false,
  });
  renderTodos(getAllTodos());
  clearNewTodoInput();
}

export function removeTodoEventHandler(event) {
  import(
    /* webpackChunkName: "async-bootstrap" */
    "bootstrap/dist/js/bootstrap.bundle.js"
  ).then(({ Modal }) => {
    // Modal code can be used here if needed
    const id = getTodoId(event.target);
    $("#modal-delete-button").data("todo-id", id);
    const deleteTodoModal = Modal.getOrCreateInstance(
      document.getElementById("modal-delete-todo")
    );
    deleteTodoModal.show();
  });
}

export function confirmRemoveEventHandler() {
  import(
    /* webpackChunkName: "async-bootstrap" */
    "bootstrap/dist/js/bootstrap.bundle.js"
  ).then(({ Modal }) => {
    // Modal code can be used here if needed
    const id = $("#modal-delete-button").data("todo-id");
    removeTodo(id);
    renderTodos(getAllTodos());
    const deleteTodoModal = Modal.getOrCreateInstance(
      document.getElementById("modal-delete-todo")
    );
    deleteTodoModal.hide();
  });
}

export function toggleTodoEventListener(event) {
  const id = getTodoId(event.target);
  const isCompleted = event.target.checked;
  updateTodo(id, isCompleted);
  renderTodos(getAllTodos());
}
