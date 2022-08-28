import React from "react";
import styled from "styled-components";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { formatCurrency } from "../utils/formatCurrency";

interface IGraficTwo {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

export const GraficTwo: React.FC<IGraficTwo> = ({ data, lineColorAmountEntry, lineColorAmountOutput }) => (
  <Container>
    <header>
      <h2>Histórico de saldo</h2>

      <LegendContainer>
        <Legend color={lineColorAmountEntry}>
          <div></div>
          <p>Entradas</p>
        </Legend>

        <Legend color={lineColorAmountOutput}>
          <div></div>
          <p>Saídas</p>
        </Legend>
      </LegendContainer>
    </header>
    <div>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray=" 3 3 " stroke="#cecece" />
          <XAxis dataKey="month" stroke="#cecece" />
          <Tooltip formatter={(value: number) => formatCurrency(value)}/>
          <Line type="monotone" dataKey="amountEntry" name="Entradas" stroke={lineColorAmountEntry} strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="amountOutput" name="Saídas" stroke={lineColorAmountOutput} strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Container>
);

const Container = styled.section`
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 30px 20px;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h2 {
      margin-bottom: 20px;
    }
  }

  > div {
    height: 240px;
  }
`;

const LegendContainer = styled.ul`
  display: flex;
  gap: 20px;
`;

const Legend = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  font-size: 16px;

  div {
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.color};
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
  }
`;
