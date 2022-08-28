import React from "react";
import styled from "styled-components";

interface IContentHeaderProps {
  title: string;
  lineColor: string;
  children: React.ReactNode;
}

interface IContainerProps {
  lineColor: string;
}

export const ContentHeader: React.FC<IContentHeaderProps> = ({ title, lineColor, children }) => (
  <Container lineColor={lineColor}>
    <h1>{title}</h1>
    <Controllers>{children}</Controllers>
  </Container>
);

const Container = styled.div<IContainerProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;

  > h1 {
    color: ${(props) => props.theme.colors.white};

    ::after {
      content: "";
      display: block;
      width: 55px;
      border-bottom: 10px solid ${(props) => props.lineColor};
      border-radius: 2px;
    }
  }
`;

const Controllers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
