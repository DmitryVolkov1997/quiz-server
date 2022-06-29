import {createSlice} from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        results: {},
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        menu: false,
        isFinishedQuiz: false,
        loading: true,
        showModal: false,
        showActiveAdmin: true,
        activeAdminPassword: "",
    },
    reducers: {
        onAnswerClickHandler(state, {payload}) {
            if (state.answerState) {
                const key = Object.keys(state.answerState)[0];
                if (state.answerState[key] === "success") {
                    return;
                }
            }

            const question = state.quiz[state.activeQuestion];
            const results = state.results;

            // const isFinishedQuiz = () => {
            //     return state.quiz.length === state.activeQuestion + 1;
            // };

            if (question.rightAnswerId === payload.id) {
                if (!results[question.id]) {
                    results[question.id] = "success";
                }
                state.results = results;
                state.answerState = {[payload.id]: "success"};
                if (state.quiz.length === state.activeQuestion + 1) {
                    state.isFinishedQuiz = true;
                } else {
                    state.activeQuestion = state.activeQuestion + 1;
                    state.answerState = null;
                }
            } else {
                results[question.id] = "error";
                state.results = results;
                state.answerState = {[payload.id]: "error"};
            }
        },
        onRetryHandler(state) {
            state.activeQuestion = 0;
            state.answerState = null;
            state.isFinishedQuiz = false;
            state.results = {};
        },
        toggleMenuHandler(state, {payload}) {
            state.menu = !state.menu;
        },
        menuCloseHandler(state, {payload}) {
            state.menu = false;
        },
        setQuiz(state, {payload}) {
            state.quiz = payload.quiz;
        },
        setLoading(state, {payload}) {
            state.loading = payload;
        },
        setShowModal(state, {payload}) {
            state.showModal = true
        },
        setShowActiveAdmin(state, {payload}) {
            state.showActiveAdmin = false
        },
        setActiveAdminPassword(state, {payload}) {
            state.activeAdminPassword = payload.password
        }
    }
});

export const {
    onAnswerClickHandler,
    onRetryHandler,
    toggleMenuHandler,
    menuCloseHandler,
    setQuiz,
    setLoading,
    setShowModal,
    setShowActiveAdmin,
    setActiveAdminPassword
} = quizSlice.actions;
export default quizSlice.reducer;