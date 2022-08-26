import React from "react";
import styled from "styled-components";

import logo from "../svg/logo.svg";
import { MdDashboard, MdArrowDownward,  MdExitToApp, MdArrowUpward } from "react-icons/md";

export const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <img src={logo} alt="Logo minha carteira" />
        <h4>Minha Carteira</h4>
      </Header>
      <Menu>
        <a href="/"><MdDashboard />Dashbord</a>
        <a href="/"><MdArrowUpward />Entradas</a>
        <a href="/"><MdArrowDownward />Saídas</a>
        <a href="/"><MdExitToApp />Sair</a>
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  grid-area: aside;
  background-color: ${(props) => props.theme.colors.secondary};
  padding-left: 30px;
  border-right: 1px solid ${(props) => props.theme.colors.gray};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;

  img {
    width: 40px;
    height: 40px;
  }

  h4 {
    color: ${(props) => props.theme.colors.white};
  }
`;

const Menu = styled.nav`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  a {
    color: ${(props) => props.theme.colors.info};
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;

    :hover {
      opacity: 0.7;
    }

    > svg {
      font-size: 20px;
    }
  }
`;
