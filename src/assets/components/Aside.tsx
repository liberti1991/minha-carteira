import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/auth";

import { Toggle } from "./Toggle";

import logo from "../svg/logo.svg";

import { MdDashboard, MdArrowDownward, MdExitToApp, MdArrowUpward } from "react-icons/md";

interface IContainerProps {
  ToggleIsOpen: boolean;
}

interface IStatesProps {
  ToggleIsOpen: boolean;
  handleToggleMenu(): void;
  darkTheme: boolean;
  handleChangeTheme(): void;
}

export const Aside: React.FC<IStatesProps> = ({ ToggleIsOpen, handleChangeTheme, darkTheme, handleToggleMenu }) => {
  const { signOut } = useAuth();
  return (
    <Container ToggleIsOpen={ToggleIsOpen}>
      <Header>
        <img src={logo} alt="Logo minha carteira" />
        <h4>Minha Carteira</h4>
      </Header>
      <Menu>
        <NavLink to="/">
          <MdDashboard />
          Dashboard
        </NavLink>
        <NavLink to="/list/entry-balance">
          <MdArrowUpward />
          Entradas
        </NavLink>
        <NavLink to="/list/exit-balance">
          <MdArrowDownward />
          Saídas
        </NavLink>
        <p onClick={signOut}>
          <MdExitToApp />
          Sair
        </p>
      </Menu>
      <span>
        <Toggle labelLeft="Light" labelRight="Dark" checked={darkTheme} onChange={handleChangeTheme} />
      </span>
    </Container>
  );
};

const Container = styled.div<IContainerProps>`
  grid-area: aside;
  background-color: ${(props) => props.theme.colors.secondary};
  padding-left: 30px;
  border-right: 1px solid ${(props) => props.theme.colors.gray};
  position: relative;

  >span {
    display: none;
  
  }

  @media screen and (max-width: 648px) {
    position: absolute;
    z-index: 10;
    height: calc(100vh - 70px);
    top: 70px;
    width: 250px;
    left: ${(props) => (props.ToggleIsOpen ? "0" : "-100vw")};
    transition: 0.8s;

    > span{
      display: inline;
      position: absolute;
      bottom: 40px;
    }
  }
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

  a,
  p {
    cursor: pointer;
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
