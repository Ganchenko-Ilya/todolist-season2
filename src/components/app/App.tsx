import s from "./App.module.css";
import { v1 } from "uuid";
import { Todolist } from "../todolist/Todolist";
import { InputAddItemForm } from "../inputAddItemForm/InputAddItemForm";
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../store/store";
import {
  TodolistsType,
  addTodoAC,
  deleteTodoAC,
  editTitleTodoAC,
} from "../../store/todolists-reducer";

function App() {
  const dispatch = useDispatch();
  const todolists = useSelector<RootReducerType, TodolistsType[]>((state) => state.todolists);

  const deleteTodo = (tId: string) => {
    dispatch(deleteTodoAC(tId));
  };
  const addTodo = (title: string) => {
    const newTodoId = v1();
    dispatch(addTodoAC(newTodoId, title));
  };

  const editTitleTodo = (tId: string, newTitle: string) => {
    dispatch(editTitleTodoAC(tId, newTitle));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <div className={s.inputTodo}>
          <InputAddItemForm addItem={addTodo} helpText="Add List" />
        </div>
        <div className={s.todolistsWrapper}>
          {todolists.map((el) => (
            <Todolist
              key={el.id}
              tId={el.id}
              titleTodo={el.title}
              deleteTodo={deleteTodo}
              editTitleTodo={editTitleTodo}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
