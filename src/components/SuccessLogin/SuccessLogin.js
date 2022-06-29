import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {IoArrowBack} from 'react-icons/io5'
import {useNavigate} from 'react-router-dom'

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  padding-top: 10rem;
  margin: 0;
`

const GroupTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-style: italic;
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
  font-style: italic;
`
const ButtonBack = styled.button`
  font-family: var(--family);
  font-size: var(--fs-sm);
  padding: 0 1rem;
  line-height: 3.4rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #fff;
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .75rem;
`

const SuccessLogin = e => {
    const navigate = useNavigate()

    return (
      <Wrapper>
          <GroupTitle>
              <Title>Отлично</Title>
              <Title>Вы успешно вошли в систему!</Title>
              <ButtonBack onClick={() => navigate("/", {replace: true})}>
                  <IoArrowBack/>
                  Back
              </ButtonBack>
          </GroupTitle>
          <Link>Перейти в список тестов</Link>
      </Wrapper>
    )
}

export default SuccessLogin
