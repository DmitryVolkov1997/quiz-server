import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Wrapper = styled.div`
	position: relative;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	box-shadow: var(--shadow);
	padding: 1.5rem;
	border-radius: var(--radius);
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.5rem;
`

const GroupTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Title = styled.div`
	font-size: var(--fs-md);
	text-align: center;
	margin-bottom: 1rem;
`

const Link = styled(NavLink).attrs({
	to: '/quiz-list',
})`
	color: rgb(25, 135, 84);
	font-size: 2rem;
	margin-top: 1rem;
`

const SuccessRegister = e => {
	return (
		<Wrapper>
			<GroupTitle>
				<Title>Отлично</Title>
				<Title>Вы успешно зарегистрировались!</Title>
			</GroupTitle>
			<Link>Перейти в список тестов</Link>
		</Wrapper>
	)
}

export default SuccessRegister
