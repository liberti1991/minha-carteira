import React from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";

import { formatCurrency } from "../../utils/formatCurrency";

interface IGraficthreeAndFourCard {
  title: string;
  date: {
    id: number;
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

interface ILegendProps {
  color: string;
}

export const GraficthreeAndFourCard: React.FC<IGraficthreeAndFourCard> = ({ title, date }) => (
  <Container>
    <SidLeft>
      <h2>{title}</h2>
      <ul>
        {date.map((item) => (
          <Legend key={item.id} color={item.color}>
            <p>{item.percent}%</p>
            <span>{item.name}</span>
          </Legend>
        ))}
      </ul>
    </SidLeft>
    <SedRight>
      <ResponsiveContainer>
        <BarChart data={date}>
          <Bar dataKey="amount" name="Valor">
            {date.map((item) => (
              <Cell key={item.id} fill={item.color} />
            ))}
          </Bar>
          <Tooltip cursor={{ fill: "none" }} formatter={(value: number) => formatCurrency(value)} />
        </BarChart>
      </ResponsiveContainer>
    </SedRight>
  </Container>
);

const Container = styled.section`
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 30px 20px;
  height: 260px;
  display: flex;
  animation: graficOfBar 0.5s;
  box-shadow: ${(props) => (props.theme.title === "dark" ? " 0px 5px 10px 0px rgba(104, 103, 103, 0.344)" : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)")};

  @keyframes graficOfBar {
    0% {
      transform: translateX(100px);
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

const SidLeft = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;

  :nth-child(1) {
    margin-bottom: 10px;
  }

  p {
    background-color: ${(props) => props.color};
    color: ${(props) => props.theme.colors.universal};
    width: 45px;
    height: 45px;
    border-radius: 5px;
    line-height: 45px;
    text-align: center;
  }

  @media screen and (max-width: 900px) {
    > p {
      width: 35px;
      height: 35px;
      line-height: 35px;
      font-size: 12px;
    }

    > span {
      font-size: 14px;
    }
  }
`;

const SedRight = styled.main`
  display: flex;
  flex: 1;
  height: 200px;
`;
