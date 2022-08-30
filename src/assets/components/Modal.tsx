import styled from "styled-components";

interface IModalProps {
  handleModal(): void;
}

export const Modal: React.FC<IModalProps> = ({ handleModal }) => {
  return (
    <section>
      <Overlay onClick={() => handleModal()}></Overlay>
      <Container>
        <div>oi</div>
        <div>oi</div>
        <div>oi</div>
        <div>oi</div>
        <div>oi</div>
      </Container>
    </section>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Container = styled.section`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-color: white;
`;
