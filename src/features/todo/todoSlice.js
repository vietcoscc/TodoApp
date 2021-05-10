import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "./todoAPI"

export const readTodoAsync = createAsyncThunk(
  'todo/readTodo',
  async (index) => {
    console.log("readTodoAsync", index);
    const response = await API.readTodo();
    // The value we return becomes the `fulfilled` action payload
    console.log("response", response);
    return response;
  }
);

export const addTodoAsync = createAsyncThunk(
  'todo/addTodo',
  async (data) => {
    console.log("addTodoAsync")
    const response = await API.createTodo(data);
    // The value we return becomes the `fulfilled` action payload
    console.log("response", response);
    return response;
  }
);

export const editTodoAsync = createAsyncThunk(
  'todo/editTodo',
  async (data) => {
    console.log("editTodoAsync", data)
    const response = await API.editTodo(data.index, data.data);
    // The value we return becomes the `fulfilled` action payload
    console.log("response", response);
    return response;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todo/deleteTodo',
  async (index) => {
    console.log("deleteTodoAsync", index);
    const response = await API.deleteTodo(index);
    // The value we return becomes the `fulfilled` action payload
    console.log("response", response);
    return response;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    editingData: {
      isEditing: false,
      editingId: null,
      todo: "",
      description: ""
    },
  },
  reducers: {
    setEditingData: (state, action) => {
      console.log("setEditingData", action);
      state.editingData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(readTodoAsync.pending, (state) => {
        console.log("readTodoAsync pending");
      })
      .addCase(readTodoAsync.fulfilled, (state, action) => {
        console.log("readTodoAsync fulfilled");
        state.todoList = action.payload;
      })
      .addCase(addTodoAsync.pending, (state) => {
        console.log("addTodoAsync pending");
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        console.log("addTodoAsync fulfilled");
        state.todoList = action.payload;
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        console.log("deleteTodoAsync pending");
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        console.log("deleteTodoAsync fulfilled");
        console.log(action);
        state.todoList = action.payload;
      })
      .addCase(editTodoAsync.pending, (state) => {
        console.log("editTodoAsync pending");
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        console.log("editTodoAsync fulfilled");
        console.log(action);
        state.todoList = action.payload;
      })
    ;
  },
});
export const {setEditingData} = todoSlice.actions;
export default todoSlice.reducer
