import styled from "styled-components";

import { BsTrash } from "react-icons/bs";
import { Button } from "../Button";
import { api } from "../../repositories/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth";

interface IRemoveProps {
  id: number;
  title: string;
  amount: string;
  type: string;
}

export const Remove: React.FC<IRemoveProps> = ({ title, amount, id, type }) => {
  const { idUser } = useAuth();
  const delet = () => {
    let typeFormatted = "";
    if (type === "entrada") {
      typeFormatted = "gains";
    } else {
      typeFormatted = "expenses";
    }

    api
      .delete(`${typeFormatted}/${id}`, {
        params: {
          idUser: idUser,
        },
      })
      .then((res) => {
        if (res) toast.success("Deletado com sucesso!");
      })
      .catch((err) => {
        if (err) toast.warn("Erro no servidor, tente novamente!");
      });
  };

  return (
    <Container>
      <BsTrash />
      <p>Deseja exluir esse item!</p>
      <p>
        <strong>{title} </strong>
        com o valor de
        <strong> {amount}</strong>
      </p>
      <Button onClick={delet}>Excluir</Button>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  > svg {
    cursor: default;
    width: 50px;
    height: 50px;
  }

  > p {
    color: ${(props) => props.theme.colors.white};
    text-align: center;
  }
`;
