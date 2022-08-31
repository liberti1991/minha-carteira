import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { ListFrequency } from "../utils/ListFrequency";
import { ListType } from "../utils/ListType";
import { Button } from "./Button";
import { Input } from "./Input";
import { SelectInput } from "./SelectInput";

interface IModalProps {
  handleModal(): void;
}

export const Modal: React.FC<IModalProps> = ({ handleModal }) => {
  return (
    <section>
      <Overlay onClick={() => handleModal()}></Overlay>
      <Container>
        <form>
          <ToggleMenu>
            <div>
              <MdClose onClick={() => handleModal()}/>
            </div>
          </ToggleMenu>
          <div>
            <label htmlFor="description">Descrição:</label>
            <Input id="description" type="text" maxLength={100} required />
          </div>
          <AmountAndDate>
            <div>
              <label htmlFor="amount">Valor:</label>
              <Input id="amount" type="number" maxLength={100} required />
            </div>
            <div>
              <label htmlFor="date">Data:</label>
              <Input id="date" type="date" required />
            </div>
          </AmountAndDate>
          <Selects>
            <SelectInput options={ListType} onChange={() => {}} />
            <SelectInput options={ListFrequency} onChange={() => {}} />
          </Selects>

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

  label {
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    font-weight: 500;
  }
`;

const ToggleMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background-color: #fb2222;
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

const AmountAndDate = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 0;
`;

const Selects = styled.div`
  display: flex;
  padding: 10px 0;
  gap: 15px;
`;
