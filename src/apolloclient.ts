import {ApolloClient,InMemoryCache,ApolloProvider,ApolloLink, HttpLink} from "@apollo/client"


// Assuming you're storing the token in localStorage (you can adjust this part)
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token"); // or sessionStorage or a context

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Add the token if available
    }
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "https://localhost:7098/graphql/", // your GraphQL endpoint
});


// export const client = new ApolloClient({
//     uri: "https://localhost:7098/graphql/", // your ASP.NET Web API GraphQL endpoint
//     cache: new InMemoryCache(),
//   });

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine auth middleware with HTTP link
  cache: new InMemoryCache(),
});