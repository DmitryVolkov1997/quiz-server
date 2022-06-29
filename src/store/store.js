import {configureStore} from "@reduxjs/toolkit";
import quizReducer from "./quizSlice/quizSlice";

export const store = configureStore({
    reducer: {
        quiz: quizReducer
    }
});

