import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import s from './Login.module.css';
import { RootReducerType, useAppDispatch } from '../../../store/store';
import { loginAuthTC } from '../../../store/auth-reducer';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type initialValuesForm = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export const Login = () => {
  const [passwordVisibile, setPasswordVisible] = useState(false);
  const captchaUrl = useSelector<RootReducerType, string>((state) => state.auth.captchaUrl);
  const isLogin = useSelector<RootReducerType, boolean>((state) => state.auth.isLogIn);
  const dispatch = useAppDispatch();

  const formik = useFormik<initialValuesForm>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    },
    onSubmit: (value) => {
      dispatch(loginAuthTC(value));

      formik.resetForm();
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(7, 'Password must be more than 6 symbol')
        .matches(/^[A-Z0-9]+$/i, 'Invalid password')
        .required('Required'),
    }),
  });

  const onClickHandler = () => {
    setPasswordVisible((state) => !state);
  };

  const disabledSubmitButton = (error: any) => {
    return !!Object.values(error).filter((el) => !!el).length;
  };
  if (isLogin) {
    return <Navigate to='/todo' />;
  }

  return (
    <Grid container justifyContent={'center'} style={{ height: '70vh' }}>
      <Grid item justifyContent={'center'} alignContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
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
                  style={{ width: '100%' }}
                  label='Email'
                  margin='normal'
                  onFocus={() => formik.setFieldTouched('email', false)}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && <div className={s.error}>{formik.errors.email}</div>}
              </div>
              <div className={s.textFieldWrapper}>
                <TextField
                  style={{ width: '100%' }}
                  type={passwordVisibile ? 'text' : 'password'}
                  label='Password'
                  margin='normal'
                  {...formik.getFieldProps('password')}
                  onFocus={() => formik.setFieldTouched('password', false)}
                />
                <VisibilityOffIcon onClick={onClickHandler} className={s.visibleIcon} />
                {formik.touched.password && <div className={s.error}>{formik.errors.password}</div>}
              </div>
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button
                disabled={disabledSubmitButton(formik.errors)}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
              >
                Login
              </Button>
              {captchaUrl && (
                <div className={s.textFieldWrapper + ' ' + s.captchaWrapper}>
                  <div className={s.imgWrapper}>
                    <img className={s.captcha} src={captchaUrl} alt='captcha' />
                  </div>
                  <p>Enter the text that is in the picture</p>
                  <TextField
                    className={s.inputCaptcha}
                    style={{ width: '100%', marginTop: '5px' }}
                    type={'text'}
                    label='captcha'
                    margin='normal'
                    {...formik.getFieldProps('captcha')}
                    onFocus={() => formik.setFieldTouched('captcha', false)}
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
