import React, { useState } from "react";
import styled from "styled-components";

import { useAuth } from "../hooks/auth";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

import logoSvg from "../svg/logo.svg";

export const SignIn: React.FC = () => {
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
        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
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
