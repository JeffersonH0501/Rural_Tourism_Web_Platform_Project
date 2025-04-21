import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ListaHospedajes.css";
import logoImage from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from 'react-i18next';

function ListaHospedajes() {

    const {t, i18n} = useTranslation(["trad"])

    const [hospedajes, setHospedajes] = useState([]);
    const [searchText, setSearchText] = useState('');

    let navigate = useNavigate();
  
    function irADetalleHospedaje(idhospedaje) {
        navigate(`/Hospedajes/${idhospedaje}`);
    }

    function CrearHospedaje() {
        navigate(`/Hospedajes/Crear`);
    }

    useEffect(() => {
        async function fetchProd() {
            const response = await fetch('https://raw.githubusercontent.com/JuanPabloUni/lab9/main/data.json');
            const hospedajesData = await response.json();
            setHospedajes(hospedajesData);
        }
        fetchProd();
    }, []);

    const filteredHospedajes = hospedajes.filter(hospedaje =>
        hospedaje.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="ListaHospedajes">

            <div className="HeaderList">
                <img src={logoImage} alt="Logo de ColombiArte" />
                <input type="text" placeholder={t("HU05-placeholderlist")} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={() => CrearHospedaje()}>{t("HU05-crearhospedaje")}</button>
            </div>

            <div className="Listado">
                {filteredHospedajes.length > 0 ? filteredHospedajes.map((hospedaje) => (
                    <div key={hospedaje.id} className="hospedaje-card" onClick={() => irADetalleHospedaje(hospedaje.id)}>
                        <img src={hospedaje.image} alt={hospedaje.name} />
                        <h3>{hospedaje.name}</h3>
                        <p><strong>{t("HU05-precio")}</strong> {hospedaje.price}</p>
                        <p><strong>{t("HU05-disponibilidad")}</strong> {hospedaje.available ? t("si") : "No"}</p>
                    </div>
                )) : <p>{t("HU05-noseencuentra")}</p>}
            </div>
        </div>
    );
}

export default ListaHospedajes;
