import React, { Fragment, useState, useEffect } from "react";
import ListTodos from "./ListTodos";
import InputTodo from "./InputTodo";

export interface ToDoV2 {
  _id: string;
  description: string;
  time: Date,
  completed: boolean
}

// interface ToDoContainer extends Array<ToDo> {}
interface ToDoV2Container extends Array<ToDoV2>{}

const UserTodoList = (): any => {
  const [todos2, setTodos2] = useState<ToDoV2Container>([]);

  const getTodos2 = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/tasks/user/1');
      const jsonData = await response.json();
      setTodos2(jsonData);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos2();
  }, []);

  const listTodosUpdate = (arg: any) => {
    setTodos2(arg);
  }

  return (
    <Fragment>
      <InputTodo listTodosUpdate={listTodosUpdate} toDoList={todos2}></InputTodo>
      <ListTodos listTodosUpdate={listTodosUpdate} toDoList={todos2}></ListTodos>
    </Fragment>
  )
}

export default UserTodoList;