import { useState } from "react";
import styled from "styled-components";

import { useAuth } from "../hooks/auth";

import { Button } from "../components/Button";
import { Input } from "../components/signIn/Input";
import { Modal } from "../components/modal/Modal";
import { NewUser } from "../components/modal/NewUser";

import logoSvg from "../svg/logo.svg";

import { AiOutlineUserAdd } from "react-icons/ai";

export const SignIn = () => {
  const [modal, modalSet] = useState(false);
  const handleModal = () => modalSet(!modal);

  const [email, emailSet] = useState<string>("");
  const [password, passwordSet] = useState<string>("");

  const { signIn } = useAuth();

  return (
    <Container>
      <Header>
        <img src={logoSvg} alt="Minha Carteira" />
        <h2>Minha Carteira</h2>
      </Header>
      <Form onSubmit={() => signIn(email, password)}>
        <h1>Entrar</h1>
        <Input type="email" placeholder="E-mail" onChange={(event) => emailSet(event.target.value)} required />
        <Input type="password" placeholder="Senha" onChange={(event) => passwordSet(event.target.value)} required />
        <ContainerNewUser onClick={() => modalSet(true)}>
          Criar um novo usuário
          <AiOutlineUserAdd />
        </ContainerNewUser>
        <Button type="submit">Acessar</Button>
      </Form>
      {modal && (
        <Modal handleModal={handleModal} title="Criar novo usuário">
          <NewUser handleModal={handleModal}/>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  > h2 {
    color: ${(props) => props.theme.colors.white};
  }

  > img {
    width: 40px;
    height: 40px;
  }
`;

const Form = styled.form`
  width: 300px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.tertiary};

  > h1 {
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 30px;

    ::after {
      content: "";
      display: block;
      width: 55px;
      border-radius: 2px;
      border-bottom: 10px solid ${(props) => props.theme.colors.warning};
    }
  }
`;

const ContainerNewUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 5px;
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  margin: 5px 0;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    opacity: 0.7;
  }

  > svg {
    width: 20px;
    height: 20px;
  }
`;
