import React from 'react';
import './App.css';
import {Todo} from "./features/todo/Todo";

function App() {
  return (
    <div className={"App"}>
      <h1 className="mt-5">Todo APP</h1>
      <Todo/>
    </div>
  );
}

export default App;
