import React from "react";
import styled from "styled-components";

interface IToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

export const Toggle: React.FC<IToggleProps> = ({ labelLeft, labelRight, checked, onChange }) => (
  <Container>
    <ToggleLabel>{labelLeft}</ToggleLabel>
    <ToggleBtn>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span></span>
      </label>
    </ToggleBtn>
    <ToggleLabel>{labelRight}</ToggleLabel>
  </Container>
);

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleLabel = styled.span`
  color: ${(props) => props.theme.colors.white};
`;

const ToggleBtn = styled.div`
  position: relative;
  width: 50px;

  label {
    position: absolute;
    width: 100%;
    height: 21px;
    background-color: #28292c;
    border-radius: 50px;
    cursor: pointer;
  }

  input {
    position: absolute;
    display: none;
  }

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: 0.3s;
  }

  input:checked ~ span {
    background-color: #d8dbe0;
  }

  span::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: inset 3px -3px 0px 0px #d8dbe0;
    background-color: #28292c;
    transition: 0.3s;
  }

  input:checked ~ span::before {
    transform: translateX(25px);
    background-color: #28292c;
    box-shadow: none;
  }
`;
