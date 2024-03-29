import { Provider } from "react-redux";
import { store } from "../../store/store";
import  { ComponentType } from "react";

import App from "../../components/app/App";
import { Todolist } from "../../components/todolist/Todolist";

export const providerDecorator =
  <T extends object>(Components: ComponentType<T>):ComponentType<T> =>
  (props: T):JSX.Element => (
    <Provider store={store}>
      <Components {...props} />
    </Provider>
  );

export const AppWithProvider = providerDecorator(App);
export const TodolistWithProvider = providerDecorator(Todolist);

