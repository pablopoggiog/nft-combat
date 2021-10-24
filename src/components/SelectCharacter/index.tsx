import { useContract } from "src/hooks";
import { Button, Spinner } from "src/components";
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
  const { characters, mintNft, isLoading } = useContract();

  return (
    <Container>
      <Title>Choose your hero and mint it</Title>
      <CharactersContainer>
        {!!characters.length &&
          characters.map(
            ({ index, name, hp, maxHp, imageURI, attackDamage }) => (
              <Character key={name} backgroundImage={String(imageURI)}>
                {isLoading ? (
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
    </Container>
  );
};
