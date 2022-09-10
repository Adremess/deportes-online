import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaugh } from '@fortawesome/free-regular-svg-icons';
import SignOut from '../../menu/signOut/SignOut';
// import instance from "../../../../../Utils/axiosInstance";
import { SessionContext } from '../../../../context/sessionContext';
import './reservas.css';

function Exito() {

  const { userInfo } = useContext(SessionContext);
  const { state } = useLocation();
  const clubes = {
    'P': 'Pedro Bidegain',
    'A': 'Almagro',
    'M': '25 de Mayo',
    'G': 'Grün',
    'T': 'La Terraza'
  };
  const sports = {
    'F': 'Fútbol 5',
    'P': 'Padel',
    'T': 'Tenis'
  };

  console.log(state);
  // async function getReservations() {

  //Pendiente hacer uso de reservaciones en front (data);
  // const { data } = await instance.get('/reservations', { params: { username: userInfo.username } });
  // }

  return (
    <div>
      <div class="p-3"><FontAwesomeIcon icon={faFaceLaugh} size='10x' /></div>
      <div class="p-3"><h1>La reserva se realizó correctamente</h1></div>

      {state?.club ?
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
            <tr class="table-active">
              <td>{sports[state.sport]}</td>
              <td>{clubes[state.club]}</td>
              <td>{state.date}</td>
              <td>{state.time}</td>
            </tr>
          </tbody>
        </table>
        : <div class="container alert alert-info" role="alert">
          No tiene reservas hechas!
        </div>}

      <div class="row p-4">
        <div class="col-2">
          <button type="button" className="btn btn-success"><a className="enlace" id="enlace" href="/">Página principal</a></button>
        </div>
        <div class="col-1">
          <button type="button" className="btn btn-warning"><a className="enlace" id="enlace" href={`${userInfo.username}`}>Mi perfil</a></button>
        </div>
        <div class="col-2">
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Exito;
