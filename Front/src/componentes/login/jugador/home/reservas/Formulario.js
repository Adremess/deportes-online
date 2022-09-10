
import 'bootswatch/dist/minty/bootstrap.min.css';
import './reservas.css';
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import instance from "../../../../../Utils/axiosInstance"
import { SessionContext } from '../../../../context/sessionContext';
import axios from 'axios';

const formatDate = ({ date }) => {

  let splitDate = date.split("-");

  let newDate = splitDate.slice(1);

  newDate.push(splitDate[0]);

  newDate = newDate.join("-");
  console.log(newDate);
  return newDate;
}
function FormReservas() {
  const { userInfo } = useContext(SessionContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {

      // data.date = formatDate(data);

      let day = new Date(data.date).getDay();

      day = day > 0 && day < 6 ? 1 : 2;

      // data.id = `${data.club}${data.sport}${day}`

      // const params = new URLSearchParams();

      // Object.entries(data).map(pair => {

      //   return params.append(pair[0], pair[1]);

      // });

      // params.append("username", userInfo.username);
      reset();

      const response = await axios.post("http://localhost:8080/create-reservation", 
        {
          ...data, 
          username: userInfo.username,
          id: `${data.club}${data.sport}${day}`
        }, 
        {
          withCredentials: true
        }
        ).catch(err => console.log(err));
      
      if (response.data.session) {
        console.log('response.data.session', response.data.session);
        Navigate(`${response.data.session}`);

      } else if (response.data) {
        console.log('response.data', response.data);
        // Navigate(`${response.data.url}`);
        Navigate('/success', { state: data });
      } else {

        Navigate(`/`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // var max = new Date('01/01/2023');
  // var hoy = new Date();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="row p-2">
          <label id="label_contacto" className="col-sm-1 p-2">Deporte</label>
          <div className="col-sm-5 p-2">
            <select className="form-select" name="sport" {...register("sport", { required: "Seleccione una opción" })}>
              <option value="" selected disabled>Elegí un deporte</option>
              <option value="F">Fútbol 5</option>
              <option value="P">Padel</option>
              <option value="T">Tenis</option>
            </select>
            <div className="text-danger">{errors?.sport?.type === "required" && <p>Seleccione una opción</p>}</div>
          </div>

          <label id="label_contacto" className="col-sm-1 p-2">Club</label>
          <div className="col-sm-5 p-2">
            <select className="form-select" name="club"{...register("club", { required: "Seleccione una opción" })}>
              <option value="" selected disabled>Elegí un club</option>
              <option value="P">Pedro Bidegain</option>
              <option value="A">Almagro</option>
              <option value="M">25 de Mayo</option>
              <option value="G">Grün</option>
              <option value="T">La Terraza</option>
            </select>
            <div className="text-danger">{errors?.club?.type === "required" && <p>Seleccione una opción</p>}</div>
          </div>
        </div>

        <div className="row p-2">
          <label id="label_contacto" className="col-sm-1 p-2">Fecha</label>
          <div className="col-sm-5 p-2">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              max={new Date('01/01/2023').toISOString().split("T")[0]}
              name="date"
              className="form-control" {...register("date", {
                required: true,
              })} />
            <div className="text-danger">{errors?.date?.type === "required" && <p>Seleccione una opción</p>}</div>
          </div>
          <label id="label_contacto" className="col-sm-1 p-2">Hora</label>
          <div className="col-sm-5 p-2">
            <select className="form-select" name="time" {...register("time", { required: "Seleccione una opción" })}>
              <option value="" selected disabled>Elegí el horario</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
            </select>
            <div className="text-danger">{errors?.time?.type === "required" && <p>Seleccione una opción</p>}</div>
          </div>
          <div className="row p-2">
            <label id="label_contacto" className="col-sm-3 p-2">Método de pago</label>
            <div className="col-sm-5 p-2">
              <select className="form-select" name="paymentMethod" {...register("paymentMethod", { required: "Seleccione una opción" })}>
                <option value="" selected disabled>Elegí método de pago</option>
                <option value="Cash">Efectivo</option>
                <option value="Card">Tarjeta de Crédito</option>
              </select>
              <div className="text-danger">{errors?.paymentMethod?.type === "required" && <p>Seleccione una opción</p>}</div>
            </div>
          </div>
        </div>
        <div id="boton">
          <button type="submit" value="Submit" className="btn btn-primary">Confirmar</button>
        </div>

      </form>
    </div>
  )
}

export default FormReservas;
