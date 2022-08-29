import React from "react";
import styled from "styled-components";

import { Aside } from "./Aside";
import { Content } from "./Content";
import { MainHeader } from "./MainHeader";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <ContainerGrid>
    <MainHeader />
    <Aside />
    <Content>{children}</Content>
  </ContainerGrid>
);

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
