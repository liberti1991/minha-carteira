import React, { useState, useMemo } from "react";
import styled from "styled-components";

import { ContentHeader } from "../components/ContentHeader";
import { SelectInput } from "../components/SelectInput";
import { WalletBox } from "../components/WalletBox";

import { gains } from "../repositories/gains";
import { expenses } from "../repositories/expenses";

import { ListOfMonths } from "../utils/ListOfMonths";

interface IData {
  id: number;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

export const Dashboard: React.FC = () => {
  // state meses do ano
  const [monthSelected, monthSelectedSet] = useState<number>(new Date().getMonth() + 1);
  // state anos
  const [yearSelected, yearSelectedSet] = useState<number>(new Date().getFullYear());

  // filtra somente os anos que existem no db assim fica dinamica o select
  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });
    return uniqueYears.map((item, id) => {
      return {
        id: id,
        value: item,
        label: item,
      };
    });
  }, []);
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput options={ListOfMonths} onChange={(event) => monthSelectedSet(Number(event.target.value))} defaulValue={monthSelected} />
        <SelectInput options={years} onChange={(event) => yearSelectedSet(Number(event.target.value))} defaulValue={yearSelected} />
      </ContentHeader>
      <SectionWallet>
        <WalletBox amount={150.0} title="Saldo" footerLabel="Atualizado com base nas entradas e saídas" icon="dollar" color="#4e41f0" />
        <WalletBox amount={5000.0} title="Entradas" footerLabel="Atualizado com base nas entradas e saídas" icon="arromUp" color="#f7931b" />
        <WalletBox amount={4850.0} title="Saídas" footerLabel="Atualizado com base nas entradas e saídas" icon="arromDown" color="#e44c4e" />
      </SectionWallet>
    </Container>
  );
};

const Container = styled.main``;

const SectionWallet = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;
