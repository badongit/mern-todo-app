import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Image from 'constants/images';
import './Auth.scss';
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./authSlice";
import authApi from "api/authApi";
import { LOCAL_STORAGE_TOKEN_NAME } from "constants/global";
import Loading from "components/Loading";

function Auth() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authLoading, isAuthenticated } = useSelector(state => state.auth);
  
  const handleLoginSubmit = async (values, actions) => {
    try {
      const formSubmit = {...values};

      const data = await authApi.login(formSubmit);

      if(data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, data.accessToken);

        await dispatch(getUser());

        history.push('/posts');
      } else  {
        console.log(data.message);
        actions.resetForm({
          values: {
            username: values.username,
            password: '',
          },
          errors: {
            username: data.message,
          },
          touched: {
            username: true,
          }
        })
      }

    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRegisterSubmit = async (values, actions) => {
    try {
      const { username, password } = values;

      const data = await authApi.register({ username, password });

      if(data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, data.accessToken);
        await dispatch(getUser());
        history.push('/posts');
      } else {
        console.log(data.message);
        actions.resetForm({
          values: {
            username: values.username,
            password: '',
            passwordConfirmation: '',
          },
          errors: {
            username: data.message,
          },
          touched: {
            username: true,
          }
        })
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  let body;

  if(authLoading) {
    body = (
      <Loading />
    )
  }
  else if(isAuthenticated) {
    return <Redirect to='/posts' />
  } else {
    body = (
      <Container fluid={true} >
        <div className="auth">
          <Row>
            <Col className="auth__background" md="6" lg="6">
              <img src={Image.BG_LOGIN} alt="background-login" />
            </Col>
            <Col xs="12" md="6" lg="6">
              <h1>TODO APP</h1>
              <div className="auth__form" >
                <Switch>
                  <Route path="/login" render={ props => <LoginForm {...props} onSubmit={handleLoginSubmit} /> } />
                  <Route path="/register" render={ props => <RegisterForm {...props} onSubmit={handleRegisterSubmit} />} />
                </Switch>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      )
  }

  return body;
}

export default Auth;
