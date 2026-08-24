import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import "./CrearProductoArtesano.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';

function CrearProducto() {

  const {t, i18n} = useTranslation(["trad"])

  let navigate = useNavigate();

  const usuarioId =  JSON.parse(localStorage.getItem('usuario')).id

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [material, setMaterial] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [origen, setOrigen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('https://loremflickr.com/640/480');

  const token = localStorage.getItem('token');

  const artesaniaId = ''

  const agregarArtesaniaaUsuario = async (usuarioId, artesaniaId) => {
    try {
      const response = await fetch(`http://localhost:4000/usuario-artesanias/${usuarioId}/artesanias/${artesaniaId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('La solicitud falló con estado ' + response.status);
      }
  
      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  }

  const handleSubmit = async (event) => {
    console.log(usuarioId)
    event.preventDefault();
    const artesania = { Nombre: nombre, Precio: parseFloat(precio), Cantidad: parseInt(cantidad), Material: material, Disponibilidad: disponibilidad, Origen: origen, Descripcion: descripcion, Imagen: imagen };
    const response = await fetch('http://localhost:4000/artesanias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(artesania),
    });
    if (response.status === 201){
        const responseData = await response.json();
        const artesaniaId = responseData.id
        agregarArtesaniaaUsuario(usuarioId, artesaniaId)
        alert('Artesania creada correctamente')
        navigate(`/ProdArtesanos`);
    }else{
        alert('Error al crear la artesania')
    }
  };
  
  return (
    <div>
        <div className="userinfo">
            <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
            <p>Samuel Goncalves V  <img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
        </div>
    <h1 className="titulocrear">{t("HU03-nuevoproductoartesanal")}</h1>
      <div className="creacion">
    <div className="campo">
        <label htmlFor="nombre">{t("HU03-nuevoNombre")}</label>
        <input type="text" id="nombre" placeholder={t("HU03-nuevoNombre")} value={nombre} onChange={e => setNombre(e.target.value)} />
    </div>
    <div className="campo">
        <label htmlFor="precio">{t("HU03-nuevoPrecio")}</label>
        <input type="text" id="precio" placeholder={t("HU03-nuevoPrecio")} value={precio} onChange={e => setPrecio(e.target.value)} />
    </div>
    <div className="campo">
        <label htmlFor="cantidad">{t("HU03-nuevoCantidad")}</label>
        <input type="text" id="cantidad" placeholder={t("HU03-nuevoCantidad")} value={cantidad} onChange={e => setCantidad(e.target.value)} />
    </div>
    <div className="campo-descripcion">
        <label htmlFor="descripcion">{t("HU03-nuevoDescripcion")}</label>
        <textarea id="descripcion" placeholder={t("HU03-nuevoDescripcion")} value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>
    </div>
    <div className="campo-upload-box">
        <label htmlFor="upload" className="upload-box">
                {t("HU03-nuevoinputimagen")}
            <input type="file" id="upload" hidden />
        </label>
    </div>
</div>

      <div className="fondo">
            <button onClick={handleSubmit}>{t("HU03-agregar")}</button>
      </div>
    </div>
    );
}

export default CrearProducto;
