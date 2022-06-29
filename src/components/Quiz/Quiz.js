import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import ActiveQuiz from "../ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../FinishedQuiz/FinishedQuiz";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "../../axios/axios-quiz";
import Loader from "../UI/Loader/Loader";
import {setQuiz} from "../../store/quizSlice/quizSlice";
import {setLoading} from "../../store/quizSlice/quizSlice";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding-top: 10rem;
  background-color: var(--colors-bg);
`;

const QuizTitle = styled.h1`
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  margin: 0rem 0rem 2rem 0rem;
`;

const Box = styled.div`
  max-width: 75rem;
  width: 100%;
  text-align: center;
`;

const Quiz = () => {
    const {
        quiz = [],
        activeQuestion,
        answerState,
        isFinishedQuiz,
        results,
        loading,
    } = useSelector(state => state.quiz);
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await axios.get(`/quizes/${id}.json`);
                const quiz = data.data;
                dispatch(setQuiz({quiz}));
                dispatch(setLoading(false));
            };
            fetchData()
            .catch(console.error);
        } catch (e) {
            console.log(e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get(`/quizes/${id}.json`);
    //         const data = response.data;
    //         dispatch(setQuiz({quiz: data}));
    //         dispatch(setLoading(false));
    //     };
    //     fetchData()
    //     .catch(console.error);
    // }, []);

    return (
      <Wrapper>
          <Box>
              <QuizTitle>Ответьте на все вопросы</QuizTitle>
              {
                  loading ? <Loader/> : isFinishedQuiz ? <FinishedQuiz results={results} quiz={quiz}/> :
                    <ActiveQuiz answers={quiz[activeQuestion].answers} question={quiz[activeQuestion].question}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1} state={answerState}/>

              }
          </Box>
      </Wrapper>
    );
};

export default Quiz;
