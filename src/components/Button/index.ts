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

  &:hover {
    background-color: #3ca2c3;
    transform: scale(1.01);
  }

  &:focus {
    outline: 0;
  }
`;
