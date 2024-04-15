import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { SnakeBarError } from "../../otherComponents/snakeBarError/SnakeBarError";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TodolistsList } from "../features/todolistsList/TodolistsList";
import { useApp } from "./hooks/useApp";
import { Login } from "../features/login/Login";
import s from "./App.module.css";

const App = () => {
  console.log("App");
  const navigate = useNavigate();

  const { statusApp, isLogIn,onClickLoginHandler } = useApp();
  
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          <Button onClick={onClickLoginHandler} color="inherit">
            {isLogIn ? "LogOut" : "LogIn"}
          </Button>
        </Toolbar>
      </AppBar>
      <div className={s.linearProgressWrapper}>
        {statusApp === "loading" && <LinearProgress className={s.linearProgress} />}
      </div>

      <Routes>
        <Route path="/" element={<TodolistsList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <SnakeBarError />
      
    </div>
  );
};

export default App;
