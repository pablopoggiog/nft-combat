import styled from "styled-components";

interface ButtonProps {
  borderRadius?: string;
}

export const Button = styled.button<ButtonProps>`
  border-radius: ${({ borderRadius }) => borderRadius ?? "5px"};
  padding: 10px;
  cursor: pointer;
  transition: 0.6s;
  text-align: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  background: ${({ theme }) => theme.background};
  color: white;
  margin: 1em 0;

  &:hover {
    background-color: #3ca2c3;
    transform: scale(1.01);
  }

  &:focus {
    outline: 0;
  }
`;
