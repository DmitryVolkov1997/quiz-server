import styled from 'styled-components'
import AnswersList from './AnswersList/AnswersList'

const Wrapper = styled.div`
	padding: 2.5rem 3rem 0rem 3rem;
	text-align: center;
	color: var(--colors-text);
	background: #fff;
	border-radius: var(--radius);
	box-shadow: var(--shadow);
`

const NumberQuestions = styled.p`
	font-size: 2.2rem;
	margin-bottom: 1.5rem;
	font-weight: var(--fw-medium);
`

const Question = styled.p`
	margin-bottom: 1rem;
	font-size: 2.2rem;
	font-weight: var(--fw-regular);

	span > img {
		width: 100%;
	}

	@media (max-width: 768px) {
		span > img {
			width: 100%;
			height: auto;
		}
	}
`

const ActiveQuiz = ({ answers, question, quizLength, answerNumber, state }) => {
	return (
		<Wrapper>
			<NumberQuestions>
				Вопрос {answerNumber}/{quizLength}
			</NumberQuestions>
			{/* <Question>{question}</Question> */}
			<Question>
				<span dangerouslySetInnerHTML={{ __html: question }} />
			</Question>
			<AnswersList answers={answers} state={state} />
		</Wrapper>
	)
}

export default ActiveQuiz
