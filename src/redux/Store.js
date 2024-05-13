import {combineReducers, configureStore} from '@reduxjs/toolkit';
import signupReducer from './reducer/Reducer';

const rootReducer=combineReducers({
    signupReducer:signupReducer
})

const store=configureStore({
    reducer:rootReducer
});

export default store;