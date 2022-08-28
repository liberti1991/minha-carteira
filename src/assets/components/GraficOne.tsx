import React from "react";
import styled from "styled-components";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

interface IrelationExpensesVersusGains {
  relationExpensesVersusGains: {
    id: number;
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}
interface ILegendProps {
  color: string;
}

export const GraficOne: React.FC<IrelationExpensesVersusGains> = ({ relationExpensesVersusGains }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {relationExpensesVersusGains.map((item) => (
          <Legend key={item.id} color={item.color}>
            <p>{item.percent}%</p>
            <span>{item.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={relationExpensesVersusGains} dataKey="percent">
            {relationExpensesVersusGains.map((item) => (
              <Cell key={item.id} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

const Container = styled.section`
  height: 260px;
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
`;

const SideLeft = styled.aside`
  > h2 {
    margin-bottom: 20px;
  }
`;

const LegendContainer = styled.ul`
  height: 160px;
  padding-right: 15px;
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

const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  font-size: 16px;

  p {
    background-color: ${(props) => props.color};
    width: 45px;
    height: 45px;
    border-radius: 5px;
    line-height: 45px;
    text-align: center;
  }
`;

const SideRight = styled.main`
  width: 100%;
`;
