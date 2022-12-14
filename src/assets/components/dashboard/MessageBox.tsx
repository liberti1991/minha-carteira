import React from "react";
import styled from "styled-components";

interface IMessageBox {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

export const MessageBox: React.FC<IMessageBox> = ({ title, description, footerText, icon }) => (
  <Container>
    <header>
      <h1>
        {title}
        <img src={icon} alt={title} />
      </h1>
      <p>{description}</p>
    </header>
    <footer>
      <span>{footerText}</span>
    </footer>
  </Container>
);

const Container = styled.div`
  height: 240px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: animate2 0.5s;
  box-shadow: ${(props) => (props.theme.title === "dark" ? " 0px 5px 10px 0px rgba(104, 103, 103, 0.344)" : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)")};

  > header {
    > h1 {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      gap: 10px;

      > img {
        width: 35px;
      }
    }

    > p {
      font-size: 18px;
    }
  }

  @keyframes animate2 {
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
