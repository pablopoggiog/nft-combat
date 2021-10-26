import { FunctionComponent } from "react";
import { AttackStatus, Boss as BossType } from "src/types";
import {
  Container,
  CharacterName,
  CharacterHp,
  CharacterMaxHp,
  CharacterAttackDamage,
} from "./styles";

interface BossProps {
  boss?: BossType;
  status: AttackStatus;
}

export const Boss: FunctionComponent<BossProps> = ({ boss, status }) => {
  return (
    <Container backgroundImage={String(boss?.imageURI)} status={status}>
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
