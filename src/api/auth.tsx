import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'API_ENDPOINT_HERE/query',
  cache: new InMemoryCache(),
});

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const { data } = await client.mutate({
      mutation: SIGN_UP_MUTATION,
      variables: { email, password, name },
    });
    return data.signUp;
  } catch (error) {
    console.error('Sign-up error', error);
    throw new Error('Failed to sign up');
  }
};
