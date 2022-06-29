import styled from "styled-components"
import {useDispatch, useSelector} from 'react-redux';
import {setActiveAdminPassword, setShowActiveAdmin} from '../../store/quizSlice/quizSlice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-grow: 1;
  background-color: #2C2C2C;
`
const ModalWindow = styled.div`
  max-width: 40rem;
  width: 100%;
  height: auto;
  padding: 2rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #FFFFFF;
  border-radius: var(--radius);
`
const Input = styled.input`
  font-family: var(--family);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  display: block;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 0.25rem;
  padding: 1rem;
  width: 100%;
  transition: all 300ms ease-in-out;
  margin-top: 2.5rem;
  font-size: 1.4rem;

  &:focus {
    border-color: rgb(49, 130, 206);
    box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
  }
`

const Title = styled.h3`
  font-weight: var(--fw-bold);
`

const Button = styled.button`
  background-color: rgb(43, 108, 176);
  color: #fff;
  cursor: pointer;
  padding: 1.2rem;
  border-radius: .6rem;
  font-family: var(--family);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  width: 100%;
  margin-top: 2rem;

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
`

const ActiveAdmin = () => {
    const dispatch = useDispatch();
    const {activeAdminPassword} = useSelector(state => state.quiz)

    const showAdminPanel = () => {
        if(activeAdminPassword === 'kstu2022') {
            dispatch(setShowActiveAdmin())
        }
    }

    return (
      <Wrapper>
          <ModalWindow>
              <Title>Вам необходимо войти в систему</Title>
              <Input placeholder="Пароль"
                     onChange={(e) => dispatch(setActiveAdminPassword({password: e.target.value}))}/>
              <Button onClick={showAdminPanel}>Войти</Button>
          </ModalWindow>
      </Wrapper>
    );
};

export default ActiveAdmin;
