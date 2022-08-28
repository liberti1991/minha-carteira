import React, { useMemo, useState } from "react";
import styled from "styled-components";

import { useTheme } from "../hooks/theme";

import { Toggle } from "./Toggle";

import { emojis } from "../utils/emojis";

export const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, darkThemeSet] = useState(() => (theme.title === "dark" ? true : false));

  const handleChangeTheme = () => {
    darkThemeSet(!darkTheme);
    toggleTheme();
  };
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle labelLeft="Light" labelRight="Dark" checked={darkTheme} onChange={handleChangeTheme} />
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
  padding: 0 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
`;
