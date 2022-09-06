import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { uniqueId } from "lodash";

import { api } from "../../repositories/api";

import { Button } from "../Button";

import { AiOutlineUserAdd } from "react-icons/ai";

interface INewUserProps {
  idUser?: number;
  email: string;
  password: string;
  name: string;
}
interface ICloseProps {
  handleModal(): void;
}

export const NewUser: React.FC<ICloseProps> = ({ handleModal }) => {
  const { register, handleSubmit } = useForm<INewUserProps>();

  const [emailDB, emailDBSet] = useState([]);

  api
    .get("users")
    .then((res) => emailDBSet(res.data))
    .catch((err) => console.log(err));

  let newEmailBD: string[] = [];

  emailDB.forEach((item: { email: string }) => {
    newEmailBD.push(item.email);
  });

  const addNewContact = (data: INewUserProps) => {
    let newUser: INewUserProps = {
      idUser: Number(uniqueId()),
      email: data.email,
      password: data.password,
      name: data.name,
    };

    if (newEmailBD.includes(newUser.email)) {
      toast.warn("E-mail ja cadastrado!");
    } else {
      api
        .post("users", newUser)
        .then((res) => {
          if (res) toast.success("Usuário criado com sucesso!");
          handleModal();
        })
        .catch((err) => toast.warning(err));
    }
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
          <label htmlFor="password">Senha:</label>
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
