import s from "./App.module.css";

import { Todolist } from "../todolist/Todolist";
import { InputAddItemForm } from "../otherComponents/inputAddItemForm/InputAddItemForm";
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTodolist } from "./hooks/useTodolist";

const App = () => {
  console.log("App");

  const { addTodo, todolists, deleteTodo, editTitleTodo } = useTodolist();

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
};

export default App;
