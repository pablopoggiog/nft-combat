import { useState } from "react";
import styled from "styled-components";
import { useWallet } from "src/hooks";
import { Button } from "src/components";

const App = () => {
  const { currentAccount, connectWallet, interactWithContract } = useWallet();

  return (
    <Container>
      <Title> Let the games begin!</Title>
      {!currentAccount && (
        <Button onClick={connectWallet}>Connect your wallet!</Button>
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  text-align: center;
  padding: 1em;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1em;
  padding: 1em;
`;
