import { Navigate } from "react-router-dom";
import { useAppSelector } from "shared";

import { LoginForm } from "widgets/loginForm";

export const LoginPage = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogIn);
  if (isLogin) {
    return <Navigate to="/todo" />;
  }

  return <LoginForm />;
};

// validateOnChange:false
//   validate: (values) => {
//     const errors: Partial<initialValuesForm> = {};

//     if (!values.password.length) {
//       errors.password = "Required";
//     } else if (values.password.length < 6) {
//       errors.password = "Password must be more than 6 symbol";
//     } else if (!/^[A-Z0-9]+$/i.test(values.password)) {
//       errors.password = "Invalid password";
//     }

//     if (!values.email.length) {
//       errors.email = "Required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//       errors.email = "Invalid email address";
//     }
//     return errors;
//   },
