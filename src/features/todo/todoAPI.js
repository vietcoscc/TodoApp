// A mock function to mimic making an async request for data
function readTodo() {
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

function createTodo(data) {
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
      console.log("createTodo", todoList);
      resolve(todoList)
    }, 1)
  );
}

function deleteTodo(index) {
  console.log("deleteTodo:     --- ", index);
  return new Promise((resolve) =>
    setTimeout(() => {
      let todoList = localStorage.getItem("todoList");

      if (todoList && todoList.length > 0) {
        todoList = JSON.parse(todoList);
        console.log(todoList);
        todoList.splice(index, 1);
        console.log(todoList)
      }
      localStorage.setItem('todoList', JSON.stringify(todoList));
      resolve(todoList)
    }, 1)
  );
}

export default {createTodo, readTodo, deleteTodo}
