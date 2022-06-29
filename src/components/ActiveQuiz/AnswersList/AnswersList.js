import styled from "styled-components";
import AnswerItem from "./AnswerItem/AnswerItem";

const List = styled.ul`
  padding: 2rem 0;
`;

const AnswersList = ({answers, state}) => {
    return (
      <List>
          {
              answers.map((answer, i) => (
                <AnswerItem key={i} {...answer} state={state ? state[answer.id] : null}/>
              ))
          }
      </List>
    );
};

export default AnswersList;
