import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import "./ListadoRecorridos.css";
import logoImage from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from 'react-i18next';

function ListRecorridos() {

    const {t, i18n} = useTranslation(["trad"])

    const [tours, setTours] = useState([]);
    const [searchText, setSearchText] = useState('');

    let navigate = useNavigate();
  
    function irADetalleTour(idrecorrido) {
        navigate(`/Recorridos/${idrecorrido}`);
    }

    function CrearTour() {
        navigate(`/Recorridos/Crear`);
    }

    useEffect(() => {
        async function fetchProd() {
            const response = await fetch('https://raw.githubusercontent.com/sgoncalves13/RetoReact/main/Recorridos%20(1).json');
            const toursData = await response.json();
            setTours(toursData);
        }
        fetchProd();
    }, []);

    const filteredTours = tours.filter(tour =>
        tour.Titulo.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="ListaProductosAgricolas">

            <div className="HeaderList">
                <img src={logoImage} alt="Logo de ColombiArte" />
                <input type="text" placeholder={t("HU04-placeholderlist")} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={() => CrearTour()}>{t("HU04-Crearrecorrido")}</button>
            </div>

            <div className="Listado">
                {filteredTours.length > 0 ? filteredTours.map((tour) => (
                    <div key={tour.id} className="product-card" onClick={() => irADetalleTour(tour.id)}>
                        <img src={tour.Imagen} alt={tour.Titulo} />
                        <h3>{tour.Titulo}</h3>
                        <p>{t("HU04-fecha")} {tour.Fecha}</p>
                        <p>{t("HU04-hora")} {tour.Hora}</p>
                        <p>{t("HU04-ubicacion")} {tour.Ubicacion}</p>
                    </div>
                )) : <p>{t("HU04-noseencuentra")}</p>}
            </div>
        </div>
    );
}

export default ListRecorridos;
