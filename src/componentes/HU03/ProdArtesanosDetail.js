import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import "./ProdArtesanosDetail.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';


function ProdArtesanosDetail() {

  const {t, i18n} = useTranslation(["trad"])

  let { idproducto } = useParams();

  let navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const id = idproducto

  const token = localStorage.getItem('token');
  
  const [artesania, setArtesania] = useState(null); // Estado para almacenar la artesanía
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la indicación de carga
  const [error, setError] = useState(null); // Estado para almacenar posibles errores

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [material, setMaterial] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [origen, setOrigen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('https://loremflickr.com/640/480');

  const fetchArtesania = async () => {
    console.log(id)
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/artesanias/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      setArtesania(data);
      setNombre(data.Nombre)
      setPrecio(data.Precio)
      setCantidad(data.Cantidad)
      setMaterial(data.Material)
      setDisponibilidad(data.Disponibilidad)
      setOrigen(data.Origen)
      setDescripcion(data.Descripcion)
      setImagen(data.Imagen)
    } catch (error) {
      setError('Failed to fetch artesania: ' + error.message);
      console.error('There was an error!', error);
    }
    setIsLoading(false);
  };

    // Efecto para cargar la artesanía cuando el componente se monta o el id cambia
    useEffect(() => {
      fetchArtesania();
    }, [id]); // Dependencia en id


  
    const handleEdit = async (event) => {
      event.preventDefault();
      const artesania = { Nombre: nombre, Precio: parseFloat(precio), Cantidad: parseInt(cantidad), Material: material, Disponibilidad: disponibilidad, Origen: origen, Descripcion: descripcion, Imagen: imagen };
      console.log(artesania)
      const response = await fetch(`http://localhost:4000/artesanias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(artesania),
      });
      if (response.status === 200){
          const responseData = await response.json();
          console.log(responseData)
          alert('Artesania editada correctamente')
          navigate(`/ProdArtesanos`);
      }else{
          alert('Error al crear la artesania')
      }
    };
  
  
const handleDelete = async () => {
  // Muestra un cuadro de diálogo de confirmación
  const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este elemento?");
  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:4000/artesanias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Artesanía eliminada con éxito");
      navigate(`/ProdArtesanos`);
    } catch (error) {
      console.error('Error al eliminar la artesanía:', error);
    }

  } else {
    // Si el usuario cancela, simplemente puedes hacer un return o mostrar un mensaje
  }
};

if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
if (!artesania) return <p>No se encontró la artesanía.</p>;

  return (
        <div>
            <div className="userinfo">
                <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
                <p>Samuel Goncalves V  <img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
            </div>
          <h1 className="tituloeditar">{t("HU03-Editarproducto")}</h1>
         <div className="creacion">
    <div className="campo">
        <label htmlFor="nombre">{t("HU03-nuevoNombre")}</label>
        <input type="text" id="nombre" placeholder={t("HU03-nuevoNombre")} defaultValue={artesania.Nombre} onChange={e => setNombre(e.target.value)}/>
    </div>
    <div className="campo">
        <label htmlFor="precio">{t("HU03-nuevoPrecio")}</label>
        <input type="text" id="precio" placeholder={t("HU03-nuevoPrecio")} defaultValue={artesania.Precio} onChange={e => setPrecio(e.target.value)}/>
    </div>
    <div className="campo">
        <label htmlFor="cantidad">{t("HU03-nuevoCantidad")}</label>
        <input type="text" id="cantidad" placeholder={t("HU03-nuevoCantidad")} defaultValue={artesania.Cantidad} onChange={e => setCantidad(e.target.value)}/>
    </div>
    <div className="campo-descripcion">
        <label htmlFor="descripcion">{t("HU03-nuevoDescripcion")}</label>
        <textarea id="descripcion" placeholder={t("HU03-nuevoDescripcion")} defaultValue={artesania.Descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
    </div>
    <div className="campo-upload-box">
        <label htmlFor="upload" className="upload-box">
            {t("HU03-nuevoinputimagen")}
            <input type="file" id="upload" hidden />
        </label>
    </div>
</div>
          <div className="fondo">
                <button onClick={handleEdit} className="guardar">{t("HU03-GuardarCambios")}</button>
                <button onClick={handleDelete} className="eliminar">{t("HU03-Eliminar")}</button>
          </div>
        </div>
    );
  }


export default ProdArtesanosDetail;
