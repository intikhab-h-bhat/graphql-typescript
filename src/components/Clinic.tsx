import {useQuery,useMutation} from "@apollo/client"
import { GET_ALL_CLINICS} from "../graphql/queries/clinicquries";
import { DEL_CLINIC_BY_ID } from "../graphql/mutations/clinicmutation";
import { ADD_CLINIC,UPDATE_CLINIC } from "../graphql/mutations/clinicmutation";
import React,{useState,FormEvent,ChangeEvent} from "react";


interface Clinic {
    clinicID?: number;
    clinicName: string;
    email: string;
    address: string;
    contactNumber: string;
    website: string;
}

const Clinic: React.FC= () => {

const [clinic, setClinic] = useState<Clinic>({ clinicName: "", email: "", address: "", contactNumber: "", website: "" });
// const [email, setEmail] = useState("");
// const [address, setAddress] =useState("");
// const [contactNumber, setcontactNumber] = useState("");    
// const [website, setWebsite] = useState("");

  const { loading, error, data,refetch} = useQuery(GET_ALL_CLINICS);
  const [deleteClinic] = useMutation(DEL_CLINIC_BY_ID);
  const [addClinic] = useMutation(ADD_CLINIC, {
    refetchQueries: [{ query: GET_ALL_CLINICS }], 
  });
  const [updateClinic] = useMutation(UPDATE_CLINIC, {
    refetchQueries: [{ query: GET_ALL_CLINICS }], 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

 

  const allClinics = data.clinics.map((clinic: Clinic) => (
    <tr key={clinic.clinicID}>
      <td>{clinic.clinicID}</td>
      <td>{clinic.clinicName}</td>
      <td>{clinic.email}</td>
        <td>{clinic.address}</td>
        <td>{clinic.contactNumber}</td>
        <td>{clinic.website}</td>
        <td>
            <button onClick={()=>handleDelete(clinic.clinicID!)}>Delete</button>
           </td>
           <td> <button className="buttonedit" onClick={()=>handleEdit(clinic)}>Edit</button>
        </td>
    </tr>
  ));


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClinic((prevClinic) => ({ ...prevClinic, [name]: value }));
  }


const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    try {
        await addClinic({ variables: {clinicName: clinic.clinicName,
            email: clinic.email,
            address: clinic.address,
            contactNumber: clinic.contactNumber,
            website: clinic.website} });

        setClinic({ clinicName: "", email: "", address: "", contactNumber: "", website: "" }); // reset form
       
      } catch (err) {
        console.error("Error adding clinic:", err);
      }
    };

    const handleEdit = (clinic: Clinic) => {
        setClinic(clinic); // populate form with clinic data for editing
    }

    const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          await updateClinic({ variables: {clinicID: clinic.clinicID,
            clinicName: clinic.clinicName,
            email: clinic.email,
            address: clinic.address,
            contactNumber: clinic.contactNumber,
            website: clinic.website} });
    
          setClinic({ clinicName: "", email: "", address: "", contactNumber: "", website: "" }); // reset form
        } catch (err) {
          console.error("Error updating clinic:", err);
        }
      };



  
  const handleDelete = async (clinicID: number) => {
    if (window.confirm("Are you sure you want to delete this clinic?")) {
        try {
          await deleteClinic({ variables: { clinicID } });
          refetch(); // refresh clinic list
        } catch (err) {
          console.error("Delete failed:", err);
        }
      }
  };

  return (
    <>
    <div>
    <div>
        <h2>Add Clinic</h2>
        <form onSubmit={clinic.clinicID?handleUpdate:handleSubmit}>
            <input type="text" name="clinicName" value={clinic.clinicName} onChange={handleChange} placeholder="Clinic Name" required/>
            <input type="email" name="email" value={clinic.email} onChange={handleChange} placeholder="Email" required/>
            <input type="address" name="address" value={clinic.address} onChange={handleChange} placeholder="Address" required/>
            <input type="contactNumber" name="contactNumber" value={clinic.contactNumber} onChange={handleChange} placeholder="Contact Number" required/>
            <input type="website" name="website" value={clinic.website} onChange={handleChange} placeholder="website" required/>
            <button type="submit">{clinic.clinicID?"Update Clinic":"Add Clinic"}</button>
        </form>


    </div>

      <h2>Clinic List</h2>
        <table>
            <thead>
            <tr>
                <th>Clinic ID</th>
                <th>Clinic Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Website</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
                 {allClinics?allClinics:<p>No clinics found</p>}
                 
            </tbody>   
        </table>
    </div>


    </>
  );
};
export default Clinic;