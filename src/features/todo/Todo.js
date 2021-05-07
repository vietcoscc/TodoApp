import React, {useState} from "react";
import {addTodoAsync, deleteTodoAsync, readTodoAsync} from "./todoSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaTrashAlt} from 'react-icons/fa';

export function Todo() {
  const dispatch = useDispatch();
  dispatch(readTodoAsync());
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <ListTodo/>
        </div>
        <div className="col-md-6">
          <AddTodo/>
        </div>
      </div>
    </div>
  )
}

function ListTodo() {
  const todos = useSelector(state => {
    console.log("ListTodo", state.todo.todoList);
    return state.todo.todoList
  });
  const dispatch = useDispatch();
  return (
    <div>
      {todos.length === 0 ? <h5 className="mt-3">(No data)</h5> : null}
      {[...todos].reverse().map((todo, index) => {
        return (
          <div className="card text-start mt-3 p-3" key={index}>
            <FaTrashAlt style={{position: "absolute", right: "25", cursor: "pointer"}} onClick={() => {
              dispatch(deleteTodoAsync(todos.length - index - 1));
            }}/>
            <h5>{todo.todo}</h5>
            <span>{todo.description}</span>
          </div>
        )
      })}
    </div>
  )
}

function AddTodo() {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className="d-inline-block">
      <form>
        <table className="mt-3 w-100 text-start">
          <tbody>
          <tr>
            <th className="">
              {"Todo"}
            </th>
            <td>
              <input value={todo} onChange={(e) => {
                setTodo(e.target.value);
                if (todo) {
                  setValid(true);
                }
              }}/>
            </td>
          </tr>
          <tr>
            <th>
              Description
            </th>
            <td>
              <input value={description} onChange={(e) => {
                setDescription(e.target.value)
                if (description) {
                  setValid(true);
                }
              }}/>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
      <div>
        {!valid ? <span className="text-danger">The field must not empty</span> : <div/>}
      </div>
      <button className="btn btn-primary mt-3" onClick={() => {
        if (todo && description) {
          dispatch(addTodoAsync({
            todo: todo,
            description: description
          }));
          setDescription("");
          setTodo("");
        } else {
          setValid(false);
        }
      }}>Add todo
      </button>
    </div>
  )
}
