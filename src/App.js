import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaginaPrincipal from "./componentes/PaginaPrincipal/PaginaPrincipal";
import Productos from "./componentes/HU06/Productos";
import Artesanias from "./componentes/HU06/Artesanias";
import ListaProdAgricolas from "./componentes/HU02/ListaProdAgricolas";
import ProdAgricolasDetail from "./componentes/HU02/ProdAgricolasDetail";
import CrearProductoAgricola from "./componentes/HU02/CrearProductoAgricola";
import ListProdArtesanos from "./componentes/HU03/ListProdArtesanos";
import ProdArtesanosDetail from "./componentes/HU03/ProdArtesanosDetail";
import CrearProducto from "./componentes/HU03/CrearProductoArtesano";
import Promo from "./componentes/HU07/Promocion";
import Login from "./componentes/HU01/Inicio";
import Registro from "./componentes/HU01/Registro";
import ListRecorridos from "./componentes/HU04/ListadoRecorridos";
import RecorridoDetail from "./componentes/HU04/RecorridoDetail";
import CrearRecorrido from "./componentes/HU04/CrearRecorrido";
import ListaHospedajes from "./componentes/HU05/ListaHospedajes";
import HospedajesDetail from "./componentes/HU05/HospedajesDetail";
import CrearHospedaje from "./componentes/HU05/CrearHospedaje";
import Dashboard from "./componentes/HU08/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<PaginaPrincipal/>} />
          <Route path="/inicio" element={<Login/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/productosCliente" element={<Productos/>} />
          <Route path="/artesaniasCliente" element={<Artesanias/>} />
          <Route path="/ProdAgricolas" element={<ListaProdAgricolas/>} />
          <Route path="/ProdAgricolas/:idproducto" element={<ProdAgricolasDetail />} />
          <Route path="/ProdAgricolas/Crear" element={<CrearProductoAgricola/>} />
          <Route path="/ProdArtesanos" element={<ListProdArtesanos/>} />
          <Route path="/ProdArtesanos/:idproducto" element={<ProdArtesanosDetail />} />
          <Route path="/ProdArtesanos/Crear" element={<CrearProducto/>} />
          <Route path="/promo" element={<Promo/>} />
          <Route path="/Recorridos" element={<ListRecorridos/>} />
          <Route path="/Recorridos/:idrecorrido" element={<RecorridoDetail />} />
          <Route path="/Recorridos/Crear" element={<CrearRecorrido/>} />
          <Route path='/Hospedajes' element={<ListaHospedajes/>} />
          <Route path="/Hospedajes/:idhospedaje" element={<HospedajesDetail />} />
          <Route path="/Hospedajes/Crear" element={<CrearHospedaje/>} />
          <Route path="/Dashboard/:idusuario" element={<Dashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App