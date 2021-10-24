import styled, { keyframes } from "styled-components";

const spin = keyframes`
        0% {
          transform: rotate(0deg);
        }
  
        50% {
          transform: rotate(180deg);
          opacity: 0.6;
        }
  
        100% {
          transform: rotate(360deg);
          opacity: 1;
        }
      `;

export const Loader = styled.div<{ inner?: boolean; innest?: boolean }>`
  border: 8x solid lightBlue;
  border-top: 8px solid rgba(255, 219, 220);
  border-radius: 50%;
  width: ${({ inner, innest }) => (inner ? "40px" : innest ? "10px" : "65px")};
  height: ${({ inner, innest }) =>
    inner ? "33px" : innest ? "7px" : "60px"};
  animation: ${spin} 1.5s linear infinite;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
