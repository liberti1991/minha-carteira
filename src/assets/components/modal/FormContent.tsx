import styled from "styled-components";
import { useForm } from "react-hook-form";
import { uniqueId } from "lodash";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/auth";

import { api } from "../../repositories/api";

import { Button } from "../Button";

import { ListFrequency } from "../../utils/ListFrequency";
import { ListType } from "../../utils/ListType";

interface IFormDate {
  id?: number;
  idUser?: number;
  description?: string;
  amount?: string | number;
  date?: string;
  type?: string;
  frequency?: string;
}

interface IModoProps {
  typeMode?: string;
}

export const FormContent: React.FC<IModoProps> = ({ typeMode }) => {
  const { idUser } = useAuth();

  const { register, handleSubmit } = useForm({
    // defaultValues: {
    //   description: "",
    //   amount: 0,
    //   date: 'newDateGains1',
    //   type:  ,
    //   frequency: 'newDateGains1',
    // },
  });

  const addNewGainsOrExpenses = (data: IFormDate) => {
    if (typeMode === "create" && data.type === "entrada") {
      let newGains: IFormDate = {
        id: Number(uniqueId()),
        idUser: idUser,
        description: data.description,
        amount: data.amount,
        type: data.type,
        frequency: data.frequency,
        date: data.date,
      };

      api
        .post("gains", newGains, {
          params: {
            idUser: idUser,
          },
        })
        .then((res) => {
          if (res) toast.success("Saldo creditado com sucesso!");
        })
        .catch((err) => {
          if (err) toast.warn("Erro no servidor, tente novamente!");
        });
    } else if (typeMode === "create" && data.type === "saida") {
      let newGains: IFormDate = {
        id: Number(uniqueId()),
        idUser: idUser,
        description: data.description,
        amount: data.amount,
        type: data.type,
        frequency: data.frequency,
        date: data.date,
      };

      api
        .post("expenses", newGains, {
          params: {
            idUser: idUser,
          },
        })
        .then((res) => {
          if (res) toast.success("Saldo creditado com sucesso!");
        })
        .catch((err) => {
          if (err) toast.warning("Erro no servidor, tente novamente!");
        });
    }
    // window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(addNewGainsOrExpenses)}>
      <ContainerInput>
        <label htmlFor="description">Descrição:</label>
        <input id="description" type="text" placeholder="Ex: Salário || Compra do mês" maxLength={100} required {...register("description")} />
      </ContainerInput>
      <AmountAndDate>
        <ContainerInput>
          <label htmlFor="amount">Valor:</label>
          <input id="amount" type="number" step="any" maxLength={10} placeholder="R$ 2.700,00" required {...register("amount")} />
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
