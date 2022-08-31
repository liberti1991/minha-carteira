import React, { useState } from "react";
import styled from "styled-components";

import { useTheme } from "../../hooks/theme";

import { Aside } from "./Aside";
import { Content } from "./Content";

import { MainHeader } from "./MainHeader";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, darkThemeSet] = useState(() => (theme.title === "dark" ? true : false));
  const handleChangeTheme = () => {
    darkThemeSet(!darkTheme);
    toggleTheme();
  };

  const [ToggleIsOpen, ToggleIsOpenSet] = useState(false);
  const handleToggleMenu = () => ToggleIsOpenSet(!ToggleIsOpen);

  return (
    <ContainerGrid>
      <MainHeader ToggleIsOpen={ToggleIsOpen} handleToggleMenu={handleToggleMenu} darkTheme={darkTheme} handleChangeTheme={handleChangeTheme} />
      <Aside ToggleIsOpen={ToggleIsOpen} handleToggleMenu={handleToggleMenu} darkTheme={darkTheme} handleChangeTheme={handleChangeTheme} />
      <Content>{children}</Content>
    </ContainerGrid>
  );
};

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 70px auto;
  grid-template-areas:
    "aside mainHeader"
    "aside content";
  height: 100vh;

  @media screen and (max-width: 648px) {
    grid-template-columns: 100%;
    grid-template-areas:
      " mainHeader"
      " content";
  }
`;
