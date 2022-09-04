import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useTheme } from "../hooks/theme";
import { useGainsAndExpenses } from "../hooks/gainsAndExpenses";

import { ContentHeader } from "../components/layout/ContentHeader";
import { HistoryFinanceCard } from "../components/list/HistoryFinanceCard";
import { SelectInput } from "../components/SelectInput";
import { Loading } from "../components/layout/Loading";

import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import { ListOfMonths } from "../utils/ListOfMonths";

interface IData {
  id: number;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
  type: string;
}

export const List = () => {
  const { theme } = useTheme();

  const { gains, expenses } = useGainsAndExpenses();

  //state DB
  const [data, dataSet] = useState<IData[]>([]);

  // state meses do ano
  const [monthSelected, monthSelectedSet] = useState<number>(new Date().getMonth() + 1);

  // state anos
  const [yearSelected, yearSelectedSet] = useState<number>(new Date().getFullYear());

  // state of buttons
  const [filterButtonSelected, filterButtonSelectedSet] = useState<string[]>(["recorrente", "eventual"]);

  // pega o parametro da rota do navegador && on dados do BD
  const { type } = useParams();
  
  const paramsRoutes = useMemo(() => {
    return type === "entry-balance" ? { title: "Entradas", lineColor: "#4e41f0", date: gains } : { title: "Saídas", lineColor: "darkorange", date: expenses };
  }, [type, expenses, gains]);

  // filtra somente os anos que existem no db assim fica dinamica o select
  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    paramsRoutes.date.forEach((item: { date: string | number | Date }) => {
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
  }, [paramsRoutes]);

  // func para filtro nos botoes
  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = filterButtonSelected.findIndex((item) => item === frequency);

    if (alreadySelected >= 0) {
      const filtered = filterButtonSelected.filter((item) => item !== frequency);
      filterButtonSelectedSet(filtered);
    } else {
      filterButtonSelectedSet((previous) => [...previous, frequency]);
    }
  };

  useEffect(() => {
    const filteredDate = paramsRoutes.date
      .filter((item: { date: string | number | Date; frequency: string }) => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return month === monthSelected && year === yearSelected && filterButtonSelected.includes(item.frequency);
      })
      .map((item: { id: any; description: any; amount: any; frequency: string; date: string; type: string }) => {
        return {
          id: item.id,
          description: item.description,
          amountFormatted: formatCurrency(Number(item.amount)),
          frequency: item.frequency,
          dateFormatted: formatDate(item.date),
          type: item.type,
          tagColor:
            item.frequency === "recorrente" && theme.title === "dark"
              ? theme.colors.success
              : item.frequency === "recorrente" && theme.title === "dark"
              ? theme.colors.warning
              : item.frequency !== "recorrente" && theme.title !== "dark"
              ? theme.colors.success
              : theme.colors.warning,
        };
      });
    dataSet(filteredDate);
  }, [paramsRoutes, yearSelected, monthSelected, filterButtonSelected, theme]);

  return (
    <>
      {gains.length === 0 && expenses.length === 0 ? (
        <Loading />
      ) : (
        <>
          <ContentHeader title={paramsRoutes.title} lineColor={paramsRoutes.lineColor}>
            <SelectInput options={ListOfMonths} onChange={(event) => monthSelectedSet(Number(event.target.value))} defaulValue={monthSelected} />
            <SelectInput options={years} onChange={(event) => yearSelectedSet(Number(event.target.value))} defaulValue={yearSelected} />
          </ContentHeader>
          <Filters>
            <button type="button" className={`tag-filter tag-filter-recurrent ${filterButtonSelected.includes("recorrente") && "tag-active"}`} onClick={() => handleFrequencyClick("recorrente")}>
              Recorrentes
            </button>
            <button type="button" className={`tag-filter tag-filter-eventual ${filterButtonSelected.includes("eventual") && "tag-active"}`} onClick={() => handleFrequencyClick("eventual")}>
              Eventuais
            </button>
          </Filters>
          <Content>
            {data.map((item) => (
              <HistoryFinanceCard key={item.id} id={item.id} tagColor={item.tagColor} title={item.description} subtitle={item.dateFormatted} amount={item.amountFormatted} type={item.type} />
            ))}
          </Content>
        </>
      )}
    </>
  );
};

const Filters = styled.header`
  display: flex;
  justify-content: center;
  gap: 20px;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 30px;
    transition: all 0.3s;
    opacity: 0.4;

    :hover {
      opacity: 0.7;
    }

    ::after {
      content: "";
      display: block;
      width: 55px;
      margin: 0 auto;
      border-radius: 2px;
    }
  }

  .tag-filter-recurrent::after {
    border-bottom: 10px solid ${(props) => props.theme.colors.success};
  }

  .tag-filter-eventual::after {
    border-bottom: 10px solid ${(props) => props.theme.colors.warning};
  }

  .tag-active {
    opacity: 1;
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
