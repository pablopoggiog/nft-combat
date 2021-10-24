import styled from "styled-components";

export const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 1em;
  padding: 1em;
  text-shadow: 1px 1px 10px ${({ theme }) => theme.text};
`;

export const CharactersContainer = styled.div`
  display: flex;
  gap: 2em;
  justify-content: space-around;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Character = styled.div`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  padding: 1em;
  box-shadow: 1px 1px 20px ${({ theme }) => theme.text};
  border-radius: 8px;
    width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    width: auto;
  }

  &:hover {
      background: rgba(255, 255, 255, 0.1);
  }
`;

export const CharacterName = styled.p``;

export const CharacterHp = styled.p``;

export const CharacterMaxHp = styled.p``;

export const CharacterAttackDamage = styled.p``;

export const CharacterImage = styled.img`
  height: 100px;
  border-radius: 8px;
  box-shadow: 1px 1px 20px ${({ theme }) => theme.text};
`;
