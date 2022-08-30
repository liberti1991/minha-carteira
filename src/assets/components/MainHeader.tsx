import React, { useMemo } from "react";
import styled from "styled-components";

import { Toggle } from "./Toggle";

import { MdClose, MdMenu } from "react-icons/md";

import { emojis } from "../utils/emojis";

interface IStatesProps {
  ToggleIsOpen: boolean;
  handleToggleMenu(): void;
  darkTheme: boolean;
  handleChangeTheme(): void;
}

export const MainHeader: React.FC<IStatesProps> = ({ ToggleIsOpen, handleToggleMenu, darkTheme, handleChangeTheme }) => {
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <Container>
      <ToggleMenu>{ToggleIsOpen ? <MdClose onClick={handleToggleMenu} /> : <MdMenu onClick={handleToggleMenu} />}</ToggleMenu>
      <span>
        <Toggle checked={darkTheme} onChange={handleChangeTheme} />
      </span>
      <Profile>
        <h3>Olá, {emoji}</h3>
        <span>Rodrigo Liberti</span>
      </Profile>
    </Container>
  );
};

const Container = styled.div`
  grid-area: mainHeader;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px 0 25px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};

  @media screen and (max-width: 648px) {
    > span {
      display: none;
    }
  }
`;

const ToggleMenu = styled.div`
  display: none;

  @media screen and (max-width: 648px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.info};
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

const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
`;
