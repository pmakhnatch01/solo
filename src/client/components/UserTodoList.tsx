import React, { Fragment, useState, useEffect } from "react";
import ListTodos from "./ListTodos";
import InputTodo from "./InputTodo";
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Button } from '@mui/material';
// import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


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



  let userId = props.userId;
  // let currentUserId = props.currentUserId;
  let navigate = useNavigate();

  // const getTodos2 = async (): Promise<void> => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/tasks/user/${userId}`);
  //     const jsonData = await response.json();
  //     setTodos2(jsonData.userTasks);
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // }
  // let stateData = todos2;
  // let userIdData = userId;
  // console.log("ok... outside of useEffects", "stateData", stateData, "userIdData", userIdData)

  // useEffect(() => {
  //   console.log("useEffect#1")
  //   // stateData = window.localStorage.getItem('testPersistence');
  //   console.log("useEffect#1 -> stateData", stateData)
  //   userIdData = window.localStorage.getItem('userId');
  //   console.log("useEffect#1 -> userIdData", userIdData)
  //   // const currentUserIdFUNCTION: any = window.localStorage.getItem('currentUserIdFUNCTION');
  //   if (stateData.length !== 0) {
  //     setTodos2(JSON.parse(stateData));
  //     console.log("UserTodoList -> useEffect#1 -> stateData parsed", JSON.parse(stateData));
  //     // console.log("UserTodoList -> useEffect -> stateData parsed", typeof JSON.parse(stateData));
  //     // console.log("UserToDoList -> useEffect -> stateData -> (???) todos2", typeof todos2);
  //     // console.log("UserToDoList -> useEffect -> stateData -> (???) todos2", todos2);
  //   }
  //   console.log("UserTodoList -> useEffect#1 -> userIdData", userIdData, "userId", userId)
  //   if (userIdData !== undefined) {
  //     userId = JSON.parse(userIdData);
  //     console.log("UserToDoList -> useEffect#1 -> stateData -> (???) userId", userId);
  //   }
  //   // if (currentUserIdFUNCTION) {
  //   //   currentUserId = JSON.parse(currentUserIdFUNCTION);
  //   // }
  //   // console.log("UserToDoList -> useEffect -> stateData -> (???) currentUserId", currentUserId);
  // }, [])


  // useEffect(() => {
  //   console.log("useeffect#2", todos2);
  //   // if (todos2.length !== 0) {
  //   // }
  //  }, [todos2]);

  useEffect(() => {
    const getTodos2 = async (): Promise<void> => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/user/${userId}`);
        const jsonData = await response.json();
        console.log("UserTodoList -> getTodos2 -> jsonData + types", jsonData, "time at [0]", jsonData.userTasks[0].time, "type", typeof jsonData.userTasks[0].time);
        setTodos2(jsonData.userTasks);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    getTodos2().catch(console.error);
    // console.log("UserToDoList -> useEffect -> getTodos2 -> (???) localStorage", window.localStorage)
    // console.log("UserToDoList -> useEffect -> getTodos2 -> (???) userId", userId)
    // console.log("UserToDoList -> useEffect -> getTodos2 -> (???) todos2", todos2)
    // if (todos2) window.localStorage.setItem('testPersistence', JSON.stringify(todos2));
    // if (userId) window.localStorage.setItem('userId', JSON.stringify(userId));
    // window.localStorage.setItem('currentUserIdFUNCTION', JSON.stringify(currentUserId));
    // const userId = props.userId;
    // const currentUserId = props.currentUserId;
    // console.log("UserToDoList -> useEffect -> getTodos2 -> (???) localStorage", window.localStorage)
    // console.log("UserToDoList -> useEffect -> getTodos2 -> (???) userId", userId)
    // console.log("UserToDoList -> useEffect -> getTodos2 -> (???) todos2", todos2)
  }, []);
  // }, []);

  const listTodosUpdate = (arg: any) => {
    setTodos2(arg);
  }

  const logout = (user: any): void => {
    console.log("UserTodoList => logout")
    // currentUserId('');
    navigate('/');
  }

  return (
    <Fragment>
      <Grid container justifyContent="flex-end">
        <Button
          onClick={() => logout(userId)}
        >
            Logout
        </Button>
      </Grid>
      <InputTodo listTodosUpdate={listTodosUpdate} toDoList={todos2} userId={userId}></InputTodo>
      <ListTodos listTodosUpdate={listTodosUpdate} toDoList={todos2} userId={userId}></ListTodos>
    </Fragment>
  )
}

export default UserTodoList;