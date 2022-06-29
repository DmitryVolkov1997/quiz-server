import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  background-color: ${props => props.primary ? "rgb(0, 140, 201)" :
          props.success ? "#198754" : null
  };
  font-family: var(--family);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  color: #ffffff;
  text-align: center;
  border-radius: var(--radius);
  padding: ${props => props.p};
  margin: ${props => props.m};
  transition: box-shadow .22s ease-in-out;
  text-transform: uppercase;

  @media (max-width: 767px) {
    width: ${props => props.full ? "100%" : null};
  }


  &:disabled {
    background-color: #5c636a;
    border-color: #565e64;
    cursor: not-allowed;


    &:hover {
      color: #fff;
      background-color: #5c636a;
      border-color: #565e64;
    }

    &:active {
      box-shadow: 0 0 0 .25rem rgba(130, 138, 145, .5);
    }
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }

  &:hover {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }

  @media (max-width: 576px) {
    width: ${props => props.width};
  }
`;