import React from 'react';
import './contacto.css';
import { useForm } from "react-hook-form";
import instance from "../../../Utils/axiosInstance"

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const params = new URLSearchParams();
      Object.entries(data).map(pair => {
        return params.append(pair[0], pair[1]);
      })
      reset();
      await instance.post("contact", params);
      alert("Mensaje enviado con éxito")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-2">

      <div className="form-group row mb-3">
        <div className="col-6">
          <label id="label_contacto" className="col-m-3">Nombre y apellido</label>
          <div className="col-m-9">
            <input
              className="form-control"
              name="name"
              type="text"
              {...register("name", {
                required: true,
              })} />
          </div>
          <div className="text-danger">
            {errors?.name?.type === "required" && <p>Este campo es requerido</p>}</div>

        </div>
      </div>

      <div className="form-group row mb-3">
        <div className="col-6">
          <label id="label_contacto" className="col-m-3">Email</label>
          <div className="col-m-9">
            <input
              className="form-control"
              name="email"
              type="email"
              {...register("email", {
                required: true,
                pattern: new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
              })} />
          </div>
          <div className="text-danger">
            {errors?.email?.type === "required" && <p>Este campo es requerido</p>}
            {errors?.email?.type === "pattern" && (<p>Ingrese un email válido</p>)}</div>
        </div>
      </div>

      <div className="form-group row mb-3">
        <div className="col-6">
          <label id="label_contacto" className="col-m-3">Club</label>
          <div className="col-m-9">
            <select className="form-select" name="club" {...register("club", { required: "Seleccione una opción" })}>
              <option value="" selected disabled>Seleccione un club</option>
              <option value="bidegain">Pedro Bidegain</option>
              <option value="almagro">Almagro</option>
              <option value="25demayo">25 de Mayo</option>
              <option value="grun">Grün</option>
              <option value="terraza">La Terraza</option>
            </select>
          </div>
          <div className="text-danger">{errors?.club?.type === "required" && <p>Seleccione una opción</p>}</div>
        </div>
      </div>

      <div className="form-group row mb-3">
        <div className="col-6">
          <label id="label_contacto" className="col-m-3">Asunto</label>
          <div className="col-m-9">
            <input className="form-control" name="subject" type="text"
              {...register("subject", {
                required: true,
              })} />
          </div>
          <div className="text-danger">
            {errors?.subject?.type === "required" && <p>Este campo es requerido</p>}</div>
        </div>
      </div>

      <div className="form-group row mb-3">
        <div className="col-6">
          <label id="label_contacto" className="col-m-3">Mensaje</label>
          <div className="col-m-9">
            <textarea className="form-control" name="message" type="text"
              {...register("message", {
                required: true,
              })} />
          </div>
          <div className="text-danger">
            {errors?.message?.type === "required" && <p>Este campo es requerido</p>}</div>
        </div>
      </div>

      <button type="submit" value="Submit" className="btn btn-outline-dark btn-lg">Enviar</button>
    </form>
  )
}

export default Contact;
