import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "custom-fields/InputField";
import { FormGroup, Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const { onSubmit } = props;

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
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

    passwordConfirmation: Yup.string()
        .required("Password confirmation is required.")
        .oneOf([Yup.ref('password'), null], 'Password must match.'),
    
  });
  return (
    <div className="login-form">
      <h2>Register</h2>
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          const { isSubmitting } = formikProps;
          
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

                <FastField 
                    name="passwordConfirmation"
                    component={InputField}

                    type="password"
                    placeholder="Confirm password ... "
                    label="Confirm password"
                />
              
              <FormGroup className="form__button">
                <Button type="submit" color="success" >
                  {isSubmitting && <Spinner size="sm" />}
                  Register
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
      <div className="form__redirect">
        Already have an account ?
        <Link to='/login' >
          <Button color="primary" className="ml-2">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
