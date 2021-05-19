import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Todo} from "./Todo";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../../app/store";
import API from "./todoAPI";

configure({adapter: new Adapter()});
jest.mock("./todoAPI");
it('Read list todo', done => {
  //Mock value
  const value = [{todo: "todo", description: "description"}];
  const promise = Promise.resolve(value);
  //Mock function
  API.readTodo = jest.fn().mockImplementation(() => promise);
  //Render component
  const wrapper = mount(<Provider store={store}><Todo/></Provider>);
  //Check no data on init
  expect(wrapper.find('ListTodo').first().text()).toBe("(No data)");
  //Check API call
  expect(API.readTodo).toHaveBeenCalledTimes(1);
  //Wait for all process finish
  promise.then(() => {
    process.nextTick(async () => {
      //Find ListTodo items
      const items = wrapper.find('ListTodo').children();
      //Check item
      expect(items.html()).toContain('<h5>todo</h5>')
      //Check item
      expect(items.html()).toContain('<span>description</span>')
      //Check saved item in store
      expect(wrapper.props().store.getState().todo.todoList).toMatchObject(value);
      //Check item count
      expect(items.length).toBe(1);
      done()
    })
  })
});
