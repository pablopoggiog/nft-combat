import styled, { css, keyframes } from "styled-components";
import { AttackStatus } from "src/types";

const blink = keyframes`
        0% {
          opacity: 0;
        }
  
        100% {
          opacity: 1;
        }
      `;

interface ContainerProps {
  backgroundImage: string;
  isModal?: boolean;
  status: AttackStatus;
}

export const Container = styled.div<ContainerProps>`
  cursor: ${({ isModal }) => !isModal && "pointer"};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  box-shadow: 1px 1px 20px ${({ theme }) => theme.text};
  border-radius: 8px;
  width: ${({ isModal }) => !isModal && "100%"};
  position: relative;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.5s;
  color: ${({ theme }) => theme.text};
  width: 100%;
  animation: ${({ status }) =>
    status === "finished" &&
    css`
      ${blink} 0.1s linear alternate 10
    `};

  &::before {
    content: "";
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    transition: 0.5s;
    border-radius: 8px;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: auto;
  }

  &:hover {
    background: rgba(60, 162, 195, 0.2);

    &::before {
      opacity: 0.2;
    }
  }
`;

export const CharacterName = styled.p``;

export const CharacterHp = styled.p``;

export const CharacterMaxHp = styled.p``;

export const CharacterAttackDamage = styled.p``;

export const Link = styled.a`
  color: grey;
  text-decoration: none;
`;
