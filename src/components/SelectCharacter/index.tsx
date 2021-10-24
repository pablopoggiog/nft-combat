import { useContract } from "src/hooks";
import { Modal, Character } from "src/components";
import { Container, Title, CharactersContainer } from "./styles";

export const SelectCharacter = () => {
  const { characters, mintNft, isMintingIndex, userNft, isModalOpen } =
    useContract();

  return (
    <Container>
      <Title>Choose your hero and mint it</Title>
      <CharactersContainer>
        {!!characters.length &&
          characters.map((character) => (
            <Character
              key={character.name}
              isLoading={isMintingIndex === userNft?.index}
              character={character}
              mint={mintNft}
            />
          ))}
      </CharactersContainer>
      <Modal
        content={
          <Character
            character={userNft}
            isModal
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
