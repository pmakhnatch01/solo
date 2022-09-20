import React, { Fragment, ReactElement, useState } from "react";
// import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";
import Container from "@mui/material/Container";
import UserTodoList from "./components/UserTodoList"
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login.page';
import SignupPage from './pages/Signup.page';
import FormInput from './components/FormInput';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';





const App = (): ReactElement  => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const createUserId = (userId: any): any => {
    setUserId(userId);
    console.log("App -> createUserId", userId);
  }

  const Test = () => {
    return (
      <Container maxWidth="md">
        <UserTodoList userId={userId} />
      </Container>
    )
  }

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage createUserId={createUserId} />} />
        <Route path='/todolist' element={<Test></Test>} />
      </Routes>
    </>
    // <Fragment>
    //   <CssBaseline />
    //   <Container maxWidth="md">
    //     <UserTodoList createUserId={createUserId} />
    //   </Container>
    // </Fragment>
  );
}

export default App;