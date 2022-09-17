import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

// export interface ToDo {
//   todo_id: string;
//   description: string;
//   completed: boolean;
// }

export interface ToDoV2 {
  _id: string;
  description: string;
  time: Date,
  completed: boolean
}

// interface ToDoContainer extends Array<ToDo> {}
interface ToDoV2Container extends Array<ToDoV2>{}

const ListTodos = (props: any) => {
  // const [todos, setTodos] = useState<ToDoContainer>([]);

  const [todos2, setTodos2] = useState<ToDoV2Container>([]);

  const getTodos2 = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks/user/1');
      const jsonData = await response.json();
      setTodos2(jsonData);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const deleteTodo2 = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/user/1/${id}`, {
          method: "DELETE",
        }
      )
      const jsonData = await response.json();
      setTodos2(jsonData);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const completeTodo2 = (id: string) => {
    console.log("copleteTodo2")
  }

  const listTodosUpdate = (arg: any) => {
    setTodos2(arg);
  }

  useEffect(() => {
    getTodos2();
    console.log("useEffect", todos2)
  }, []);

  return (
    <Fragment>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Complete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos2
            .sort((a, b) => +a.completed - +b.completed)
            .map((todo) => {
              return (
                <TableRow key={todo._id}>
                  <TableCell
                    style={
                      todo.completed ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {todo.description}
                  </TableCell>
                  <TableCell>
                    <EditTodo todo={todo} key={todo._id} listTodosUpdate={listTodosUpdate} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component="button"
                      onClick={() => deleteTodo2(todo._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component="button"
                      onClick={() => completeTodo2(todo._id)}
                      disabled={todo.completed}
                      color="success"
                    >
                      <DoneIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default ListTodos;
