import { useContract } from "src/hooks";
import { Button, Modal, Spinner } from "src/components";
import {
  Container,
  Title,
  CharactersContainer,
  Character,
  CharacterName,
  CharacterHp,
  CharacterMaxHp,
  CharacterAttackDamage,
} from "./styles";

export const SelectCharacter = () => {
  const { characters, mintNft, isMinting, userNft, isModalOpen } =
    useContract();

  return (
    <Container>
      <Title>Choose your hero and mint it</Title>
      <CharactersContainer>
        {!!characters.length &&
          characters.map(
            ({ index, name, hp, maxHp, imageURI, attackDamage }) => (
              <Character key={name} backgroundImage={String(imageURI)}>
                {isMinting === index ? (
                  <Spinner />
                ) : (
                  <>
                    <CharacterName>{name}</CharacterName>
                    <CharacterHp>
                      Health Points: <strong>{String(hp)}</strong>
                    </CharacterHp>
                    <CharacterMaxHp>
                      Max Health Points: <strong>{String(maxHp)}</strong>
                    </CharacterMaxHp>
                    <CharacterAttackDamage>
                      Attack Damage: <strong>{String(attackDamage)}</strong>
                    </CharacterAttackDamage>
                    <Button onClick={() => mintNft(index)}>
                      Mint a {name}
                    </Button>
                  </>
                )}
              </Character>
            )
          )}
      </CharactersContainer>
      <Modal
        content={
          <Character
            key={userNft?.name}
            backgroundImage={String(userNft?.imageURI)}
            isModal={true}
          >
            <CharacterName>{userNft?.name}</CharacterName>
            <CharacterHp>
              Health Points: <strong>{String(userNft?.hp)}</strong>
            </CharacterHp>
            <CharacterMaxHp>
              Max Health Points: <strong>{String(userNft?.maxHp)}</strong>
            </CharacterMaxHp>
            <CharacterAttackDamage>
              Attack Damage: <strong>{String(userNft?.attackDamage)}</strong>
            </CharacterAttackDamage>
          </Character>
        }
        isOpen={isModalOpen}
        onClose={() => {
          return;
        }}
      />
    </Container>
  );
};
