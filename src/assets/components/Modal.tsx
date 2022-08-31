import styled from "styled-components";
import { useForm } from "react-hook-form";

import { ListFrequency } from "../utils/ListFrequency";
import { ListType } from "../utils/ListType";

import { Button } from "./Button";

import { MdClose } from "react-icons/md";

interface IModalProps {
  handleModal(): void;
}

interface IFormDate {
  id?: number;
  description?: string;
  amount?: number;
  date?: string;
  type?: string;
  frequency?: string;
}

export const Modal: React.FC<IModalProps> = ({ handleModal }) => {
  const { register, handleSubmit } = useForm();

  function teste(data: IFormDate) {
    console.log(data);
  }

  return (
    <section>
      <Overlay onClick={() => handleModal()}></Overlay>
      <Container>
        <ToggleMenu>
          <h1>Novos Valores </h1>
          <div>
            <MdClose onClick={() => handleModal()} />
          </div>
        </ToggleMenu>
        <form onSubmit={handleSubmit(teste)}>
          <ContainerInput>
            <label htmlFor="description">Descrição:</label>
            <input id="description" type="text" maxLength={100} required {...register("description")} />
          </ContainerInput>
          <AmountAndDate>
            <ContainerInput>
              <label htmlFor="amount">Valor:</label>
              <input id="amount" type="number" maxLength={100} required {...register("amount")} />
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
      </Container>
    </section>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Container = styled.section`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${(props) => (props.theme.title === "dark" ? " 0 2px 10px #ffffff39;" : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)")};
`;

const ToggleMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  > h1 {
    color: ${(props) => props.theme.colors.white};

    ::after {
      content: "";
      display: block;
      width: 55px;
      border-bottom: 10px solid ${(props) => props.theme.colors.warning};
      border-radius: 2px;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.warning};
    transition: all 0.3s;

    :hover {
      opacity: 0.7;
    }

    > svg {
      width: 25px;
      height: 25px;
    }
  }
`;

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
