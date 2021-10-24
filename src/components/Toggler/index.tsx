import { FunctionComponent } from "react";
import styled from "styled-components";
import { Button } from "src/components";

interface TogglerProps {
  toggleTheme: () => void;
}

export const Toggler: FunctionComponent<TogglerProps> = ({ toggleTheme }) => (
  <Container>
    <Button onClick={toggleTheme}>Switch Theme</Button>
  </Container>
);

export const Container = styled.div`
  display: flex;
  text-align: center;
  justify-content: flex-end;
  margin: 1em 0;
  width: 7em;
  position: absolute;
  top: 0;
`;
