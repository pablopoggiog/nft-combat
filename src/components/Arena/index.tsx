import { FunctionComponent, useEffect } from "react";
import { Container, CharacterContainer, HealthPoints } from "./styles";
import { Button, Boss, Character } from "src/components";
import { useContract } from "src/hooks";

export const Arena = () => {
  const { boss, fetchBoss, attackBoss, userNft, attackStatus } = useContract();

  useEffect(() => {
    fetchBoss();
  }, [fetchBoss]);

  return (
    <Container>
      <div style={{ width: "100%" }}>
        <Boss boss={boss} status={attackStatus} />
        <Health hp={boss?.hp} maxHp={boss?.maxHp} />
      </div>
      <Button onClick={attackBoss} disabled={!(Number(userNft?.hp) > 0)}>
        Attack the boss!
      </Button>
      <CharacterContainer>
        <Character
          character={userNft}
          status={attackStatus}
          isLoading={attackStatus === "attacking"}
        />
        <Health hp={userNft?.hp} maxHp={userNft?.maxHp} />
      </CharacterContainer>
    </Container>
  );
};

interface HealthPointsProps {
  hp?: string;
  maxHp?: string;
}

const Health: FunctionComponent<HealthPointsProps> = ({ hp, maxHp }) => (
  <>
    <progress value={hp} max={maxHp} />
    <HealthPoints>{`${hp}/${maxHp}`}</HealthPoints>
  </>
);
