import React, { useState } from "react";
import styled from "styled-components";

import { Modal } from "../modal/Modal";
import { Remove } from "../modal/Remove";

import { BsTrash } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FormContent } from "../modal/FormContent";

interface IHistoryFinanceCard {
  id: number;
  tagColor: string;
  title: string;
  subtitle: string;
  amount: string;
}

interface ITagProps {
  color: string;
}

export const HistoryFinanceCard: React.FC<IHistoryFinanceCard> = ({ tagColor, title, subtitle, amount }) => {
  const [modalRemove, modalRemoveSet] = useState(false);
  const handleModalRemove = () => modalRemoveSet(!modalRemove);

  const [modalEdit, modalEditSet] = useState(false);
  const handleModalEdit = () => modalEditSet(!modalEdit);

  return (
    <section>
      <Container>
        <Tag color={tagColor}></Tag>
        <Card>
          <div>
            <span>{title}</span>
            <small>{subtitle}</small>
          </div>
          <div>
            <h3>{amount}</h3>
            <BsTrash onClick={() => modalRemoveSet(true)} />
            <FaUserEdit onClick={() => modalEditSet(true)} />
          </div>
        </Card>
      </Container>
      {modalEdit && (
        <Modal handleModal={handleModalEdit} title="Editar" typeMode="edicao" editText={title}>
          <FormContent />
        </Modal>
      )}
      {modalRemove && (
        <Modal handleModal={handleModalRemove} title="Excluir" >
          <Remove title={title} amount={amount} />
        </Modal>
      )}
    </section>
  );
};

const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 5px;
  padding: 10px 15px 10px 25px;
  position: relative;
  transition: all 0.3s;
  animation: animate6 0.5s ease;
  box-shadow: ${(props) => (props.theme.title === "dark" ? " 0px 5px 10px 0px rgba(104, 103, 103, 0.344)" : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)")};

  :hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  @keyframes animate6 {
    0% {
      transform: translateX(-100px);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
`;

const Tag = styled.div<ITagProps>`
  background-color: ${(props) => props.color};
  position: absolute;
  width: 10px;
  height: 65%;
  left: 5px;
`;

const Card = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;

    span {
      font-weight: bold;
      font-size: 18px;
    }
  }

  > div:nth-child(2) {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  @media screen and (max-width: 450px) {
    > div {
      > span {
        font-size: 15px;
      }

      > h3 {
        font-size: 13px;
      }
    }
  }
`;
