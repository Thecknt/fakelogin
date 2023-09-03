import { useReducer, useState } from "react";
import { usersReducers } from "../reducers/userReducers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    username: 'pepe',
    password: '12345',
    email: 'pepe@correo.com',
  },
];

const initialUserForm = {
  id: 0,
  username: '',
  password: '',
  email: '',
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducers, initialUsers); // lo uso porque voy a tener varias acciones

  const [userSelected, setUserSelected] = useState(initialUserForm);

  const [visibleForm, setVisibleForm] = useState(false);

  const navigate = useNavigate();

  const handlerAddUser = (user) => {
    let type;
    if (user.id === 0) {
      type = "addUser";
    } else {
      type = "updateUser";
    }
    dispatch({
      type: type, // puedo ponerla sin los dos puntos porque el nombre es igual
      payload: user,
    });

    Swal.fire(
      user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
      user.id === 0
        ? "El Usuario ha sido creado con exito!"
        : "El Usuario ha sido Actualizado con exito!",
      "success"
    );
    //   setVisibleForm(false);
    //   setUserSelected(initialUserForm);
    handlerCloseForm();
    navigate('/users');
  };

  const handlerRemoveUser = (id) => {
    Swal.fire({
      title: "Esta Seguro/a que desea Eliminar?",
      text: "Recuerde que no podrá deshacer este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "removeUser",
          payload: id,
        });

        Swal.fire(
          "Usuario Eliminado!",
          "El Usuario ha sido Eliminado con exito.",
          "success"
        );
      }
    });
  };

  const handlerUserSelectedForm = (user) => {
    // console.log(user);
    setVisibleForm(true);
    setUserSelected({ ...user });
  };

const handlerOpenForm = () => {
    setVisibleForm(true);
  }

const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  }
  
  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
  };
};
