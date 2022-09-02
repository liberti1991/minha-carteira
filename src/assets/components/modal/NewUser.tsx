import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { uniqueId } from "lodash";

import { api } from "../../repositories/api";

import { Button } from "../Button";

import { AiOutlineUserAdd } from "react-icons/ai";

interface INewUserProps {
  idUser?: number;
  email?: string;
  password?: string;
  name?: string;
}

export const NewUser: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const addNewContact = (data: INewUserProps) => {
    let NewUser: INewUserProps = {
      idUser: Number(uniqueId()),
      email: data.email,
      password: data.password,
      name: data.name,
    };

    api
      .post("user", NewUser)
      .then((res) => {
        if (res) toast.success("Saldo creditado com sucesso!");
      })
      .catch((err) => {
        if (err) toast.warn("Erro no servidor, tente novamente!");
      });
  };

  return (
    <ContainerNewUser>
      <div>
        <AiOutlineUserAdd />
      </div>
      <form onSubmit={handleSubmit(addNewContact)}>
        <ContainerInput>
          <label htmlFor="name">Nome:</label>
          <input id="name" type="text" placeholder="Usuário Teste" maxLength={60} required {...register("name")} />
        </ContainerInput>
        <ContainerInput>
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" placeholder="teste@gmail.com" maxLength={40} required {...register("email")} />
        </ContainerInput>
        <ContainerInput>
          <label htmlFor="password">Descrição:</label>
          <input id="password" type="password" placeholder="*******" maxLength={15} required {...register("password")} />
        </ContainerInput>
        <Button>Adicionar</Button>
      </form>
    </ContainerNewUser>
  );
};

const ContainerNewUser = styled.div`
  > div {
    display: flex;
    justify-content: center;

    > svg {
      cursor: default;
      width: 30px;
      height: 30px;
    }
  }
`;

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  gap: 5px;

  > label {
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    font-weight: 500;
  }

  > input {
    width: 100%;
    padding: 6px 15px;
    border-radius: 5px;
  }
`;
