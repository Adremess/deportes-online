import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import FormReservas from './Formulario';
import './reservas.css';

const Reservas = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-outline-dark btn-lg btn-block m-3" variant="" onClick={handleShow}>Reservar cancha</Button>
      <Modal show={show} onHide={handleClose} className="modal-lg" >
        <Modal.Header id="modal-reservas" closeButton>
          <Modal.Title>Reserva de cancha</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-reservas">
          <FormReservas />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Reservas;
