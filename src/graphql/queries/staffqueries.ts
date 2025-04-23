
import { gql } from "@apollo/client";


export const GET_ALL_STAFF = gql`
query{
    staff{
      staffID
      staffName
      clinicID
      clinicName
      contactNumber
      email
      dateOfJoining
    }
  }
`;