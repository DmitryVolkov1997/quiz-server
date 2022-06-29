import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { IoChevronForwardOutline, IoSchoolOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import axios from '../../axios/axios-quiz'
import Loader from '../UI/Loader/Loader'

import { useDispatch } from 'react-redux'
import { onRetryHandler } from '../../store/quizSlice/quizSlice'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-grow: 1;
	padding-top: 10rem;
	width: 100%;
	background: #fdfdfe;
	color: var(--colors-text);
`

const List = styled.ul``

const ListItem = styled.li`
	margin-bottom: 1rem;
	font-family: var(--family);
	font-size: 2rem;
	font-weight: var(--fw-medium);
	color: var(--colors-text);

	border-radius: var(--radius);
	border: 1px solid rgba(0, 0, 0, 0.125);
	padding: 2rem 1.6rem;
	display: flex;
	align-items: center;
	transition: box-shadow 0.22s ease-in-out, transform 0.22s ease-in-out;

	&:last-child {
		margin-bottom: 0;
	}

	&:hover {
		box-shadow: 8px 14px 21px rgba(163, 172, 181, 23%);
		transform: translateY(-3px);
	}
`

const ListLink = styled(NavLink)`
	position: relative;
	color: inherit;
	transition: color 0.22s ease-in;
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0 1.5rem 0 5rem;

	&:hover {
		color: #004085;
	}

	& > .goTo {
		position: absolute;
		right: 0;
	}

	& > .img {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		max-width: 7rem;
		font-size: 3.5rem;
	}
`

const Container = styled.div`
	max-width: 680px;
	margin: 0 auto;
	padding: 0 15px;
	width: 100%;
`

const Title = styled.h1`
	font-family: var(--family);
	font-weight: var(--fw-bold);
	font-size: var(--fs-md);
	color: var(--colors-text);
	margin: 0rem 0rem 2rem 0rem;
	text-align: center;
`

const Magistratura = () => {
	const [quizes, setQuizes] = useState([])
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	const renderQuizes = () => {
		return quizes.map(quiz => {
			if (quiz.category === 'Магистратура') {
				return (
					<ListItem key={quiz.id} onClick={() => dispatch(onRetryHandler())}>
						<ListLink to={'/quiz/' + quiz.id}>
							<IoSchoolOutline className={'img'} />
							{quiz.name}
							<IoChevronForwardOutline className={'goTo'} />
						</ListLink>
					</ListItem>
				)
			}
			return null
		})
	}

	useEffect(() => {
		try {
			const fetchData = async () => {
				const data = await axios.get('/quizes.json')
				const quizes = []

				Object.keys(data.data).forEach((key, i) => {
					quizes.push({
						id: key,
						name: `${
							data.data[key][0].titles ? data.data[key][0].titles : 'Тест'
						}`,
						category: data.data[key][0].category,
					})
				})
				setQuizes(quizes)
				setLoading(false)
			}
			fetchData().catch(console.error)
		} catch (e) {
			console.log(e)
		}
	}, [])

	return (
		<Wrapper>
			<Container>
				<Title>Список тестов</Title>
				<List>{loading ? <Loader /> : renderQuizes()}</List>
			</Container>
		</Wrapper>
	)
}

export default Magistratura
