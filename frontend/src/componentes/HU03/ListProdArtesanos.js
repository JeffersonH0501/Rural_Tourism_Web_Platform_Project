import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import "./ListProdAgricolas.css";
import logoImage from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from 'react-i18next';

function ListProdAgricolas() {

    const {t, i18n} = useTranslation(["trad"])

    const usuarioId =  JSON.parse(localStorage.getItem('usuario')).id

    
    const token = localStorage.getItem('token');

    const [artesanias, setArtesanias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchText, setSearchText] = useState('');

    let navigate = useNavigate();


  
    function irADetalleProducto(idproducto) {
        navigate(`/ProdArtesanos/${idproducto}`);
    }

    function CrearProducto() {
        navigate(`/ProdArtesanos/Crear`);
    }

    useEffect(() => {
    const fetchArtesanias = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:4000/usuario-artesanias/${usuarioId}/artesanias`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtesanias(data); // Asumiendo que la respuesta es un array de artesanías
      } catch (error) {
        setError('Failed to fetch artesanias: ' + error.message);
        console.error('There was an error!', error);
      }

      setIsLoading(false);
    };

    fetchArtesanias();
  }, [usuarioId]); // Dependencia para re-ejecutar el useEffect si usuarioId cambia


    const filteredArtesanias = artesanias.filter(artesania =>
        artesania.Nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="ListaProductosAgricolas">

            <div className="HeaderList">
                <img src={logoImage} alt="Logo de ColombiArte" />
                <input type="text" placeholder={t("HU03-placeholderlist")} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={() => CrearProducto()}>{t("HU04-CrearArtesania")}</button>
            </div>

            <div className="Listado">
                {filteredArtesanias.length > 0 ? filteredArtesanias.map((artesania) => (
                    <div key={artesania.id} className="product-card" onClick={() => irADetalleProducto(artesania.id)}>
                        <img src={artesania.Imagen} alt={artesania.Nombre} />
                        <h3>{artesania.Nombre}</h3>
                        <p>{t("HU03-precio")} {artesania.Precio}</p>
                        <p>{t("HU03-cantidad")} {artesania.Cantidad}</p>
                    </div>
                )) : <p>{t("HU03-noseencuentra")}</p>}
            </div>
        </div>
    );
}

export default ListProdAgricolas;
