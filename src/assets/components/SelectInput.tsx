import React from "react";
import styled from "styled-components";

interface ISelectIputProprs {
  options: {
    value: string | number;
    label: string | number;
    id:number;
  }[];
}

export const SelectInput: React.FC<ISelectIputProprs> = ({ options }) => {
  return (
    <ContainerSelect>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </ContainerSelect>
  );
};

const ContainerSelect = styled.select`
  padding: 7px 10px;
  border-radius: 5px;
`;
