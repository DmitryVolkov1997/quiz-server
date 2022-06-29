import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > div {
    position: absolute;
    border: 4px solid #b8daff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

const Loader = () => {
    return (
      <Wrapper>
          <Spinner>
              <div></div>
              <div></div>
          </Spinner>
      </Wrapper>
    );
};

export default Loader;
