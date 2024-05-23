import { InputAddItemForm } from "features";
import { useTodolist } from "../utils/hooks/useTodolist";
import s from "./TodolistsList.module.css";
import { Container } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Todolist } from "widgets";

export const TodolistsList = () => {
  const { todolists, deleteTodo, editTitleTodo, addTodo, isLogin } = useTodolist();

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="lg">
      <div className={s.inputTodo}>
        <InputAddItemForm addItem={addTodo} helpText="Add List" />
      </div>
      <div className={s.todolistsWrapper}>
        {todolists.map((el) => (
          <Todolist
            key={el.id}
            tId={el.id}
            statusTodo={el.statusTodo}
            titleTodo={el.title}
            deleteTodo={deleteTodo}
            editTitleTodo={editTitleTodo}
          />
        ))}
      </div>
    </Container>
  );
};
