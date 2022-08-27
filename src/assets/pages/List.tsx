import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ContentHeader } from "../components/ContentHeader";
import { HistoryFinanceCard } from "../components/HistoryFinanceCard";
import { SelectInput } from "../components/SelectInput";

import { gains } from "../repositories/gains";
import { expenses } from "../repositories/expenses";

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
}

export const List = () => {
  //state DB
  const [data, dataSet] = useState<IData[]>([]);
  // state meses do ano
  const [monthSelected, monthSelectedSet] = useState<string>(String(new Date().getMonth() + 1));
  // state anos
  const [yearSelected, yearSelectedSet] = useState<string>(String(new Date().getFullYear()));
  // state of buttons
  const [filterButtonSelected, filterButtonSelectedSet] = useState<string[]>(["recorrente", "eventual"]);

  // pega o parametro da rota do navegador
  const { type } = useParams();

  const paramsRoutes = useMemo(() => {
    return type === "entry-balance" ? { title: "Entradas", lineColor: "#f7931b", date: gains } : { title: "Saídas", lineColor: "#e44c4e", date: expenses };
  }, [type]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    paramsRoutes.date.forEach((item) => {
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
      .filter((item) => {
        const date = new Date(item.date);
        const month = String(date.getMonth() + 1);
        const year = String(date.getFullYear());
        return month === monthSelected && year === yearSelected && filterButtonSelected.includes(item.frequency);
      })
      .map((item) => {
        return {
          id: item.id,
          description: item.description,
          amountFormatted: formatCurrency(Number(item.amount)),
          frequency: item.frequency,
          dateFormatted: formatDate(item.date),
          tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
        };
      });
    dataSet(filteredDate);
  }, [paramsRoutes, yearSelected, monthSelected, filterButtonSelected]);

  return (
    <div>
      <ContentHeader title={paramsRoutes.title} lineColor={paramsRoutes.lineColor}>
        <SelectInput options={ListOfMonths} onChange={(event) => monthSelectedSet(event.target.value)} defaulValue={monthSelected} />
        <SelectInput options={years} onChange={(event) => yearSelectedSet(event.target.value)} defaulValue={yearSelected} />
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
          <HistoryFinanceCard key={item.id} tagColor={item.tagColor} title={item.description} subtitle={item.dateFormatted} amount={item.amountFormatted} />
        ))}
      </Content>
    </div>
  );
};

const Filters = styled.div`
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
