import React, { useMemo } from "react";
import styled from "styled-components";

import { emojis } from "../utils/emojis";
import { Toggle } from "./Toggle";

export const MainHeader: React.FC = () => {
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle />
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