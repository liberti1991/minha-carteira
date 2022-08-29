import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type IbuttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<IbuttonProps> = ({ children, ...rest }) => <Containerbutton {...rest}>{children}</Containerbutton>;

const Containerbutton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.warning};
  transition: all 0.3s;

  :hover {
    opacity: 0.7;
  }
`;
