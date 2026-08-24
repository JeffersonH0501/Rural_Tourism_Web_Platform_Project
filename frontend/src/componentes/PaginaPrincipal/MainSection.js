import React from 'react';

import logoImage from '../../assets/images/logo_colombiarte.png';

const MainSection = () => (

  <div>
    <div class="logo">
      <img src={logoImage} alt="Logo de ColombiArte" />
    </div>
    <header class="background-shared">
      <main class="main">
        <button onClick={() => window.location.href='#Galeria'}>Explora</button>
      </main>
    </header>
    <div className="descr">
      <p>Explora nuestra página para obtener más información sobre nuestras características, testimonios de usuarios satisfechos y cómo puedes empezar a utilizar la Aplicación hoy mismo. ¡Únete a nuestra comunidad y descubre cómo puede transformar tu vida!"</p>
    </div>
  </div>
);

export default MainSection;