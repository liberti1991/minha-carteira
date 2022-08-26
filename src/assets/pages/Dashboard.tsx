import React from "react";
import styled from "styled-components";
import { ContentHeader } from "../components/ContentHeader";
import { SelectInput } from "../components/SelectInput";

export const Dashboard: React.FC = () => {
  const options = [
    { id: 0, value: "1", label: 'janeiro' },
  ];
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#ff5">
        <SelectInput options={options} onChange={() => {}} />
        <SelectInput options={options} onChange={() => {}} />
      </ContentHeader>
    </Container>
  );
};

const Container = styled.div``;
