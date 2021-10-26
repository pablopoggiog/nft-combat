import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2em;
`;

export const CharacterContainer = styled.div`
  width: 300px;
`;

export const HealthPoints = styled.p`
  color: ${({ theme }) => theme.text};
`;