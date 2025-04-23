import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import {client} from './apolloclient';

import App from './App';
import TestDemo from './TestDemo';



// test('renders learn react link', () => {
//   <ApolloProvider client={client}>
//   <App />
// </ApolloProvider>
//   const linkElement = screen.getByText(/simple/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders learn react link', () => {
  
  render (<TestDemo />)

  const input = screen.getByRole('textbox');
  const placeholderText = screen.getByPlaceholderText('Enter something...');
  expect(input).toBeInTheDocument();
  expect(placeholderText).toBeInTheDocument();
  expect(input).toHaveAttribute('name', 'username');
 
});


