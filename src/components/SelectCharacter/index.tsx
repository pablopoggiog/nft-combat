import { useContract } from "src/hooks";
import {
  Container,
  Title,
  CharactersContainer,
  Character,
  CharacterName,
  CharacterHp,
  CharacterMaxHp,
  CharacterAttackDamage,
  CharacterImage,
} from "./styles";

export const SelectCharacter = () => {
  const { characters } = useContract();

  return (
    <Container>
      <Title>Choose your hero and mint it!</Title>
      <CharactersContainer>
        {!!characters.length &&
          characters.map(
            ({ index, name, hp, maxHp, imageURI, attackDamage }) => (
              <Character>
                <CharacterName>{name}</CharacterName>
                <CharacterImage src={imageURI} />
                <CharacterHp>Health Points: <strong>{String(hp)}</strong></CharacterHp>
                <CharacterMaxHp>
                  Max Health Points: <strong>{String(maxHp)}</strong>
                </CharacterMaxHp>
                <CharacterAttackDamage>
                  Attack Damage: <strong>{String(attackDamage)}</strong>
                </CharacterAttackDamage>
              </Character>
            )
          )}
      </CharactersContainer>
    </Container>
  );
};
