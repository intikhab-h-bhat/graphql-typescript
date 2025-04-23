import React,{useState, ChangeEvent, FormEvent} from 'react';
import { useQuery, useMutation } from '@apollo/client'; 
import { GET_ALL_STAFF } from '../graphql/queries/staffqueries';
import { ADD_STAFF,DEL_STAFF_BY_ID,UPDATE_STAFF } from '../graphql/mutations/staffmutation';


interface Staff {
  staffID?: number;
    staffName: string;
    clinicID: number;
    clinicName?: string;
    contactNumber: string;
    email: string;
    dateOfJoining: string;
}

const Staff:React.FC = () => {
  const [staff, setStaff] = useState<Staff>({ staffName: "", clinicID: 0, contactNumber: "", email: "", dateOfJoining: "" });
  const { loading, error, data,refetch } = useQuery(GET_ALL_STAFF);

  const [deleteStaff] = useMutation(DEL_STAFF_BY_ID);
  const [addStaff] = useMutation(ADD_STAFF, {
    refetchQueries: [{ query: GET_ALL_STAFF }], 
  });
  const [updateStaff] = useMutation(UPDATE_STAFF, {
    refetchQueries: [{ query: GET_ALL_STAFF }], 
  });

const allStaff = data?.staff?.map((staff: Staff) => (
    <tr key={staff.staffID}>
      <td>{staff.staffID}</td>
      <td>{staff.staffName}</td>
      <td>{staff.clinicID}</td>
      <td>{staff.clinicName}</td>
      <td>{staff.contactNumber}</td>
      <td>{staff.email}</td>
      <td>{staff.dateOfJoining}</td>
      <td>
        <button onClick={() => handleDelete(staff.staffID!)}>Delete</button>
      </td>
      <td>
        <button className="buttonedit" onClick={() => handleEdit(staff)}>Edit</button>
      </td>
    </tr>
  ));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStaff((prevStaff) => ({ ...prevStaff, [name]: name === "clinicID" ? parseInt(value) : value }));
  };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
        await addStaff({
            variables: {
            staffName: staff.staffName,
            clinicID: staff.clinicID,
            contactNumber: staff.contactNumber,
            email: staff.email,
            dateOfJoining: staff.dateOfJoining
            },
        });
        setStaff({ staffName: "", clinicID: 0,contactNumber: "", email: "", dateOfJoining: "" });
        } catch (error) {
        console.error("Error adding staff:", error);
        }
    };

    const handleDelete = async (staffID: number) => {
        try {
            await deleteStaff({
                variables: { staffID },
            });
            refetch(); 
        }
        catch (error) {
            console.error("Error deleting staff:", error);
        }
    };

    const handleEdit = (staff: Staff) => {
        setStaff(staff); // populate form with staff data for editing
    }


    const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateStaff({
                variables: {
                    staffID: staff.staffID,
                    staffName: staff.staffName,
                    clinicID: staff.clinicID,
                    contactNumber: staff.contactNumber,
                    email: staff.email,
                    dateOfJoining: staff.dateOfJoining
                },
            });
            setStaff({ staffName: "", clinicID: 0, contactNumber: "", email: "", dateOfJoining: "" });
        } catch (error) {
            console.error("Error updating staff:", error);
        }
    }


  return (
    <div className="staff-container">
         
        <h1>Staff</h1>
        <form onSubmit={staff.staffID?handleUpdate:handleSubmit}>
            <input type="text" name="staffName" value={staff.staffName} onChange={handleChange} placeholder="Staff Name" required />
            <input type="number" name="clinicID" value={staff.clinicID} onChange={handleChange} placeholder="Clinic ID" required />
            {/* <input type="text" name="clinicName" value={staff.clinicName} onChange={handleChange} placeholder="Clinic Name" required /> */}
            <input type="text" name="contactNumber" value={staff.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
            <input type="email" name="email" value={staff.email} onChange={handleChange} placeholder="Email" required />
            <input type="date" name="dateOfJoining" value={staff.dateOfJoining} onChange={handleChange} required />
            <button type="submit">{staff.staffID?"Update Staff":"Add Staff"}</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <table>
            <thead>
            <tr>
                <th>Staff ID</th>
                <th>Staff Name</th>
                <th>Clinic ID</th>
                <th>Clinic Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Date of Joining</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>{allStaff}</tbody>
        </table>                
    </div>
  );


}
export default Staff;