import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import Pages from "./pages";
import Login from "./pages/login";
import injectStyles from "./styles";

import { resolvers, typeDefs } from "./resolvers";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/",
    headers: {
      authorization: localStorage.getItem("token") || "",
    },
  }),
  typeDefs,
  resolvers,
});

client.writeQuery({
  query: gql`
    query CartAndLoggedInStatus {
      isLoggedIn
      cartItems
    }
  `,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: [],
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);

  return data.isLoggedIn ? <Pages /> : <Login />;
}

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
