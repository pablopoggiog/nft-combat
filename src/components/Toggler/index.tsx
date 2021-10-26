import { FunctionComponent } from "react";
import { Button } from "src/components";
import { Container } from "./styles";

interface TogglerProps {
  toggleTheme: () => void;
  text: string;
}

export const Toggler: FunctionComponent<TogglerProps> = ({
  toggleTheme,
  text,
}) => (
  <Container>
    <Button onClick={toggleTheme}>{text}</Button>
  </Container>
);
