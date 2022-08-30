import React from "react";
import styled from "styled-components";

interface IHistoryFinanceCard {
  tagColor: string;
  title: string;
  subtitle: string;
  amount: string;
}

interface ITagProps {
  color: string;
}

export const HistoryFinanceCard: React.FC<IHistoryFinanceCard> = ({ tagColor, title, subtitle, amount }) => (
  <Container>
    <Tag color={tagColor}></Tag>
    <Card>
      <div>
        <span>{title}</span>
        <small>{subtitle}</small>
      </div>
      <h3>{amount}</h3>
    </Card>
  </Container>
);

const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 5px;
  padding: 10px 15px 10px 25px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  animation: animate6 0.5s ease;
  box-shadow: ${(props) => (props.theme.title === "dark" ? " 0 2px 10px #ffffff39;" : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)")};

  :hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  @keyframes animate6 {
    0% {
      transform: translateX(-100px);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
`;

const Tag = styled.div<ITagProps>`
  background-color: ${(props) => props.color};
  position: absolute;
  width: 10px;
  height: 65%;
  left: 5px;
`;

const Card = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;

    span {
      font-weight: bold;
      font-size: 18px;
    }
  }
`;
