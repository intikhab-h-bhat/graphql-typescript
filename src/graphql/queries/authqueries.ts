
import { gql } from "@apollo/client";

export const LOGIN = gql`
query Login($email: String!, $password: String!) {
    Login(userLoginDto:  {
       email:$email,
       password:$password
    })        
      
    }`;