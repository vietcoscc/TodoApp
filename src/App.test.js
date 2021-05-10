import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';

beforeEach(() => {
  document.body.innerHTML = "";
  localStorage.clear();
});

describe('Init test', () => {
  test('Show App', () => {
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    expect(getByText("(No data)")).toBeInTheDocument();
    expect(getByText("Todo APP")).toBeInTheDocument();
    expect(getByText("Todo")).toBeInTheDocument();
    expect(getByText("Description")).toBeInTheDocument();
    expect(getByPlaceholderText("Todo")).toBeInTheDocument();
    expect(getByPlaceholderText("Description")).toBeInTheDocument();
    expect(getByText("Add todo")).toBeInTheDocument();
  });
});

describe('', () => {
  test('Add todo', () => {

  });
  test('Add todo invalid', () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    const emptyValue = {
      target: {
        value: ""
      }
    };
    const inputTodo = getByPlaceholderText("Todo");
    const inputDescription = getByPlaceholderText("Description");
    const btnAddTodo = getByText("Add todo");
    fireEvent.change(inputTodo, emptyValue);
    fireEvent.change(inputDescription, emptyValue);
    fireEvent.click(btnAddTodo);
    console.log(document.body.innerHTML);
    expect(getByText("The field must not empty")).toBeInTheDocument()
  });
  test('Add todo success', async () => {
    const {getByPlaceholderText, getByText, queryByText, findAllByText} = render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    const todo = {
      target: {
        value: "Dummy TODO"
      }
    };
    const description = {
      target: {
        value: "Dummy DESCRIPTION"
      }
    };
    const inputTodo = getByPlaceholderText("Todo");
    const inputDescription = getByPlaceholderText("Description");
    const btnAddTodo = getByText("Add todo");
    fireEvent.change(inputTodo, todo);
    fireEvent.change(inputDescription, description);
    fireEvent.click(btnAddTodo);
    expect(queryByText("The field must not empty")).not.toBeInTheDocument();

    await (waitFor(async () => {
      const items = await findAllByText("Dummy TODO");
      items.forEach(item => {
        expect(item).toBeInTheDocument()
      })
    }, {timeout: 3000}))
  })
});
