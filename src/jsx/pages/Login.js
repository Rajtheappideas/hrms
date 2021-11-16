import MetaTags from "react-meta-tags";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";

import { toast } from "react-toastify";
// import { connect } from "react-redux"
import { withRouter, Link, Redirect } from "react-router-dom";

// Formik
import { FormikProvider, Form, useFormik } from "formik";

// yup
import * as yup from "yup";

// react-icons
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

// material ui
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

// actions
// import { loginUser, apiError } from "../../store/actions"

const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const history = useHistory();

  // const roleBasedRedirect = (userRole) => {
  //   if (userRole === "react Developer") {
  //     history.push("DevloperReport");
  //   } else {
  //     console.log("nothin...");
  //   }
  // };

  // yup validation
  const RegistrationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
    password: yup.string().required("No password provided."),
  });

  // formik values
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      const Response = await axios({
        method: "POST",
        url: "https://hrms-tai.herokuapp.com/login",
        data: user,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      // .catch(err => {console.log(err)})
      const result = Response.data;
      console.log("result", result);
      
      // roleBasedRedirect(userRole);
      localStorage.setItem("userEmail", JSON.stringify(result?.email));
      localStorage.setItem("designation", JSON.stringify(result?.designation));
      localStorage.setItem("token", JSON.stringify(result?.token));
      resetForm();
      history.push("/");
      return user;
    },
  });

  const {
    errors,
    touched,
    resetForm,
    handleSubmit,
    isSubmitting,
    getFieldProps,
  } = formik;

  const containerStyle = {
    padding: "30px 20px",
    width: 400,
    margin: "20px auto",
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login</title>
      </MetaTags>
      {/* <ToastContainer position='top-center'/> */}
      <Grid>
        <div className="account-pages">
          <Container style={containerStyle} component="main">
            <Card className="overflow-hidden">
              <div className="bg-primary">
                <div className="text-primary text-center p-4">
                  <h5 className="text-white font-size-20">
                    <FiUser size={30} /> <br />
                    Welcome Back !
                  </h5>
                  <p className="text-white-50">
                    Sign in to continue to The App Ideas.
                  </p>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="p-3">
                  <FormikProvider
                    value={formik}
                    className="form-horizontal mt-4"
                  >
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        autoComplete="email"
                        className="mb-3"
                        variant="outlined"
                        id="email"
                        name="email"
                        required
                        label="Email"
                        type="email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      <TextField
                        fullWidth
                        required
                        className="mb-3"
                        autoComplete="password"
                        name="password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        value={showPassword}
                        label="Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setshowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <RiEyeFill />
                                ) : (
                                  <RiEyeOffFill />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />

                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        className="mt-2"
                      >
                        {isSubmitting ? (
                          <CircularProgress color="inherit" size={20} className="mr-3" />
                        ) : null}
                        Sign In
                      </Button>

                      <div className="col-12 mt-4">
                        <Link to="page-forgot-password">
                          <i className="mdi mdi-lock"></i> Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </FormikProvider>
                </div>
              </CardContent>
            </Card>
            <div className="mt-5 text-center">
              <p>
                Don&#39;t have an account ?{" "}
                <Link to="register" className="fw-medium text-primary">
                  {" "}
                  Signup now{" "}
                </Link>{" "}
              </p>
            </div>
          </Container>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
