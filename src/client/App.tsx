import React, { Fragment, ReactElement } from "react";
// import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";
import Container from "@mui/material/Container";
import UserTodoList from "./components/UserTodoList"


const App = (): ReactElement  => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <UserTodoList />
      </Container>
    </Fragment>
  );
}

export default App;