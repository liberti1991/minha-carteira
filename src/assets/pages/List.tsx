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

export const List: React.FC = () => {
  //stat dados
  const [data, dataSet] = useState<IData[]>([]);

  const [monthSelected, monthSelectedSet] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, yearSelectedSet] = useState<string>(String(new Date().getFullYear()));

  // pega o parametro da rota do navegador
  const { type } = useParams();

  const paramsRoutes = useMemo(() => {
    return type === "entry-balance" ? { title: "Entradas", lineColor: "#f7931b" } : { title: "Saídas", lineColor: "#e44c4e" };
  }, [type]);

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach((item) => {
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
  }, [listData]);

  useEffect(() => {
    const filteresDate = listData
      .filter((item) => {
        const date = new Date(item.date);
        const month = String(date.getMonth() + 1);
        const year = String(date.getFullYear());
        return month === monthSelected && year === yearSelected;
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
    dataSet(filteresDate);
  }, [listData, yearSelected, monthSelected]);

  console.log(listData)
  return (
    <div>
      <ContentHeader title={paramsRoutes.title} lineColor={paramsRoutes.lineColor}>
        <SelectInput options={ListOfMonths} onChange={(event) => monthSelectedSet(event.target.value)} defaulValue={monthSelected} />
        <SelectInput options={years} onChange={(event) => yearSelectedSet(event.target.value)} defaulValue={yearSelected} />
      </ContentHeader>
      <Filters>
        <button type="button" className="tag-filter tag-filter-recurrent ">
          Recorretes
        </button>
        <button type="button" className="tag-filter tag-filter-eventual">
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
