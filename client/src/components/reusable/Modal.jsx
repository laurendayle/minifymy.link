import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const Modal = ({ children, setShowModal }) => {
  return (
    <Overlay>
      <Centered>
        <Content>
          <Close onClick={() => setShowModal(false)}>
            <Icon name="window close outline" size="large" />
          </Close>
          {children}
        </Content>
      </Centered>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #000000ce;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Centered = styled.div`
  position: fixed;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -70%);
  width: 100%;

`;

const Content = styled.div`
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
`;

const Close = styled.button`
  background-color: transparent;
  position: relative;
  fontsize: 50px;
  color: teal;
  border: none;
  top: 40px;
  left: 15px;
  z-index: 2.1;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  &:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-2px, 2px);
  }
`;

export default Modal;
