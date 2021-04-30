import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "custom-fields/InputField";
import { FormGroup, Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const { onSubmit } = props;

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .matches(
        /^[a-zA-Z]{1}[a-zA-Z0-9_]{7,19}$/,
        "Username minium 8 characters, maxium 20 characters and contain no special characters."
      ),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      ),
  });
  return (
    <div className="login-form">
      <h2>Login</h2>
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          const { values, errors, touched, isSubmitting } = formikProps;
          console.log(values, errors, touched);
          
          return (
            <Form>
              <FastField
                name="username"
                component={InputField}

                placeholder="Enter username ... "
                label="Username"
              />

              <FastField 
                name="password"
                component={InputField}

                type="password"
                placeholder="Enter password ... "
                label="Password"
              />
              
              <FormGroup className="form__button">
                <Button type="submit" color="primary" >
                  {isSubmitting && <Spinner size="sm" />}
                  Login
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
      <div className="form__redirect">
        Don't have an account ? 
        <Link to='/register' >
          <Button color="success" className="ml-2">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
