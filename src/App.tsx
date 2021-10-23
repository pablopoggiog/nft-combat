import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useWallet } from "src/hooks";
import { lightTheme, darkTheme } from "src/theme";
import { Button, Toggler } from "src/components";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const themeToggler = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const { currentAccount, connectWallet, interactWithContract } = useWallet();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <Toggler toggleTheme={themeToggler} />
        <Title> Let the games begin!</Title>
        {!currentAccount && (
          <Button onClick={connectWallet}>Connect your wallet!</Button>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;

const Container = styled.div`
  text-align: center;
  padding: 1em;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  box-sizing: border-box;
  transition: 0.6s;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1em;
  padding: 1em;
  color: ${({ theme }) => theme.text};
`;
