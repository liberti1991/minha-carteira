import React from "react";
import styled from "styled-components";

interface IMessageBox {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

export const MessageBox: React.FC<IMessageBox> = ({ title, description, footerText, icon }) => {
  return (
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
};

const Container = styled.div`
  height: 260px;
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > header {
    > h1 {
      display: flex;
      align-items: center;
      gap: 10px;
      > img {
        width: 35px;
      }
    }
    > p {
      font-size: 18px;
    }
  }
`;
