import { useTodolist } from "./hooks/useTodolist";
import s from "./TodolistsList.module.css";
import { Todolist } from "../../todolist/Todolist";
import { Container } from "@mui/material";
import { InputAddItemForm } from "../../../otherComponents/inputAddItemForm/InputAddItemForm";

export const TodolistsList = () => {
  const { todolists, deleteTodo, editTitleTodo, addTodo } = useTodolist();
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
