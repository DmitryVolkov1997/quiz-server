import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: .3rem;

  &.invalid > label {
    color: #f01f30;
  }
`;

const CustomInput = styled.input`
  display: block;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 0 0 1rem;
  margin-bottom: ${props => props.mb};
  width: 100%;
  transition: all 300ms ease-in-out;

  &:focus {
    border-color: rgb(49, 130, 206);
    box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
  }

  &.invalid {
    color: #f01f30;
  }
`;

const Label = styled.label`
  margin-bottom: .4rem;
  padding: 0;
  display: block;
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
`;

const Span = styled.span`
  color: #f01f30;
  font-size: 1.2rem;
  font-weight: var(--fw-bold);
  margin-bottom: .6rem;
  display: inline-block;
`;

const isInValid = ({valid, touched, shouldValidate}) => {
    return !valid && shouldValidate && touched;
};

const Input = (props) => {
    const {type, label, value, onChange, errorMessage, onKeyDown, placeholder} =
      props;
    const inputType = type || "text";
    const cls = ["input"];
    const htmlFor = `${type}-${Math.random()}`;

    if (isInValid(props)) {
        cls.push("invalid");
    }

    return (
      <Wrapper className={cls.join(" ")}>
          <Label htmlFor={htmlFor}>{label}</Label>
          <CustomInput
            id={htmlFor}
            type={inputType}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
          />

          {isInValid(props) ? (
            <Span>{errorMessage || "Введите верное значение"}</Span>
          ) : null}
      </Wrapper>
    );
};

export default Input;
