import React, { useEffect, useState } from 'react';
import ProtectedRoute from 'components/routing/ProtectedRoute';
import Header from 'components/Header';
import './Todo.scss';
import Main from './componnents/Main';
import Detail from './componnents/Detail';
import { LOCAL_STORAGE_TOKEN_NAME } from 'constants/global';
import setAuthToken from 'utils/setAuthToken';
import { logout } from 'features/Auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { addPost, getAllPosts, resetPost } from './todoSlice';
import postApi from 'api/postApi';

function Todo() {
    const [isOpenHeader, setIsOpenHeader] = useState(true);
    const { postArr: posts } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();

    const toggleHeader = () => setIsOpenHeader(!isOpenHeader);

    const logOut = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken();

        dispatch(logout());
        dispatch(resetPost())
        
        history.push('/login');
    }

    const addTodoSubmit = async (values, actions) => {
        const todoData = await postApi.add(values);

        if(todoData.success) {
            const action = addPost(todoData.post);
            dispatch(action); 
            actions.resetForm();
        } 

        console.log(todoData.message);
    }

    useEffect(() => {
        const getPosts = async () => {
            await dispatch(getAllPosts());
        };

        getPosts();
    }, [dispatch])

    return (
        <div className="todo" >
            <Header display={isOpenHeader ? '' : 'none' } logOut={logOut} />
            <Main 
                onBarsClick={toggleHeader} 
                addTodoSubmit={addTodoSubmit} 
                posts={posts} 
            />
            <Switch>
                <Route exact path='/posts' component={Detail} />
                <Route path='/posts/:postId' component={Detail} />
            </Switch>

        </div>
    );
}

const TodoWithProtectedRoute = ProtectedRoute(Todo);

export default TodoWithProtectedRoute;