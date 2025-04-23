import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Clinic from "../Clinic";
import { GET_ALL_CLINICS } from "../../graphql/queries/clinicquries";
import { ADD_CLINIC } from "../../graphql/mutations/clinicmutation";

const mocks = [
  {
    request: {
      query: GET_ALL_CLINICS,
    },
    result: {
      data: {
        clinics: [
          {
            clinicID: 1,
            clinicName: "Test Clinic",
            email: "test@example.com",
            address: "123 Street",
            contactNumber: "1234567890",
            website: "www.testclinic.com",
          },
        ],
      },
    },
  },
];

describe("Clinic Component", () => {
  test("renders clinic list from query", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Clinic />
      </MockedProvider>
    );

    // Loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Test Clinic")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });
  });

  test("adds a new clinic", async () => {
    const addClinicMock = {
      request: {
        query: ADD_CLINIC,
        variables: {
          clinicName: "New Clinic",
          email: "new@example.com",
          address: "New Street",
          contactNumber: "9876543210",
          website: "www.newclinic.com",
        },
      },
      result: {
        data: {
          addClinic: {
            clinicID: 2,
            clinicName: "New Clinic",
            email: "new@example.com",
            address: "New Street",
            contactNumber: "9876543210",
            website: "www.newclinic.com",
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[...mocks, addClinicMock]} addTypename={false}>
        <Clinic />
      </MockedProvider>
    );

    // Wait for data to load
    await waitFor(() => screen.getByText("Test Clinic"));

    fireEvent.change(screen.getByPlaceholderText("Clinic Name"), {
      target: { value: "New Clinic" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "New Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contact Number"), {
      target: { value: "9876543210" },
    });
    fireEvent.change(screen.getByPlaceholderText("website"), {
      target: { value: "www.newclinic.com" },
    });
   
    fireEvent.click(screen.getAllByText("Add Clinic")[0]);


    // You can assert if form was reset
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Clinic Name")).toHaveValue("");
    });
  });
});

