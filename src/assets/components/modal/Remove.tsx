import styled from "styled-components";

import { BsTrash } from "react-icons/bs";
import { Button } from "../Button";

interface IRemoveProps {
  title: string;
  amount: string;
}

export const Remove: React.FC<IRemoveProps> = ({ title, amount }) => (
  <Container>
    <BsTrash />
    <p>Deseja exluir esse item!</p>
    <p>
      <strong>{title} </strong>
      com o valor de
      <strong> {amount}</strong>
    </p>
    <Button>Excluir</Button>
  </Container>
);

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
    color: ${(props) =>props.theme.colors.white}
  }
`;
