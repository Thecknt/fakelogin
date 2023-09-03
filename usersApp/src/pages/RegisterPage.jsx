/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const RegisterPage = () => {
  

  const { users=[], initialUserForm } = useContext(UserContext);

    const [userSelected, setUserSelected ] = useState(initialUserForm);
  
    const { id } = useParams();
    
    useEffect(() => {
        console.log(id);
        if (id) {
          //Si encuentra el id lo llena en user, sino lo hace con el default de initialUserForm
          const user = users.find(u => u.id == id) || initialUserForm;
          setUserSelected(user);
        }
        
    }, [id, initialUserForm, users]);
    
    return (
    <div className="container my-4">
      <h4 className=" lettersColors">{ userSelected.id > 0 ? 'Editar Usuario' : 'Registrar Usuario'}</h4>
      <div className="row">
        <div className="col">
          <UserForm userSelected={userSelected} />
        </div>
      </div>
    </div>
  );
};
