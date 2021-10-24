import { useContext, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { WalletContext } from "src/contexts";
import { lightTheme, darkTheme } from "src/theme";
import { Button, Toggler } from "src/components";
import image from "src/assets/squid.jpeg";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const themeToggler = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const { currentAccount, connectWallet } = useContext(WalletContext);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <Toggler toggleTheme={themeToggler} />
        <Title> Let the games begin!</Title>
        <ImageContainer>
          <Image src={image} />
        </ImageContainer>
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
  font-size: 2em;
  padding: 1em;
  color: ${({ theme }) => theme.text};
  text-shadow: 1px 1px 20px ${({ theme }) => theme.text};
`;

const ImageContainer = styled.div`
  max-height: 400px;
  overflow-y: hidden;
  margin: 2em 0;
  box-shadow: 1px 1px 20px ${({ theme }) => theme.text};
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
  /* Avoid extra space below the image because of the default display inline */
  display: flex;
`;
