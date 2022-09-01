import styled from "styled-components";

export const Loading = () => (
  <ContainerLoading>
    <LoadingContainer>
      <div></div>
      <div></div>
      <div></div>
      <span>Loading...</span>
    </LoadingContainer>
  </ContainerLoading>
);

const ContainerLoading = styled.div`
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingContainer = styled.div`
  width: 120px;
  height: 75px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;

  span {
    font-size: 22px;
    color: ${(props) => props.theme.colors};
    text-transform: uppercase;
    margin: auto;
  }

  div {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: orange;
    animation: bounce 0.5s alternate infinite;

    :nth-child(2) {
      animation-delay: 0.16s;
    }

    :nth-child(3) {
      animation-delay: 0.32s;
    }

    @keyframes bounce {
      from {
        transform: scaleX(1.25);
      }
      to {
        transform: translateY(-50px) scaleX(1);
      }
    }
  }
`;
