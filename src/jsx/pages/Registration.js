import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import "react-toastify/dist/ReactToastify.min.css";

import { useHistory } from "react-router";
// import axios from "axios"

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
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import Container from "@material-ui/core/Container";

// reacticons
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
// react toastify
import { toast, ToastContainer } from "react-toastify";

// Formik
import { FormikProvider, Form, useFormik } from "formik";

// yup
import * as yup from "yup";

// action
// import { registerUser, apiError, registerUserFailed } from "../../store/actions"

// Redux
// import { connect } from "react-redux"
import { Link } from "react-router-dom";
import axios from "axios";

// phone validation
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const Registration = () => {
  const [showPassword, setshowPassword] = useState(false);

  const navigate = useHistory();

  const dropdownValues = [
    { key: "Developer", value: "Developer" },
    { key: "Bdm", value: "Bdm" },
    { key: "Qa", value: "Qa" },
    { key: "Designer", value: "Designer" },
  ];
  // yup validation
  const RegistrationSchema = yup.object().shape({
    username: yup
      .string()
      .required("username is Required!")
      .min(2, "Too short!")
      .max(50, "Too Long!"),
    email: yup.string().email().required("Email is Required!"),
    designation: yup.string().required("Designation is Required!"),
    phone: yup
      .string()
      .min(10, "At least 10 digit required!")
      .max(10, "At least 10 digit required!")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone Number is Required!"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  // formik values
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      designation: "",
      phone: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values) => {
      const user = {
        email: values.email,
        password: values.password,
        username: values.username,
        phone: values.phone,
        designation: values.designation,
      };

      await fetch("https://hrms-tai.herokuapp.com/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        // console.log(Response.status);
        .then((response) => {
          console.log(response.json());
        })
        .catch((err) => console.log(err.response.data.message));
      toast.success("Sign up successfully..", {
        type: "success",
      });
      resetForm();
      navigate.push("/")
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
        <title>Sign Up</title>
      </MetaTags>

      <ToastContainer position="top-center" />
      <Grid>
        <div className="account-pages">
          <Container style={containerStyle} component="main">
            <Card className="overflow-hidden">
              <div className="bg-primary">
                <div className="text-primary text-center p-4">
                  <h5 className="text-white font-size-20">
                    <FiUserPlus size={30} /> <br />
                    Sign Up
                  </h5>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="p-2">
                  <FormikProvider value={formik} className="mt-2">
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="username"
                        className="mb-3"
                        id="username"
                        name="username"
                        label="username"
                        type="text"
                        {...getFieldProps("username")}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                      />
                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="email"
                        className="mb-3"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="phone"
                        className="mb-3"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="text"
                        {...getFieldProps("phone")}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                      <TextField
                        required
                        fullWidth
                        className="mb-3"
                        variant="outlined"
                        autoComplete="password"
                        name="password"
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
                      <InputLabel>Designation</InputLabel>
                      <Select
                        fullWidth
                        required
                        name="designation"
                        className="mb-3"
                        variant="outlined"
                        {...getFieldProps("designation")}
                        error={Boolean(
                          touched.designation && errors.designation
                        )}
                        helperText={touched.designation && errors.designation}
                      >
                        {dropdownValues.map((item) => (
                          <MenuItem key={item.key} value={item.value}>
                            {item.value}
                          </MenuItem>
                        ))}
                      </Select>
                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        className="mt-2"
                      >
                        {isSubmitting ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        Sign In
                      </Button>

                      <div className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <p className="mb-0">
                            By registering you agree to The App Ideas{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                      </div>
                    </Form>
                  </FormikProvider>
                </div>
              </CardContent>
            </Card>
            <div className="mt-3 text-center">
              <p>
                Already have an account ?
                <Link to="login" className="fw-medium ml-2 text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </Container>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default Registration;
