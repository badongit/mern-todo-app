import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/authSlice';
import postReducer from 'features/Todo/todoSlice';

const rootReducer = {
    auth: authReducer,
    posts: postReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;