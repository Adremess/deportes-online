import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionContext } from '../../context/sessionContext';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = ({ closeModal }) => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const { setUserInfo } = useContext(SessionContext);
  const Navigate = useNavigate()

  function handleChange(event) {
    let newInput = input;
    newInput[event.target.name] = event.target.value;
    setInput({ ...newInput });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { data } = await axios.post('http://localhost:8080/login', input,
      {
        withCredentials: true
      });
    closeModal("login");
    if (data === "error") {
      return alert("Revisá que la cuenta haya sido confirmada o que los datos ingresados estén correctos");
    }
    Cookie.set('fsuid', JSON.stringify(data));
    setUserInfo(data);
    Navigate('/');

    if (validate()) {
      let newInput = {};
      input["username"] = "";
      input["password"] = "";
      setInput({ ...newInput });
    }

  }

  function validate() {
    let newInput = input;
    let newErrors = {};
    let isValid = true;

    if (!newInput["username"]) {
      isValid = false;
      newErrors["username"] = "Por favor, ingrese su usuario.";
    }

    /*   if (typeof input['name"] !== "undefined"){
        const sim = /^\S*$/;
        if(input["name"].length < 3 || !sim.test(input["name"])){
            isValid = false;
            errors["name"] = "Please enter valid username.";
        }
      } */

    if (!newInput["password"]) {
      isValid = false;
      newErrors["password"] = "Por favor, ingrese su contraseña.";
    }

    setErrors({ ...newErrors });

    return isValid;
  }

  return (
    <form className="mb-3" onSubmit={handleSubmit} >
      <div className="form-group row mb-3">
        <label id="label_contacto" className="col-3">Usuario</label>
        <div className="col-9" >
          <input
            type="text"
            name="username"
            value={input?.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingrese su usuario" />
        </div>
        <div className="text-danger">{errors?.username}</div>
      </div>
      <div className="form-group row mb-3">
        <label id="label_contacto" className="col-3">Contraseña</label>
        <div className="col-9" >
          <input
            type="password"
            name="password"
            value={input?.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingrese su contraseña" />
        </div>
        <div className="text-danger">{errors?.password}</div>
      </div>

      <div className="text-center">
        <button type="submit" value="Submit" className="btn btn-success">Ingresar</button>
      </div>

      {/* <button type="submit" value="Submit"  className="btn btn-secondary">Cancelar</button> */}

    </form>
  )
}

export default Login;
