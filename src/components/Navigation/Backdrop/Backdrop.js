import styled from "styled-components";
import {menuCloseHandler} from "../../../store/quizSlice/quizSlice";
import {useDispatch} from "react-redux";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  background: rgba(0, 0, 0, .7);
`;

const Backdrop = () => {
    const dispatch = useDispatch();

    return (
      <Wrapper onClick={() => dispatch(menuCloseHandler())}>
      </Wrapper>
    );
};

export default Backdrop;
