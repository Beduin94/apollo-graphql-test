import gql from "graphql-tag";

const USERS_QUERY = gql`
  query users($skip: Int $limit: Int) {
    countPagination
    users(skip: $skip, limit: $limit) {
      id
      name
      email
    }
  }
`;

const USER_QUERY = gql`
          query user($id: ID!) {
            user(id: $id){
              id
              name
              email
            }
          }`

export { USERS_QUERY, USER_QUERY };