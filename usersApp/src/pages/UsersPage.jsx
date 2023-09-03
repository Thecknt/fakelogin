/* eslint-disable react/prop-types */

// import Swal from "sweetalert2";
import { useContext } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";

export const UsersPage = () => {

  const {
    users,
    visibleForm,
    handlerOpenForm,
  } = useContext(UserContext);
  
  return (
    <>

      {!visibleForm ||
        <UserModalForm />
      }
      <div className="container my-4">
        <h2 className="lettersColors">Users App</h2>
        <div className="row"> 

          <div className="col">
            {visibleForm ||  <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo Usuario
              </button>}
            {users.length === 0 ? ( //valido si hay usuarios, sino hay muestro el cartel
              <div className="alert alert-warning">
                No hay usuarios registrados
              </div>
            ) : (
              <UsersList />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
