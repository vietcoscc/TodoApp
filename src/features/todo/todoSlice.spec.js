import {readTodoAsync} from "./todoSlice";
import {waitFor} from "@testing-library/react";
import API from './todoAPI'
import {store} from "../../app/store";

jest.mock("./todoAPI");
describe('todo reducer', () => {
  it('readTodo', async () => {
    const value = [{todo: "todo", description: "description"}]
    API.readTodo.mockReturnValueOnce(value);
    store.dispatch(readTodoAsync());
    await waitFor(async () => {
      expect(API.readTodo).toBeCalledTimes(1)
      expect(store.getState().todo.todoList).toMatchObject(value);
    })
  });
});
