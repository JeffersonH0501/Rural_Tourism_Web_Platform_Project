import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./ProdAgricolasDetail.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';

function ProdAgricolasDetail() {

  const {t, i18n} = useTranslation(["trad"]);

  let { idproducto } = useParams();

  const [product, setProduct] = useState(null);
  
  //Simula la petición a la API de un producto con cierto ID
  useEffect(() => {
    async function fetchProd() {
        const response = await fetch('https://raw.githubusercontent.com/sgoncalves13/RetoReact/main/productosAgricolas.json');
        const productsData = await response.json();
        productsData.forEach(product => {
            console.log(product.id);
            if(product.id == idproducto){
                setProduct(product);
            } 
        });
    }
    fetchProd();
}, [idproducto]);
  
const handleDelete = () => {
  // Muestra un cuadro de diálogo de confirmación
  const confirmDelete = window.confirm(t("HU04-confimarcioneliminar"));
  if (confirmDelete) {
    // Lógica para eliminar el elemento

  } else {
    // Si el usuario cancela, simplemente puedes hacer un return o mostrar un mensaje
  }
};

  if (product === null){
    return (<div>{t("HU02-HU02-cargando")}</div>)
  }
  else{
  return (
        <div>
            <div className="userinfo">
                <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
                <p>Jefferson Hernandez<img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
            </div>
            <h1 className="tituloeditar">{t("HU02-editarproductoagricola")}</h1>
            <div className="creacion">
                <div className="campo">
                    <label htmlFor="nombre">{t("HU01-nombre")}</label>
                    <input type="text" id="nombre" placeholder={t("HU01-nombre")} defaultValue={product.nombre}/>
                </div>
                <div className="campo">
                    <label htmlFor="precio">{t("HU02-precio")}</label>
                    <input type="text" id="precio" placeholder={t("HU02-precio")} defaultValue={product.precio}/>
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">{t("HU02-disponibilidad")}</label>
                    <input type="text" id="cantidad" placeholder={t("HU02-disponibilidad")} defaultValue={product.disponibilidad}/>
                </div>
                <div className="campo-descripcion">
                    <label htmlFor="descripcion">{t("HU02-descripcion")}</label>
                    <textarea id="descripcion" placeholder={t("HU02-descripcion")} defaultValue={product.descripcion}></textarea>
                </div>
                <div className="campo-upload-box">
                    <label htmlFor="upload" className="upload-box">
                    {t("HU03-nuevoinputimagen")}
                        <input type="file" id="upload" hidden />
                    </label>
                </div>
          </div>
          <div className="fondo">
                <button className="guardar">{t("HU03-GuardarCambios")}</button>
                <button onClick={handleDelete} className="eliminar">{t("HU03-Eliminar")}</button>
          </div>
      </div>
    );
  }
}

export default ProdAgricolasDetail;