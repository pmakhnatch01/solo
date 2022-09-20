import React, { Fragment, useState, useEffect } from "react";
import ListTodos from "./ListTodos";
import InputTodo from "./InputTodo";
// import { BrowserRouter as Router } from "react-router-dom";

export interface ToDoV2 {
  _id: string;
  description: string;
  time: Date,
  completed: boolean
}

// interface ToDoContainer extends Array<ToDo> {}
interface ToDoV2Container extends Array<ToDoV2>{}

const UserTodoList = (props: any): any => {
  const [todos2, setTodos2] = useState<ToDoV2Container>([]);
  const userId = props.userId;

  const getTodos2 = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/user/${userId}`);
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
      <InputTodo listTodosUpdate={listTodosUpdate} toDoList={todos2} userId={userId}></InputTodo>
      <ListTodos listTodosUpdate={listTodosUpdate} toDoList={todos2} userId={userId}></ListTodos>
    </Fragment>
  )
}

export default UserTodoList;