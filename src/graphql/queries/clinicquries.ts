import { gql } from "@apollo/client";

export const GET_ALL_CLINICS = gql`
query {
  clinics{
      clinicID
      clinicName
      email
      address
      contactNumber
      website
  }
}`;


