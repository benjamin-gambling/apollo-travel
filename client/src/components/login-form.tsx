import React, { Component } from "react";
import styled, { css, keyframes } from "react-emotion";

import Button from "./button";
import space from "../assets/images/moon.jpg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { colors, unit } from "../styles";

interface LoginFormProps {
  login: (a: { variables: any }) => void;
}

interface LoginFormState {
  email: string;
}

export default class LoginForm extends Component<
  LoginFormProps,
  LoginFormState
> {
  state = { email: "" };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = (event.target as HTMLInputElement).value.toLowerCase();
    this.setState((s) => ({ email }));
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.login({ variables: { email: this.state.email } });
  };

  render() {
    return (
      <Container>
        <StyledLogo />
        <Heading>APOLLO TRAVEL</Heading>
        <StyledForm onSubmit={(e) => this.onSubmit(e)}>
          <StyledInput
            required
            type="email"
            name="email"
            placeholder="Email"
            data-testid="login-input"
            onChange={(e) => this.onChange(e)}
          />
          <Button type="submit">Log in</Button>
        </StyledForm>
      </Container>
    );
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  paddingBottom: unit * 6,
  color: "white",
  backgroundColor: colors.primary,
  backgroundImage: `url(${space})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const svgClassName = css({
  display: "block",
  fill: "currentColor",
});

const Heading = styled("h1")({
  margin: `${unit * 3}px 0 ${unit * 6}px`,
});

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledLogo = styled(Logo)(svgClassName, {
  width: 250,
  path: {
    transformOrigin: "center",
    animation: `${spin} 1.5s linear infinite`,
  },
});

const StyledForm = styled("form")({
  width: "100%",
  maxWidth: 406,
  padding: unit * 3.5,
  borderRadius: 3,
  boxShadow: "0px 0px 15px 2px rgba(0, 0, 0, 0.25)",
  color: colors.text,
  backgroundColor: "white",
  opacity: "0.85",
});

const StyledInput = styled("input")({
  width: "100%",
  marginBottom: unit * 2,
  padding: `${unit * 1.25}px ${unit * 2.5}px`,
  border: `1px solid ${colors.grey}`,
  fontSize: 16,
  outline: "none",
  ":focus": {
    borderColor: colors.primary,
  },
});
