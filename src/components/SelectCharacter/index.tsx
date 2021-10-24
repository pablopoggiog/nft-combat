import { useContract } from "src/hooks";
import { Modal, Character } from "src/components";
import { Container, Title, CharactersContainer } from "./styles";

export const SelectCharacter = () => {
  const { characters, mintNft, isMinting, userNft, isModalOpen } =
    useContract();

  return (
    <Container>
      <Title>Choose your hero and mint it</Title>
      <CharactersContainer>
        {!!characters.length &&
          characters.map((character) => (
            <Character
              key={character.name}
              character={character}
              mint={mintNft}
            />
          ))}
      </CharactersContainer>
      <Modal
        content={
          <Character
            character={userNft}
            isLoading={isMinting === userNft?.index}
          />
        }
        isOpen={isModalOpen}
        onClose={() => {
          return;
        }}
      />
    </Container>
  );
};
