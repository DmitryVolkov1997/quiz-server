import styled from "styled-components";
import Select from "react-select";

export const CustomSelect = styled(Select).attrs({
    styles: {
        control: (provided) => ({
            ...provided,
            borderRadius: "var(--radius)",
            border: "1px solid rgb(226,232,240)",
            height: "45px",
            fontSize: "14px",
            fontWeight:"var(--fw-medium)",
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: "pointer",
        }),
    }
})`
`;