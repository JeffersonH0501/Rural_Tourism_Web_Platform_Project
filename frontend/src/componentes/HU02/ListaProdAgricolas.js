import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ListaProdAgricolas.css";
import logoImage from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from 'react-i18next';

function ListaProdAgricolas() {

    const {t, i18n} = useTranslation(["trad"]);

    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');

    let navigate = useNavigate();
  
    function irADetalleProducto(idproducto) {
        navigate(`/ProdAgricolas/${idproducto}`);
    }

    function CrearProducto() {
        navigate(`/ProdAgricolas/Crear`);
    }

    useEffect(() => {
        async function fetchProd() {
            const response = await fetch('https://raw.githubusercontent.com/sgoncalves13/RetoReact/main/productosAgricolas.json');
            const productsData = await response.json();
            setProducts(productsData);
        }
        fetchProd();
    }, []);

    const filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="ListaProductosAgricolas">

            <div className="HeaderListt">
                <img src={logoImage} alt="Logo de ColombiArte" />
                <input type="text" placeholder={t("HU03-placeholderlist")} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={() => CrearProducto()}>{t("HU02-crearproducto")}</button>
            </div>

            <div className="Listado">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => irADetalleProducto(product.id)}>
                        <img src={product.imagen} alt={product.nombre} />
                        <h3>{product.nombre}</h3>
                        <p><strong>{t("HU02-precio")}:</strong> {product.precio}</p>
                        <p><strong>{t("HU02-disponibilidad")}:</strong> {product.disponibilidad}</p>
                    </div>
                )) : <p>{t("HU04-noseencuentra")}</p>}
            </div>
        </div>
    );
}

export default ListaProdAgricolas;
