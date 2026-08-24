import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HospedajesDetail.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';

function HospedajesDetail() {

  const {t, i18n} = useTranslation(["trad"])

  let { idhospedaje } = useParams();

  const [hospedaje, setHospedaje] = useState(null);

  //Simula la petición a la API de un hospedaje con cierto ID
  useEffect(() => {
    async function fetchProd() {
      const response = await fetch(
        "https://raw.githubusercontent.com/JuanPabloUni/lab9/main/data.json"
      );
      const hospedajesData = await response.json();
      hospedajesData.forEach((hospedaje) => {
        if (hospedaje.id == idhospedaje) {
          console.log(hospedaje);
          setHospedaje(hospedaje);
        }
      });
    }
    fetchProd();
  }, [idhospedaje]);

  const handleDelete = () => {
    // Muestra un cuadro de diálogo de confirmación
    const confirmDelete = window.confirm(
      t("HU05-confirmacioneliminar")
    );
    if (confirmDelete) {
      // Lógica para eliminar el elemento
    } else {
      // Si el usuario cancela, simplemente puedes hacer un return o mostrar un mensaje
    }
  };

  if (hospedaje === null) {
    return <div>{t("HU05-cargando")}</div>;
  } else {
    return (
      <div>
        <div className="userinfo">
          <img src={logoImage} alt="Logo de ColombiArte" className="logod" />
          <p>
            Juan Pablo Hernández
            <img
              src={usuarioimg}
              alt="Logo de ColombiArte"
              className="iconusuario"
            />
          </p>
        </div>
        <h1 className="tituloeditar">{t("HU05-editarhospedaje")}</h1>
        <div className="creacion">
          <div className="campo">
            <label htmlFor="nombre">{t("HU05-nuevonombre")}</label>
            <input
              type="text"
              id="nombre"
              placeholder={t("HU05-nuevonombre")}
              defaultValue={hospedaje.name}
            />
          </div>
          <div className="campo">
            <label htmlFor="precio">{t("HU05-nuevoprecio")}</label>
            <input
              type="text"
              id="precio"
              placeholder={t("HU05-nuevoprecio")}
              defaultValue={hospedaje.price}
            />
          </div>
          <div className="campo">
            <label htmlFor="cantidad">{t("HU05-nuevaubicacion")}</label>
            <input
              type="text"
              id="cantidad"
              placeholder={t("HU05-nuevaubicacion")}
              defaultValue={hospedaje.location}
            />
          </div>
          <div className="campo">
            <label htmlFor="cantidad">{t("HU05-nuevoservicios")}</label>
            <input
              type="text"
              id="cantidad"
              placeholder={t("HU05-nuevoservicios")}
              defaultValue={hospedaje.services}
            />
          </div>
          <div className="campo">
            <label htmlFor="cantidad">{t("HU05-nuevacapacidad")}</label>
            <input
              type="text"
              id="cantidad"
              placeholder={t("HU05-nuevacapacidad")}
              defaultValue={hospedaje.capacity}
            />
          </div>
          <div className="campo-descripcion">
            <label htmlFor="descripcion">{t("HU05-nuevadescripcion")}</label>
            <textarea
              id="descripcion"
              placeholder={t("HU05-nuevadescripcion")}
              defaultValue={hospedaje.description}
            ></textarea>
          </div>
          <div className="campo-upload-box">
            <label htmlFor="upload" className="upload-box">
              {t("HU05-nuevoinputimagen")}
              <input type="file" id="upload" hidden />
            </label>
          </div>
        </div>
        <div className="fondo">
          <div className="button-container">
            <button className="guardar">{t("HU05-guardarcambios")}</button>
            <button onClick={handleDelete} className="eliminar">
              {t("HU05-eliminar")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HospedajesDetail;
