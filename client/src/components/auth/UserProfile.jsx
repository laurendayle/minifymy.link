import { useRecoilState } from "recoil";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import SignOut from "./SignOut";
import ShortenURL from "../ShortenURL";
import { useEffect, useState } from "react";
import styled from "styled-components";

const UserProfile = () => {
  const [session, setSession] = useRecoilState(sessionAtom);

  useEffect(() => {
    console.log(session);
  });

  return (
    <>
      <SignOut />
      <Container>
        <ShortenURL />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  height: 70%;
  width: 60%;
  background-color: #ffffff88;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

const StyledHeader = styled.h1`
  position: relative;
  top: -15px;
  font-size: 3em;
  color: white;
  font-weight: 400;
`;

const ModalInner = styled.div`
  height: 60%;
  background-color: #ffffffc3;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

export default UserProfile;
