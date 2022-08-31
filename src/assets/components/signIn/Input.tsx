import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

type IInputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<IInputProps> = ({ ...rest }) => <ContainerInput {...rest} />;

const ContainerInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin: 7px 0;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;
