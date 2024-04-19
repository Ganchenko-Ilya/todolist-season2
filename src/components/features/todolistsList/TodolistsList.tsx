import { useTodolist } from "./hooks/useTodolist";
import s from "./TodolistsList.module.css";
import { Todolist } from "../../todolist/Todolist";
import { Container } from "@mui/material";
import { InputAddItemForm } from "../../../otherComponents/inputAddItemForm/InputAddItemForm";
import { Navigate } from "react-router-dom";

export const TodolistsList = () => {
  const { todolists, deleteTodo, editTitleTodo, addTodo, isLogin } =
    useTodolist();

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
