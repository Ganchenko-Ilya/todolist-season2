import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { SnakeBarInfo } from '../../otherComponents/snakeBarInfo/SnakeBarInfo';
import { Route, Routes } from 'react-router-dom';
import { TodolistsList } from '../features/todolistsList/TodolistsList';
import { useApp } from './hooks/useApp';
import { Login } from '../features/login/Login';
import s from './App.module.css';

const App = () => {
  console.log('App');
  const { statusApp, isLogIn, userLogin, initialization, onClickLoginHandler } = useApp();
debugger
  if (!initialization) {
    return (
      <div className={s.circularProgress}>
        <CircularProgress size={70} />
      </div>
    );
  }

  return (
    <div>
      <AppBar position='relative'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          <div className={s.userLogin}>
            <Typography variant='body1' component='div' sx={{ flexGrow: 1 }}>
              {userLogin}
            </Typography>
            <Button onClick={onClickLoginHandler} color='inherit'>
              {isLogIn ? 'LogOut' : 'LogIn'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={s.linearProgressWrapper}>
        {statusApp === 'loading' && <LinearProgress className={s.linearProgress} />}
      </div>

      <Routes>
        <Route path='/todo' element={<TodolistsList />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <SnakeBarInfo />
    </div>
  );
};

export default App;
