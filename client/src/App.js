import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from 'features/Auth';
import Todo from 'features/Todo';
import { useDispatch } from 'react-redux';
import { getUser } from 'features/Auth/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    const loadUser = async () => {
      await dispatch(getUser());
    };

    loadUser();
  }, [dispatch]);

  return (
    <div className="app">
        <Router>
          <Switch>
            <Redirect exact from='/' to='/login' />

            <Route path='/login' component={Auth} />
            <Route path='/register' component={Auth} />

            <Route path='/posts' component={Todo} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;
