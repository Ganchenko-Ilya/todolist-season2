import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

type initialValuesForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export const Login = () => {
  const [passwordVisibile,setPasswordVisible] = useState(false)
  const formik = useFormik<initialValuesForm>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (value) => {
      alert(JSON.stringify(value));
      formik.resetForm();
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(7, "Password must be more than 6 symbol")
        .matches(/^[A-Z0-9]+$/i, "Invalid password"),
    }),

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
    
  });
  const onClickHandler = () => {
      setPasswordVisible(state => !state)
  }
  return (
    <Grid container justifyContent={"center"} style={{ height: "80vh" }}>
      <Grid item justifyContent={"center"} alignContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                onFocus={() => formik.setFieldTouched("email", false)}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email}
              <div style={{position:'relative'}}><TextField
              style={{width:'100%'}}
                type={passwordVisibile ? 'text' : 'password'}
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
                onFocus={() => formik.setFieldTouched("password", false)}
              /><VisibilityOffIcon onClick={onClickHandler} style={{position:'absolute',right:'0',top:'20%',cursor:'pointer'}} /></div>
              
              
              {formik.touched.password && formik.errors.password}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
