import { addTodo, getAllTodos, removeTodo, updateTodo } from "./data.js";
import { renderTodos, clearNewTodoInput, getTodoId } from "./view.js";
import { capitalize } from "lodash";
import { trim } from "./helpers.ts";
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
  const id = getTodoId(event.target);
  removeTodo(id);
  renderTodos(getAllTodos());
}

export function toggleTodoEventListener(event) {
  const id = getTodoId(event.target);
  const isCompleted = event.target.checked;
  updateTodo(id, isCompleted);
  renderTodos(getAllTodos());
}
