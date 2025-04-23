import { gql } from '@apollo/client';

// Mutation to add a new clinic
export const ADD_CLINIC= gql`
mutation AddClinic( $clinicName: String!
    $email: String!
    $address: String!
    $contactNumber: String!
    $website: String!) {
    addClinic(clinicInput: {  clinicName: $clinicName
        email: $email
        address: $address
        contactNumber: $contactNumber
        website: $website}) 
    {
    clinicID
      clinicName
      email
      
    }
  }`;


export const UPDATE_CLINIC = gql`
  mutation UpdateClinic(
    $clinicID: Int!
    $clinicName: String!
    $email: String!
    $address: String!
    $contactNumber: String!
    $website: String!
  ) {
    updateClinic(
      id: $clinicID
      clinicInput: {
        clinicName: $clinicName
        email: $email
        address: $address
        contactNumber: $contactNumber
        website: $website
      }
    ) {
      clinicID
      clinicName
      email
    }
  }
`;



// Mutation to delete a new clinic
export const DEL_CLINIC_BY_ID = gql`
mutation DeleteClinic($clinicID: Int!) {
    deleteClinic(id: $clinicID) 
}`;



