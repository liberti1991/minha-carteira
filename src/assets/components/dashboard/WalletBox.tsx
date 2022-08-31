import React, { useMemo } from "react";
import styled from "styled-components";
import CountUp from "react-countup";

import dollarSvg from "../../svg/dolar.svg";
import arrowDownSvg from "../../svg/arrow-down.svg";
import arrowUpSvg from "../../svg/arrow-up.svg";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: "dollar" | "arromDown" | "arromUp";
  color: string;
}

interface ICardProps {
  color: string;
}

export const WalletBox: React.FC<IWalletBoxProps> = ({ title, amount, footerLabel, icon, color }) => {
  const iconSelected = useMemo(() => {
    if (icon === "dollar") return dollarSvg;
    else if (icon === "arromDown") return arrowDownSvg;
    else return arrowUpSvg;
  }, [icon]);

  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <strong>R$ </strong>
        <CountUp end={amount} separator="." decimal="," decimals={2} />
      </h1>
      <small>{footerLabel}</small>
      <img src={iconSelected} alt={title} />
    </Container>
  );
};

const Container = styled.div<ICardProps>`
  background-color: ${(props) => props.color};
  height: 150px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 10px 20px;
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) => (props.theme.title === "dark" ? " 0px 5px 10px 0px rgba(104, 103, 103, 0.344)" : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)")};

  > img {
    position: absolute;
    height: 110%;
    top: -10px;
    right: -30px;
    opacity: 0.3;
  }

  > span {
    font-size: 18px;
    font-weight: 500;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    color: ${(props) => props.theme.colors.universal};
  }

  @media screen and (max-width: 750px) {
    > h1 {
      word-wrap: break-word;
      font-size: 22px;

      > strong {
        display: inline-block;
        width: 100%;
      }
    }

    > span {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 450px) {
    > h1 {
      display: flex;

      > strong {
        width: auto;
        position: initial;
        margin-right: 3px;
      }
    }
  }
`;
