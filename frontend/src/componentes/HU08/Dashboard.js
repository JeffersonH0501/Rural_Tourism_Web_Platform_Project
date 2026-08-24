import React, { useState, useEffect } from 'react';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Dashboard() {

    const { t } = useTranslation(["trad"]);

    let navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);

    const storedUserData = localStorage.getItem("usuario");
    const user = JSON.parse(storedUserData);

    const correoBuscado = user.correo;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No hay token JWT. El usuario no está autenticado.');
            return;
        }
        fetch("http://localhost:4000/usuarios", {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de usuarios.');
            }
            return response.json();
        })
        .then(data => {
            const usuarioEncontrado = data.find(usuario => usuario.correo === correoBuscado);
            if (usuarioEncontrado) {
                setUsuario(usuarioEncontrado);
            } else {
                console.log(`No se encontró ningún usuario con el correo ${correoBuscado}`);
            }
        })
        .catch(error => console.error('Error al obtener los usuarios:', error));
    }, [correoBuscado]);

    const irProductos = () =>{
        navigate("/ProdAgricolas");
    }

    const irArtesanias = () =>{
        navigate("/ProdArtesanos");
    }

    const irRecorridos = () =>{
        navigate("/Recorridos");
    }

    const irProductosCliente = () =>{
        navigate("/productosCliente");
    }

    const irArtesaniasCliente = () =>{
        navigate("/artesaniasCliente");
    }

    const irHospedajes = () =>{
        navigate("/Hospedajes");
    }

    if (usuario === null) {
        return (<h1>{t("HU02-HU02-cargando")}</h1>)
    }

    if (usuario.rol === "agricultor"){
    return (
        <div>
            <section className="Dashboard-seccion">

                {usuario ? (
                    <div className="Dashboard-UserProfile">
                        <h1>{t("HU02-panelPricipal")}</h1>
                        <div className="Dashboard-UserInfo">
                            <div className="Dashboard-UserInfo-left">
                                <img className="Dashboard-UserPhoto" src={usuario.foto} alt="Foto de perfil" />
                            </div>
                            <div className="Dashboard-UserInfo-right">
                                <h2>{t("HU02-informaciondelusuario")}</h2>
                                <div className="Dashboard-UserInfo-rightlabel">
                                    <p><strong>{t("HU02-nombre")}</strong></p>
                                    <p>{usuario.nombre}</p>
                                </div>
                                <div className="Dashboard-UserInfo-rightlabel">
                                    <p><strong>{t("HU02-apellido")}</strong></p>
                                    <p>{usuario.apellido}</p>
                                </div>
                                <div className="Dashboard-UserInfo-rightlabel">
                                    <p><strong>{t("HU02-correo")}</strong></p>
                                    <p>{usuario.correo}</p>
                                </div>
                                <div className="Dashboard-UserInfo-rightlabel">
                                    <p><strong>{t("HU02-rol")}</strong></p>
                                    <p>{usuario.rol}</p>
                                </div>
                            </div>
                        </div>

                        <div className="Dashboard-Options">
                            <div className="Dashboard-OptionRow">
                                <button onClick={irProductos}>{t("HU02-vermisproductosagricolas")}</button>
                                <button onClick={irProductosCliente}>{t("HU02-vertodoslosproductosagricolas")}</button>
                                <button onClick={irArtesaniasCliente}>{t("HU02-vertodaslasartesanias")}</button>
                                <button onClick={irRecorridos}>{t("HU02-vermisrecorridos")}</button>
                                <button onClick={irRecorridos}>{t("HU02-verlosrecorridos")}</button>
                                <button onClick={irHospedajes}>{t("Dashboard-vermihospedaje")}</button>
                                <button onClick={irHospedajes}>{t("Dashboard-vertodoshospedaje")}</button>
                            </div>
                        </div>
                     
                    </div>
                ) : (
                    <p>{t("HU02-cargandousuario")}</p>
                )}

                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
                <div className="wave wave4"></div>
            </section>
        </div>
    );
    }else if(usuario.rol==="artesano"){
            return (
                <div>
                    <section className="Dashboard-seccion">
        
                        {usuario ? (
                            <div className="Dashboard-UserProfile">
                                <h1>{t("HU02-panelPricipal")}</h1>
                                <div className="Dashboard-UserInfo">
                                    <div className="Dashboard-UserInfo-left">
                                        <img className="Dashboard-UserPhoto" src={usuario.foto} alt="Foto de perfil" />
                                    </div>
                                    <div className="Dashboard-UserInfo-right">
                                        <h2>{t("HU02-informaciondelusuario")}</h2>
                                        <div className="Dashboard-UserInfo-rightlabel">
                                            <p><strong>{t("HU02-nombre")}</strong></p>
                                            <p>{usuario.nombre}</p>
                                        </div>
                                        <div className="Dashboard-UserInfo-rightlabel">
                                            <p><strong>{t("HU02-apellido")}</strong></p>
                                            <p>{usuario.apellido}</p>
                                        </div>
                                        <div className="Dashboard-UserInfo-rightlabel">
                                            <p><strong>{t("HU02-correo")}</strong></p>
                                            <p>{usuario.correo}</p>
                                        </div>
                                        <div className="Dashboard-UserInfo-rightlabel">
                                            <p><strong>{t("HU02-rol")}</strong></p>
                                            <p>{usuario.rol}</p>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="Dashboard-Options">
                                    <div className="Dashboard-OptionRow">
                                        <button onClick={irArtesanias}>{t("HU02-vermisartesanias")}</button>
                                        <button onClick={irArtesaniasCliente}>{t("HU02-vertodaslasartesanias")}</button>
                                        <button onClick={irProductosCliente}>{t("HU02-vertodoslosproductosagricolas")}</button>
                                        <button onClick={irRecorridos}>{t("HU02-vermisrecorridos")}</button>
                                        <button onClick={irRecorridos}>{t("HU02-verlosrecorridos")}</button>
                                        <button onClick={irHospedajes}>{t("Dashboard-vermihospedaje")}</button>
                                        <button onClick={irHospedajes}>{t("Dashboard-vertodoshospedaje")}</button>
                                    </div>
                                </div>
                             
                            </div>
                        ) : (
                            <p>{t("HU02-cargandousuario")}</p>
                        )}
        
                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                        <div className="wave wave4"></div>
                    </section>
                </div>
            );
    }else if(usuario.rol==="visitante"){
        return (
            <div>
                <section className="Dashboard-seccion">
    
                    {usuario ? (
                        <div className="Dashboard-UserProfile">
                            <h1>{t("HU02-panelPricipal")}</h1>
                            <div className="Dashboard-UserInfo">
                                <div className="Dashboard-UserInfo-left">
                                    <img className="Dashboard-UserPhoto" src={usuario.foto} alt="Foto de perfil" />
                                </div>
                                <div className="Dashboard-UserInfo-right">
                                    <h2>{t("HU02-informaciondelusuario")}</h2>
                                    <div className="Dashboard-UserInfo-rightlabel">
                                        <p><strong>{t("HU02-nombre")}</strong></p>
                                        <p>{usuario.nombre}</p>
                                    </div>
                                    <div className="Dashboard-UserInfo-rightlabel">
                                        <p><strong>{t("HU02-apellido")}</strong></p>
                                        <p>{usuario.apellido}</p>
                                    </div>
                                    <div className="Dashboard-UserInfo-rightlabel">
                                        <p><strong>{t("HU02-correo")}</strong></p>
                                        <p>{usuario.correo}</p>
                                    </div>
                                    <div className="Dashboard-UserInfo-rightlabel">
                                        <p><strong>{t("HU02-rol")}</strong></p>
                                        <p>{usuario.rol}</p>
                                    </div>
                                </div>
                            </div>
    
                            <div className="Dashboard-Options">
                                <div className="Dashboard-OptionRow">
                                    <button onClick={irProductosCliente}>{t("HU02-vertodoslosproductosagricolas")}</button>
                                    <button onClick={irArtesaniasCliente}>{t("HU02-vertodaslasartesanias")}</button>
                                    <button onClick={irRecorridos}>{t("HU02-verlosrecorridos")}</button>
                                    <button onClick={irHospedajes}>{t("Dashboard-vertodoshospedaje")}</button>
                                </div>
                            </div>
                         
                        </div>
                    ) : (
                        <p>{t("HU02-cargandousuario")}</p>
                    )}
    
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="wave wave3"></div>
                    <div className="wave wave4"></div>
                </section>
            </div>
        );
}
}

export default Dashboard