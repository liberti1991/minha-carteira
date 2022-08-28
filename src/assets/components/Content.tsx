import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  grid-area: content;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  padding: 25px;
  height: calc(100vh - 70px);

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`;
