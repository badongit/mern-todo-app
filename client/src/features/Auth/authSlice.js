import authApi from "api/authApi";
import { LOCAL_STORAGE_TOKEN_NAME } from "constants/global";
import setAuthToken from "utils/setAuthToken";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUser = createAsyncThunk('auth/getUser', async (params, thunkAPI) => {
    const token = localStorage[LOCAL_STORAGE_TOKEN_NAME];

    if(token)
        setAuthToken(token);

    const authData = await authApi.confirm();
    
    if(authData.success) {
        thunkAPI.dispatch(authToken({user: authData.user, isAuthenticated: true,}));
    } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        thunkAPI.dispatch(authToken({user: null, isAuthenticated: false,}));
    }

    return authData;        
} )

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state = {
                authLoading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        },

        authToken: (state, action) => {
            const newAuthStatus = {
                ...state,
                ...action.payload
            };

            return newAuthStatus;
        },

        logout:  (state, action) => {
            state = {
                authLoading: false,
                isAuthenticated: false,
                user: null,
            }

            return state;
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.authLoading = true;
        },
        [getUser.rejected]: (state) => {
            state.authLoading = false;
            state.isAuthenticated = false;
        },
        [getUser.fulfilled]: (state) => {
            state.authLoading = false;
        }
    }
})

const { reducer, actions } = authSlice;

export const { login, authToken, logout } = actions;
export default reducer;

