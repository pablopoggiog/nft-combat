import { useContext, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Sound from "react-sound";
import music from "src/assets/combat-music.mp3";
import { WalletContext } from "src/contexts";
import { useContract } from "src/hooks";
import { lightTheme, darkTheme } from "src/theme";
import { Button, Toggler } from "src/components";
import image from "src/assets/squid.jpeg";
import { Arena, SelectCharacter } from "./components";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const [musicStatus, setmusicStatus] = useState<
    "PLAYING" | "STOPPED" | "PAUSED"
  >("STOPPED");

  const { currentAccount, connectWallet } = useContext(WalletContext);
  const { hasNft } = useContract();

  const musicToggler = () =>
    musicStatus === "STOPPED"
      ? setmusicStatus("PLAYING")
      : setmusicStatus("STOPPED");

  const themeToggler = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <TogglersContainer>
          <Toggler toggleTheme={themeToggler} text="Switch Theme" />
          <Toggler toggleTheme={musicToggler} text="Toggle Music" />
        </TogglersContainer>
        {hasNft ? (
          <Arena />
        ) : (
          <ImageContainer>
            <Image src={image} />
          </ImageContainer>
        )}

        <BodyContainer>
          {!hasNft && <Title> Let the games begin!</Title>}

          {
            // if there's no account connected it shows the button to connect one
            // if there's an account and it has an NFT minted it shows the arena to battle, if it doesn't have one it shows the character selection
            !currentAccount ? (
              <Button onClick={connectWallet}>Connect your wallet!</Button>
            ) : hasNft ? (
              <></>
            ) : (
              <SelectCharacter />
            )
          }
        </BodyContainer>
      </Container>
      <Sound url={music} playStatus={musicStatus} />
    </ThemeProvider>
  );
};

export default App;

const Container = styled.div`
  text-align: center;
  padding: 0 0 1em;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  box-sizing: border-box;
  transition: 0.6s;
  position: relative;
`;

const TogglersContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BodyContainer = styled.div`
  padding: 1em;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2em;
  padding: 0 0.3em;
  color: ${({ theme }) => theme.text};
  text-shadow: 1px 1px 15px ${({ theme }) => theme.text};
  margin-top: 0;
`;

const ImageContainer = styled.div`
  max-height: 350px;
  overflow-y: hidden;
  margin: 0 0 2em;
  box-shadow: 1px 1px 20px ${({ theme }) => theme.text};
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
  /* Avoid extra space below the image because of the default display inline */
  display: flex;
`;
