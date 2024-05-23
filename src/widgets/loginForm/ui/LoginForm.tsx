import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import s from "./LoginForm.module.css";
import { useAppDispatch } from "shared/store/hooks/useAppDispatch";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {  authThunk, useAppSelector } from "shared";

type initialValuesForm = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export const LoginForm = () => {
  const [passwordVisibile, setPasswordVisible] = useState(false);

  const captchaUrl = useAppSelector((state) => state.auth.captchaUrl);

  const dispatch = useAppDispatch();

  const formik = useFormik<initialValuesForm>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
    onSubmit: (value) => {
      dispatch(authThunk.loginAuthTC({ userData: value }));
      formik.resetForm();
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(4, "Password must be more than 4 symbol")
        .matches(/^[A-Z0-9]+$/i, "Invalid password")
        .required("Required"),
    }),
  });

  const onClickHandler = () => {
    setPasswordVisible((state) => !state);
  };

  const disabledSubmitButton = (error: any) => {
    return !!Object.values(error).filter((el) => !!el).length;
  };

  return (
    <Grid container justifyContent={"center"} style={{ height: "70vh" }}>
      <Grid item justifyContent={"center"} alignContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <div className={s.textFieldWrapper}>
                <TextField
                  style={{ width: "100%" }}
                  label="Email"
                  margin="normal"
                  onFocus={() => formik.setFieldTouched("email", false)}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && <div className={s.error}>{formik.errors.email}</div>}
              </div>
              <div className={s.textFieldWrapper}>
                <TextField
                  style={{ width: "100%" }}
                  type={passwordVisibile ? "text" : "password"}
                  label="Password"
                  margin="normal"
                  {...formik.getFieldProps("password")}
                  onFocus={() => formik.setFieldTouched("password", false)}
                />
                <VisibilityOffIcon onClick={onClickHandler} className={s.visibleIcon} />
                {formik.touched.password && <div className={s.error}>{formik.errors.password}</div>}
              </div>
              <FormControlLabel label={"Remember me"} control={<Checkbox {...formik.getFieldProps("rememberMe")} />} />
              <Button
                disabled={disabledSubmitButton(formik.errors)}
                type={"submit"}
                variant={"contained"}
                color={"primary"}
              >
                Login
              </Button>
              {captchaUrl && (
                <div className={s.textFieldWrapper + " " + s.captchaWrapper}>
                  <div className={s.imgWrapper}>
                    <img className={s.captcha} src={captchaUrl} alt="captcha" />
                  </div>
                  <p>Enter the text that is in the picture</p>
                  <TextField
                    className={s.inputCaptcha}
                    style={{ width: "100%", marginTop: "5px" }}
                    type={"text"}
                    label="captcha"
                    margin="normal"
                    {...formik.getFieldProps("captcha")}
                    onFocus={() => formik.setFieldTouched("captcha", false)}
                  />
                </div>
              )}
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
