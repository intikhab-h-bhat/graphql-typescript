import { gql } from "@apollo/client";

// Mutation to add a new staff member
export const ADD_STAFF = gql`
mutation AddStaff(
    $staffName: String!
    $clinicID: Int!
    $contactNumber: String!
    $email: String!
    $dateOfJoining: String!
) {
    addStaff(staffInput: {
        staffName: $staffName
        clinicID: $clinicID
        contactNumber: $contactNumber
        email: $email
        dateOfJoining: $dateOfJoining
    }) {
       
        staffName
        clinicID
        contactNumber
        email
        dateOfJoining
    }
}`;


export const UPDATE_STAFF = gql`
mutation UpdateStaff(
    $staffID: Int!
    $staffName: String!
    $clinicID: Int!
    $contactNumber: String!
    $email: String!
    $dateOfJoining: String!
) {
    updateStaff(id: $staffID, staffInput: {
        staffName: $staffName
        clinicID: $clinicID
        contactNumber: $contactNumber
        email: $email
        dateOfJoining: $dateOfJoining
    }) 
}`;


export const DEL_STAFF_BY_ID = gql`
mutation DeleteStaff($staffID: Int!) {  
    deleteStaff(id: $staffID) 
       
}`;