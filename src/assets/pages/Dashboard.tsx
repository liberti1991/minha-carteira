import React, { useState, useMemo } from "react";
import styled from "styled-components";

import { ContentHeader } from "../components/ContentHeader";
import { SelectInput } from "../components/SelectInput";
import { WalletBox } from "../components/WalletBox";
import { MessageBox } from "../components/MessageBox";
import { GraficOne } from "../components/GraficOne";
import { GraficTwo } from "../components/GraficTwo";
import { GraficthreeAndFourCard } from "../components/GraficthreeAndFourCard";

import { gains } from "../repositories/gains";
import { expenses } from "../repositories/expenses";

import { ListOfMonths } from "../utils/ListOfMonths";

import { useTheme } from "../hooks/theme";

import happySvg from "../svg/happy.svg";
import sadSvg from "../svg/sad.svg";
import grinningSvg from "../svg/grinning.svg";
import opsSvg from "../svg/ops.svg";

export const Dashboard: React.FC = () => {
  const { theme } = useTheme();
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

  // mensagens de erro no card
  const message = useMemo(() => {
    if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Ops!",
        description: "Neste mês, Não há registros de entradas ou saídas.",
        footerText: "Parece que você não fez nenhum registro no mês e ano selecionado.",
        icon: opsSvg,
      };
    } else if (totalBalance < 0) {
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
  }, [totalBalance, totalGains, totalExpenses]);

  // func para ver as porcentagens de gastos e recebidos
  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;
    const PercentGains = Number(((totalGains / total) * 100).toFixed(1));
    const PercentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const percentage = [
      {
        id: 1,
        name: "Entradas",
        value: totalGains,
        percent: PercentGains ? PercentGains : 0,
        color: "#2109d7",
      },
      {
        id: 2,
        name: "Saídas",
        value: totalExpenses,
        percent: PercentExpenses ? PercentExpenses : 0,
        color: "darkorange",
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

  // func para verificar gastos eventuais vs recorrentes
  const graficThreeExpenses = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const yaer = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && yaer === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") return (amountRecurrent += Number(expense.amount));

        if (expense.frequency === "eventual") return (amountEventual += Number(expense.amount));
      });

    const total = amountRecurrent + amountEventual;
    const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        id: 1,
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#2109d7",
      },
      {
        id: 2,
        name: "Eventuais",
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "darkorange",
      },
    ];
  }, [monthSelected, yearSelected]);

  // func para verificar Ganhos eventuais vs recorrentes
  const graficThreeGains = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const yaer = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && yaer === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === "recorrente") return (amountRecurrent += Number(gain.amount));

        if (gain.frequency === "eventual") return (amountEventual += Number(gain.amount));
      });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        id: 1,
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#2109d7",
      },
      {
        id: 2,
        name: "Eventuais",
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "darkorange",
      },
    ];
  }, [monthSelected, yearSelected]);

  const changeColor = useMemo(() => {
    if (theme.title === "dark") {
      if (totalBalance > 0) {
        return "#006400";
      } else {
        return "#D71709";
      }
    } else if (totalBalance < 0) {
      return "#fb2222";
    } else {
      return "#19ca19";
    }
  }, [totalBalance, theme]);

  return (
    <>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput options={ListOfMonths} onChange={(event) => monthSelectedSet(Number(event.target.value))} defaulValue={monthSelected} />
        <SelectInput options={years} onChange={(event) => yearSelectedSet(Number(event.target.value))} defaulValue={yearSelected} />
      </ContentHeader>
      <SectionWallet>
        <WalletBox amount={totalBalance} title="Saldo" footerLabel="Atualizado com base nas entradas e saídas" icon="dollar" color={changeColor} />
        <WalletBox amount={totalGains} title="Entradas" footerLabel="Atualizado com base nas entradas e saídas" icon="arromUp" color="#2109d7" />
        <WalletBox amount={totalExpenses} title="Saídas" footerLabel="Atualizado com base nas entradas e saídas" icon="arromDown" color="darkorange" />
      </SectionWallet>
      <SectionBox>
        <MessageBox title={message.title} description={message.description} footerText={message.footerText} icon={message.icon} />
        <GraficOne relationExpensesVersusGains={relationExpensesVersusGains} />
      </SectionBox>
      <SectionGraficTwo>
        <GraficTwo data={graficTwo} lineColorAmountEntry="#2109d7" lineColorAmountOutput="darkorange" />
      </SectionGraficTwo>
      <SectionGraficThree>
        <GraficthreeAndFourCard title="Entradas" date={graficThreeGains} />
        <GraficthreeAndFourCard title="Saídas" date={graficThreeExpenses} />
      </SectionGraficThree>
    </>
  );
};

const SectionWallet = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  animation: animate7 0.5s;

  @keyframes animate7 {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @media screen and (max-width: 648px) {
    grid-template-columns: 1fr;
  }
`;

const SectionBox = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const SectionGraficTwo = styled.section`
  margin-bottom: 20px;
`;

const SectionGraficThree = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 648px) {
    grid-template-columns: 1fr;
  }
`;
