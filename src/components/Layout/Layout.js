import styled from "styled-components";
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import {useDispatch, useSelector} from "react-redux";
import {toggleMenuHandler} from "../../store/quizSlice/quizSlice";
import Drawer from "../Navigation/Drawer/Drawer";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;


const Layout = ({children}) => {
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.quiz);

    const toggleMenu = () => {
        dispatch(toggleMenuHandler());
    };

    return (
      <Wrapper>
          <MenuToggle onToggle={toggleMenu} isOpen={menu}/>
          <Drawer isOpen={menu}/>
          <Main>
              {children}
          </Main>
      </Wrapper>
    );
};

export default Layout;
