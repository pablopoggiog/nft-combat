import { FunctionComponent } from "react";
import { Boss as BossType } from "src/types";
import {
  Container,
  CharacterName,
  CharacterHp,
  CharacterMaxHp,
  CharacterAttackDamage,
} from "./styles";

interface BossProps {
  boss?: BossType;
}

export const Boss: FunctionComponent<BossProps> = ({ boss }) => {
  return (
    <Container backgroundImage={String(boss?.imageURI)}>
      <CharacterName>{boss?.name}</CharacterName>
      <CharacterHp>
        Health Points: <strong>{String(boss?.hp)}</strong>
      </CharacterHp>
      <CharacterMaxHp>
        Max Health Points: <strong>{String(boss?.maxHp)}</strong>
      </CharacterMaxHp>
      <CharacterAttackDamage>
        Attack Damage: <strong>{String(boss?.attackDamage)}</strong>
      </CharacterAttackDamage>
    </Container>
  );
};
