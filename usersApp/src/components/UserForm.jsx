/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
export const UserForm = ({ userSelected, handlerCloseForm }) => {
  
  const { initialUserForm, handlerAddUser } = useContext(UserContext);
  
  const [userForm, setUserForm] = useState(initialUserForm);

  const { id, username, password, email } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: "", //Por seguridad se limpia el campo password
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (!username || (!password && id === 0) || !email) {
      Swal.fire(
        // valido que esten completos los campos
        "Faltan Datos!",
        "Todos los campos son obligatorios!",
        "error"
      );

      return;
    }

    if (!email.includes('@')) {
      Swal.fire(
        // valido que esten completos los campos
        "Email Incorrecto!",
        "El email debe ser válido!",
        "error"
      );

      return;
    }
    handlerAddUser(userForm); //envio datos del formulario a la funcion de guardar usuario
    setUserForm(initialUserForm); //limpio el formulario al enviarlo
  };

  const onCloseForm = ()=>{
    handlerCloseForm();
    setUserForm(initialUserForm);
  }
  
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="form-control my-3 w-75"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onInputChange}
        />
        {id > 0 ? (
          ""
        ) : (
          <input
            className="form-control my-3 w-75"
            placeholder="Password"
            type="password"
            name="password"
            //autoComplete="on"
            value={password}
            onChange={onInputChange}
          />
        )}

        <input
          className="form-control my-3 w-75"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="btn btn-primary">
          {id > 0 ? "Editar" : "Crear"}
        </button>

        {!handlerCloseForm || <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={()=>onCloseForm()}
        >
          Cerrar
        </button>}
        
      </form>
    </>
  );
};
