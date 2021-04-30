import postApi from "api/postApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async (params, thunkAPI) => {
    const postData = await postApi.getAll();

    return postData;
});

export const loadSelectedPost = createAsyncThunk('posts/loadSelectedPost', async (postId, thunkAPI) => {
    const postData = await postApi.getById(postId);

    return postData;
})

const initialState =  {
    postArr: [],
    selectedPost: null,
};

const todoSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.postArr.unshift(action.payload);
        },
        updatePost: (state, action) => {
            state.postArr = state.postArr.map(post => {
                const postUpdate = action.payload;

                if(post._id === postUpdate._id) 
                    return postUpdate;
                return post;
            });

            return state;
        },
        resetPost: (state) => {
            return initialState;
        },
        removePost: (state, action) => {
            const postRemove = action.payload;
            state.postArr = state.postArr.filter(post => post._id !== postRemove._id)

            return state;
        },
        updateSelectedPost: (state, action) => {
            state.selectedPost = action.payload;

            return state;
        },
        
    },
    extraReducers: {
        [getAllPosts.fulfilled]: (state, action) => {
            const posts = action.payload.posts;

            state.postArr = [
                ...posts,
            ]
            return state;
        },
        [loadSelectedPost.fulfilled]: (state,action) => {
            const post = action.payload.post;

            state.selectedPost = post;

            return state;
        }
    }
});

const { reducer, actions } = todoSlice;

export const { addPost, resetPost, updatePost, updateSelectedPost, removePost } = actions;
export default reducer;