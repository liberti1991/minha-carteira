import React, { useState, useMemo } from "react";
import styled from "styled-components";

import { ContentHeader } from "../components/ContentHeader";
import { SelectInput } from "../components/SelectInput";
import { WalletBox } from "../components/WalletBox";
import { MessageBox } from "../components/MessageBox";
import { GraficOne } from "../components/GraficOne";
import { GraficTwo } from "../components/GraficTwo";

import { gains } from "../repositories/gains";
import { expenses } from "../repositories/expenses";

import { ListOfMonths } from "../utils/ListOfMonths";

import happySvg from "../svg/happy.svg";
import sadSvg from "../svg/sad.svg";
import grinningSvg from "../svg/grinning.svg";

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

  // func total de entradas
  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) total += Number(item.amount);
    });

    return total;
  }, [monthSelected, yearSelected]);

  // func total de saidas
  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) total += Number(item.amount);
    });

    return total;
  }, [monthSelected, yearSelected]);

  //func balanço
  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que Triste!",
        description: "Neste mês, você gastou mais do que deveria.",
        footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadSvg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês, você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado. no próximo tente poupar o seu dinheiro.",
        icon: grinningSvg,
      };
    } else {
      return {
        title: "Muito Bem",
        description: "Sua Carteira está positiva!",
        footerText: "continue assim. considere investir o seu saldo.",
        icon: happySvg,
      };
    }
  }, [totalBalance]);

  // func para ver as porcentagens de gastos e recebidos
  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;
    const PercentGains = (totalGains / total) * 100;
    const PercentExpenses = (totalExpenses / total) * 100;

    const percentage = [
      {
        id: 1,
        name: "Entradas",
        value: totalGains,
        percent: Number(PercentGains.toFixed(1)),
        color: "#f7931b",
      },
      {
        id: 2,
        name: "Saídas",
        value: totalExpenses,
        percent: Number(PercentExpenses.toFixed(1)),
        color: "#e44c4e",
      },
    ];

    return percentage;
  }, [totalGains, totalExpenses]);

  //func para second grafic
  const graficTwo = useMemo(() => {
    return ListOfMonths.map((item) => {
      let amountEntry = 0;
      gains.forEach((gain) => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === item.id && gainYear === yearSelected) {
          amountEntry += Number(gain.amount);
        }
      });

      let amountOutput = 0;
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === item.id && expenseYear === yearSelected) {
          amountOutput += Number(expense.amount);
        }
      });

      return {
        monthNumber: item.id,
        month: item.label.substring(0, 3),
        amountEntry,
        amountOutput,
      };
    });

    // retornar essa função quando tiver dados verdadeiros
    // .filter((item) => {
    //   const currentMonth = new Date().getMonth();
    //   const currentYear = new Date().getFullYear();
    //   return (yearSelected === currentYear && item.monthNumber <= currentMonth) || yearSelected < currentYear;
    // });
  }, [yearSelected]);

  return (
    <>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput options={ListOfMonths} onChange={(event) => monthSelectedSet(Number(event.target.value))} defaulValue={monthSelected} />
        <SelectInput options={years} onChange={(event) => yearSelectedSet(Number(event.target.value))} defaulValue={yearSelected} />
      </ContentHeader>
      <SectionWallet>
        <WalletBox amount={totalBalance} title="Saldo" footerLabel="Atualizado com base nas entradas e saídas" icon="dollar" color="#4e41f0" />
        <WalletBox amount={totalGains} title="Entradas" footerLabel="Atualizado com base nas entradas e saídas" icon="arromUp" color="#f7931b" />
        <WalletBox amount={totalExpenses} title="Saídas" footerLabel="Atualizado com base nas entradas e saídas" icon="arromDown" color="#e44c4e" />
      </SectionWallet>
      <SectionBox>
        <MessageBox title={message.title} description={message.description} footerText={message.footerText} icon={message.icon} />
        <GraficOne relationExpensesVersusGains={relationExpensesVersusGains} />
      </SectionBox>
      <SectionGraficTwo>
        <GraficTwo data={graficTwo} lineColorAmountEntry="#f7931b" lineColorAmountOutput="#e44c4e" />
      </SectionGraficTwo>
    </>
  );
};

const SectionWallet = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const SectionBox = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
`;

const SectionGraficTwo = styled.section``;
