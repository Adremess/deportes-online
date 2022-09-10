import React, { useContext, useState } from 'react';
import './perfil.css';
import { SessionContext } from '../../../../context/sessionContext';
import axios from 'axios';

const Perfil = () => {
  const [reservations, setReservations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const { userInfo } = useContext(SessionContext);

  if (loading) {
    async function getReservations() {
      await axios.post('http://localhost:8080/reservation-info',
        {
          username: userInfo.username,
        },
        {
          withCredentials: true
        })
        .then(async res => setReservations(await res.data))
        .catch(err => console.log(err));
    }
    getReservations();
    setLoading(false);
  }

  const handleSubmit = (event) => {
    console.log(event);
  };

  return (
    <>
      <div id="perfilPrincipal" className="container-fluid">

        <div id="perfil"><h1 className="display-3">Mi perfil</h1></div>
        <div id="perfil"><h2>Mis datos personales</h2></div>

        {/* TODO: EDIT PROFILE FN*/}
        
        <div id="perfil" >
          {edit ?
            <form onSubmit={handleSubmit}>
              <table id="tabla" className="table table-hover">
                <tbody>
                  <tr className="table-active">
                    <th scope="row">Nombre</th>
                    <td><input placeholder={userInfo.name} /></td>
                  </tr>
                  <tr>
                    <th scope="row">Apellido</th>
                    <td><input placeholder={userInfo.lastName} /></td>
                  </tr>
                  <tr className="table-active">
                    <th scope="row">Dirección</th>
                    <td><input placeholder={userInfo.address} /></td>
                  </tr>
                </tbody>
              </table>
            </form>
            :
            <table id="tabla" className="table table-hover">
              <tbody>
                <tr className="table-active">
                  <th scope="row">Nombre</th>
                  <td>{userInfo.name}</td>
                </tr>
                <tr>
                  <th scope="row">Apellido</th>
                  <td>{userInfo.lastName}</td>
                </tr>
                <tr className="table-active">
                  <th scope="row">Dirección</th>
                  <td>{userInfo.address}</td>
                </tr>
              </tbody>
            </table>
          }


        </div>

        <div id="perfil"><h2>Mis reservas</h2></div>
        <div id="perfil"><h3>Canchas</h3></div>
        <div id="perfil" >
          {reservations ?
            <table id="tabla" className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Deporte</th>
                  <th scope="col">Club</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Hora</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((item, key) => {
                  return <tr key={key} class="table-active">
                    <td>{item.sport}</td>
                    <td>{item.court}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                  </tr>
                })}
              </tbody>
            </table>
            : <div class="container alert alert-info" role="alert">
              No tiene reservas hechas!
            </div>}
        </div>
      </div>
    </>
  )
}

export default Perfil;
