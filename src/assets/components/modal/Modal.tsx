import styled from "styled-components";

import { MdClose } from "react-icons/md";

interface IModalProps {
  handleModal(): void;
  children: React.ReactNode;
  title: string;
  modo?: boolean;
  editText?: string;
}

export const Modal: React.FC<IModalProps> = ({ handleModal, children, title, modo, editText }) => {
  return (
    <section>
      <Overlay onClick={() => handleModal()}></Overlay>
      <Container>
        <ToggleMenu>
          {modo ? (
            <h1>
              {title}: <strong>{editText}</strong>
            </h1>
          ) : (
            <h1>{title}</h1>
          )}
          <div>
            <MdClose onClick={() => handleModal()} />
          </div>
        </ToggleMenu>
        {children}
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
  z-index: 50;
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
