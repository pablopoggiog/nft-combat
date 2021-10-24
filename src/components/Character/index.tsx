import { FunctionComponent } from "react";
import { Button, Spinner } from "src/components";
import { CONTRACT_ADDRESS, OPENSEA_LINK } from "src/constants";
import { Character as CharacterType } from "src/types";
import {
  Container,
  CharacterName,
  CharacterHp,
  CharacterMaxHp,
  CharacterAttackDamage,
  Link,
} from "./styles";

interface CharacterProps {
  character?: CharacterType;
  isModal?: boolean;
  isLoading?: boolean;
  mint?: (characterIndex: number) => void;
}

export const Character: FunctionComponent<CharacterProps> = ({
  character,
  isModal,
  isLoading,
  mint,
}) => {
  return (
    <Container
      key={character?.name}
      backgroundImage={String(character?.imageURI)}
      isModal={isModal}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isModal && (
            <Link
              target="_blank"
              href={`${OPENSEA_LINK}${CONTRACT_ADDRESS}/${character?.tokenId}`}
            >
              See your NFT in Opensea!
            </Link>
          )}
          <CharacterName>{character?.name}</CharacterName>
          <CharacterHp>
            Health Points: <strong>{String(character?.hp)}</strong>
          </CharacterHp>
          <CharacterMaxHp>
            Max Health Points: <strong>{String(character?.maxHp)}</strong>
          </CharacterMaxHp>
          <CharacterAttackDamage>
            Attack Damage: <strong>{String(character?.attackDamage)}</strong>
          </CharacterAttackDamage>
          {mint && (
            <Button onClick={() => mint(character!.index)}>
              Mint a {character?.name}
            </Button>
          )}
        </>
      )}
    </Container>
  );
};
