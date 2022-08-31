import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { ListFrequency } from "../../utils/ListFrequency";
import { ListType } from "../../utils/ListType";

import { Button } from "../Button";

interface IFormDate {
  id?: number;
  description?: string;
  amount?: string | number;
  date?: string;
  type?: string;
  frequency?: string;
}

export const FormContent: React.FC = () => {
  const { register, handleSubmit } = useForm();

  function teste(data: IFormDate) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(teste)}>
      <ContainerInput>
        <label htmlFor="description">Descrição:</label>
        <input id="description" type="text" placeholder="Ex: Salário || Compra do mês" maxLength={100} required {...register("description")} />
      </ContainerInput>
      <AmountAndDate>
        <ContainerInput>
          <label htmlFor="amount">Valor:</label>
          <input id="amount" type="number" maxLength={10} placeholder="R$ 2.700,00" required {...register("amount")} />
        </ContainerInput>
        <ContainerInput>
          <label htmlFor="date">Data:</label>
          <input id="date" type="date" required {...register("date")} />
        </ContainerInput>
      </AmountAndDate>
      <ContainerSelect>
        <Selects>
          <label htmlFor="type">Fluxo:</label>
          <select id="type" {...register("type")}>
            {ListType.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Selects>
        <Selects>
          <label htmlFor="frequency">Tipo:</label>
          <select id="frequency" {...register("frequency")}>
            {ListFrequency.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Selects>
      </ContainerSelect>
      <Button>Salvar</Button>
    </form>
  );
};

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  > label {
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    font-weight: 500;
  }

  > input {
    width: 100%;
    padding: 6px 15px;
    border-radius: 5px;
  }
`;

const AmountAndDate = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
`;

const Selects = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 5px;

  > label {
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    font-weight: 500;
  }

  > select {
    padding: 5px 15px;
    border-radius: 5px;
  }
`;

const ContainerSelect = styled.div`
  display: flex;
  gap: 15px;
`;
