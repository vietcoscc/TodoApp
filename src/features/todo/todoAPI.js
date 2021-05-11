// A mock function to mimic making an async request for data
export function editTodo(index, data) {
  return new Promise((resolve) =>
    setTimeout(() => {
      let todoList = localStorage.getItem("todoList");
      if (todoList) {
        todoList = JSON.parse(todoList);
      } else {
        todoList = [];
      }
      if (todoList.length > index) {
        todoList[index] = data
      }
      localStorage.setItem('todoList', JSON.stringify(todoList));
      resolve(todoList)
    }, 1)
  );
}

export function readTodo() {
  return new Promise((resolve) =>
    setTimeout(() => {
      let todoList = localStorage.getItem("todoList");
      if (todoList) {
        todoList = JSON.parse(todoList);
      } else {
        todoList = [];
      }
      resolve(todoList)
    }, 1)
  );
}

export function createTodo(data) {
  return new Promise((resolve) =>
    setTimeout(() => {
      let todoList = localStorage.getItem("todoList");
      if (todoList) {
        todoList = JSON.parse(todoList);
      } else {
        todoList = [];
      }
      todoList.push(data);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      resolve(todoList)
    }, 1)
  );
}

export function deleteTodo(index) {
  return new Promise((resolve) =>
    setTimeout(() => {
      let todoList = localStorage.getItem("todoList");

      if (todoList && todoList.length > 0) {
        todoList = JSON.parse(todoList);
        todoList.splice(index, 1);
      } else {
        todoList = [];
      }
      localStorage.setItem('todoList', JSON.stringify(todoList));
      resolve(todoList)
    }, 1)
  );
}

export default {createTodo, readTodo, deleteTodo, editTodo}
