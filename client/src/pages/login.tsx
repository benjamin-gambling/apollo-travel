import React from "react";
import {
  gql,
  useMutation,
  useApolloClient,
  ApolloClient,
} from "@apollo/client";

import { LoginForm, Loading } from "../components";
import * as LoginTypes from "./__generated__/login";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export const LOGGED_IN_STATUS = gql`
  query loggedInStatus {
    isLoggedIn
  }
`;

export default function Login() {
  const client: ApolloClient<any> = useApolloClient();

  const [login, { loading, error }] = useMutation<
    LoginTypes.login,
    LoginTypes.loginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login as string);
      client.writeQuery({
        query: LOGGED_IN_STATUS,
        data: {
          isLoggedIn: true,
        },
      });
    },
  });

  if (loading) return <Loading />;
  if (error) {
    return <p>An error occurred</p>;
  }

  return <LoginForm login={login} />;
}
