import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { SnakeBarError } from "../../otherComponents/snakeBarError/SnakeBarError";
import { Route, Routes } from "react-router-dom";
import { TodolistsList } from "../features/todolistsList/TodolistsList";
import { useApp } from "./hooks/useApp";
import { Login } from "../features/login/Login";

const App = () => {
  console.log("App");

  const { statusApp } = useApp();

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
        <SnakeBarError />
        {statusApp === "loading" && <LinearProgress />}
      </AppBar>

      <Routes>
        <Route path="/" element={<TodolistsList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
