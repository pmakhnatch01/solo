import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

// interface ToDo {
//   todo: {
//     todo_id: string;
//     description: string;
//     completed: boolean;
//   };
// }

// interface ToDoV2 {
//   todo: {
//     _id: string;
//     description: string;
//     time: Date,
//     completed: boolean
//   }
// }

const EditTodo = (props:any): any => {
  const todo = props.todo;
  const listTodosUpdate = props.listTodosUpdate;
  const userId = props.userId;
  const [description, setDescription] = useState(todo.description);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): any => {
    setOpen(true);
  };

  const handleClose = (): any => {
    setOpen(false);
  };

  const updateTaskDescription = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    try {
      const body = { description, user: userId };
      // invoke a *function that changes
      // setDescription()
      const response = await fetch (`http://localhost:3000/tasks/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const jsonData = await response.json();
      console.log("EditTodo -> updateTaskDescription -> jsonData", jsonData)
      listTodosUpdate(jsonData);
      // window.location.reload();
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <IconButton
        component="button"
        onClick={handleClickOpen}
        disabled={todo.completed}
        color="warning"
      >
        <EditIcon />
      </IconButton>


      <Dialog
        open={open}
        onClose={handleClose}
        // onClick={() => setDescription(todo.description)}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            autoFocus
            margin="normal"
            label="Todo description"
            variant="outlined"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => {
            updateTaskDescription(event);
            handleClose()
          }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditTodo;
