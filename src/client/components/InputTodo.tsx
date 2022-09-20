import React, {  Fragment, FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export interface ToDoV2 {
  _id: string;
  description: string;
  time: Date,
  completed: boolean
}

// interface ToDoContainer extends Array<ToDo> {}
interface ToDoV2Container extends Array<ToDoV2>{}

const InputTodo = (props:any):ReactElement => {
  const [description, setDescription] = useState("");
  const userId = props.userId;

  const dummyUser = {
    name: "peter",
    email: "peter@gmail.com",
    password: "asd123",
  }
  const todos2: ToDoV2Container = props.toDoList;
  const setTodos2 = props.listTodosUpdate;


  // const onSubmitForm = async (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   try {
  //     const body = { description };
  //     const response = await fetch("https://rc-pern-todo.herokuapp.com/todos", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     // window.location.href = "/";
  //     window.location.reload();
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // };

  const onSubmitForm2 = async (event: any) => {
    event.preventDefault();
    try {
      console.log("InputTodo - onSubmitForm2", description);
      const body = { description, "time": "2002-12-13T11:22", "type": "222", user: userId};
      const response = await fetch (`http://localhost:3000/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const jsonData = await response.json();
      console.log("InputTodo - onSubmitForm2", jsonData)
      setTodos2(jsonData);
      setDescription("");
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h1" align="center">
          CRUD BOYS
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={(event) => onSubmitForm2(event)}
        sx={{
          mt: 4,
          display: "flex",
          width: 500,
          maxWidth: "100%",
          mx: "auto",
        }}
      >
        <TextField
          label="Add new todo"
          variant="outlined"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <Button variant="contained" type="submit">
                Add
              </Button>
            ),
          }}
        />
      </Box>
    </Fragment>
  );
};

export default InputTodo;
