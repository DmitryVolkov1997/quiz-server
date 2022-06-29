import styled from 'styled-components'
import { Button } from '../UI/Button/Button'
import { IoClose, IoChevronDownSharp } from 'react-icons/io5'
import classes from './FinishedQuiz.module.scss'
import { onRetryHandler } from '../../store/quizSlice/quizSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
	padding: 2.5rem 3rem 2.5rem 3rem;
	color: var(--colors-text);
	background: #fff;
	border-radius: var(--radius);
	box-shadow: var(--shadow);
	font-family: var(--family);
	font-weight: var(--fw-medium);
	font-size: var(--fs-sm);
`

const List = styled.ul`
	text-align: left;
`

const ListItem = styled.li`
	position: relative;
	margin-bottom: 0.5rem;

	span > img {
		width: 100%;
	}
`

const Results = styled.p`
	font-size: var(--fs-sm);
	font-family: var(--family);
	font-weight: var(--fw-medium);
	color: rgb(25, 135, 84);
	margin-bottom: 2rem;
`

const ButtonGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
`

const Border = styled.div`
	border-top: 2px solid #dee2e6;
	text-align: left;
	padding-top: 2rem;
	margin-top: 2.5rem;
`

const ListLink = styled(Link)`
	color: #ffffff;
`

const FinishedQuiz = ({ results, quiz }) => {
	const dispatch = useDispatch()
	const successCount = Object.keys(results).reduce((total, key) => {
		if (results[key] === 'success') {
			total++
		}
		return total
	}, 0)

	return (
		<Wrapper>
			<List>
				{quiz.map((quizItem, i) => {
					return (
						<ListItem key={i}>
							<span>{i + 1}</span>.&nbsp;
							<span dangerouslySetInnerHTML={{ __html: quizItem.question }} />
							{results[quizItem.id] === 'success' ? (
								<IoChevronDownSharp className={classes.success} />
							) : (
								<IoClose className={classes.error} />
							)}
						</ListItem>
					)
				})}
			</List>
			<Border>
				<Results>
					Правильно {successCount} из {quiz.length}
				</Results>
				<ButtonGroup>
					<Button
						primary
						p={'.9rem 1.7rem .9rem 1.7rem'}
						onClick={() => dispatch(onRetryHandler())}
					>
						Повторить
					</Button>
					<Button
						success
						p={'.9rem 1.7rem .9rem 1.7rem'}
						onClick={() => dispatch(onRetryHandler())}
					>
						<ListLink to='/quiz-list'>Перейти в список тестов</ListLink>
					</Button>
				</ButtonGroup>
			</Border>
		</Wrapper>
	)
}

export default FinishedQuiz
