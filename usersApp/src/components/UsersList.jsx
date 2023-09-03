/* eslint-disable react/prop-types */
import { useContext } from "react"
import { UserRow } from "./UserRow"
import { UserContext } from "../context/UserContext"



export const UsersList = () => {

  const { users } = useContext(UserContext);

  return (
    <>
    <h5 className="lettersColors">Listado de Usuarios</h5>
    <table className="table table-hover table-striped container-fluid">
<thead>
<tr>
  <th>Id</th>
  <th>Username</th>
  <th>Email</th>
  <th>Update</th>
  <th>Update route</th>
  <th>Remove</th>
</tr>
</thead>
<tbody>
{
  users.map(({id, username, email}) => (
    <UserRow  
    key={id} 
    id={id} 
    username={username} 
    email={email}/>
  )
  
)}
</tbody>
    </table>
    </>
  )
}
