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

export const HistoryFinanceCard: React.FC<IHistoryFinanceCard> = ({ tagColor, title, subtitle, amount }) => {
  return (
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
};

const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};
  list-style: none;
  border-radius: 5px;
  padding: 10px 15px 10px 25px;
  position: relative;

  cursor: pointer;
  transition: all 0.3s;

  :hover {
    opacity: 0.7;
    transform: translateX(10px);
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
  }
`;
