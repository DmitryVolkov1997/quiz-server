import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { onAnswerClickHandler } from '../../../../store/quizSlice/quizSlice'

const ListItem = styled.li`
	font-family: var(--family);
	font-size: var(--fs-sm);
	font-weight: var(--fw-medium);
	border: 2px solid rgba(66, 153, 225, 0.6);
	border-radius: var(--radius);
	padding: 1.5rem 1.5rem;
	margin: 0rem 0rem 1.5rem 0rem;
	cursor: pointer;

	@media (max-width: 768px) {
		span > img {
			width: 100%;
			height: auto;
		}
	}

	&.success {
		border: 1px solid #c3e6cb;
		color: #155724;
		background: #d4edda;
	}

	&.error {
		border: 2px solid #fd7f7f;
		color: #721c24;
		background: #f8d7da;
	}
`

const AnswerItem = ({ text, id, state }) => {
	const dispatch = useDispatch()
	const cls = []

	if (state) {
		cls.push(state)
	}

	return (
		<ListItem
			className={cls.join(' ')}
			onClick={() => dispatch(onAnswerClickHandler({ id }))}
		>
			<span dangerouslySetInnerHTML={{ __html: text }} />
		</ListItem>
	)
}

export default AnswerItem
