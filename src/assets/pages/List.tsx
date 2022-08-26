import React from "react";
import styled from "styled-components";
import { ContentHeader } from "../components/ContentHeader";
import { HistoryFinanceCard } from "../components/HistoryFinanceCard";
import { SelectInput } from "../components/SelectInput";

export const List: React.FC = () => {
  const months = [
    { id: 0, value: "1", label: "Janeiro" },
    { id: 1, value: "2", label: "Fevereiro" },
    { id: 2, value: "3", label: "Março" },
    { id: 3, value: "4", label: "Abril" },
    { id: 4, value: "5", label: "Maio" },
    { id: 5, value: "6", label: "Junho" },
    { id: 6, value: "7", label: "Julho" },
    { id: 7, value: "8", label: "Agosto" },
    { id: 8, value: "9", label: "Setembro" },
    { id: 9, value: "10", label: "Outubro" },
    { id: 10, value: "11", label: "Novembro" },
    { id: 11, value: "12", label: "Dezembro" },
  ];
  const years = [
    { id: 1, value: 2022, label: 2022 },
    { id: 2, value: 2023, label: 2023 },
    { id: 3, value: 2024, label: 2024 },
  ];
  return (
    <div>
      <ContentHeader title="Saídas" lineColor="#e44c4e">
        <SelectInput options={months} />
        <SelectInput options={years} />
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
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
        <HistoryFinanceCard tagColor="#e44c4e" title="Conta de Luz" subtitle="26/08/2022" amount="R$ 130,00" />
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
    border-bottom: 10px solid ${(props) => props.theme.colors.warning};
  }

  .tag-filter-eventual::after {
    border-bottom: 10px solid ${(props) => props.theme.colors.success};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
