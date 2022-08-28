import React from "react";
import styled from "styled-components";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

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
    <h2>Histórico de saldo</h2>
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray=" 3 3 " stroke="#cecece" />
        <XAxis dataKey="month" stroke="#cecece" />
        <Tooltip />
        <Line type="monotone" dataKey="amountEntry" name="Entradas" stroke={lineColorAmountEntry} strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="amountOutput" name="Saídas" stroke={lineColorAmountOutput} strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </Container>
);

const Container = styled.section`
  height: 340px;
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 30px 20px;
`;
