import React, {useState} from "react";
import {addTodoAsync, deleteTodoAsync, editTodoAsync, readTodoAsync, setEditingData} from "./todoSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaEdit, FaTrashAlt} from 'react-icons/fa';

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
    if (state.todo.todoList) {
      return state.todo.todoList
    } else {
      return [];
    }
  });
  const dispatch = useDispatch();
  return (
    <div>
      {todos.length === 0 ? <h5 className="mt-3">(No data)</h5> : null}
      {[...todos].reverse().map((todo, index) => {
        return (
          <div className="card text-start mt-3 p-3" key={index}>
            <FaTrashAlt data-testid="btn-delete" style={{
              position: "absolute",
              right: "25",
              cursor: "pointer"
            }} onClick={() => {
              dispatch(deleteTodoAsync(todos.length - index - 1));
            }}/>
            <FaEdit data-testid="btn-edit" style={{
              position: "absolute",
              right: "25",
              bottom: 25,
              cursor: "pointer"
            }} onClick={() => {
              dispatch(setEditingData({
                isEditing: true,
                editingId: todos.length - index - 1,
                todo: todo.todo,
                description: todo.description,
              }));
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
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();
  const editingData = useSelector(state => {
    return state.todo.editingData;
  });

  function add() {
    if (editingData.todo && editingData.description) {
      dispatch(addTodoAsync({
        todo: editingData.todo,
        description: editingData.description
      }));
      dispatch(setEditingData({
        isEditing: false,
        editingId: null,
        todo: "",
        description: "",
      }))
    } else {
      setValid(false);
    }
  }

  function edit() {
    dispatch(editTodoAsync({
      index: editingData.editingId,
      data: {
        todo: editingData.todo,
        description: editingData.description
      }
    }));
    dispatch(setEditingData({
      isEditing: false,
      editingId: null,
      todo: "",
      description: "",
    }))
  }

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
              <input placeholder="Todo" value={editingData.todo} onChange={(e) => {
                dispatch(setEditingData({
                  editingId: editingData.editingId,
                  isEditing: editingData.isEditing,
                  todo: e.target.value,
                  description: editingData.description
                }));
                if (editingData.todo && editingData.description) {
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
              <input placeholder="Description" value={editingData.description} onChange={(e) => {
                dispatch(setEditingData({
                  editingId: editingData.editingId,
                  isEditing: editingData.isEditing,
                  todo: editingData.todo,
                  description: e.target.value
                }));
                if (editingData.todo && editingData.description) {
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
        if (editingData.isEditing) {
          edit()
        } else {
          add()
        }
      }}>{editingData.isEditing ? "Edit" : "Add todo"}
      </button>
    </div>
  )
}
