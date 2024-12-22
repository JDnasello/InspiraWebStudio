import '../css/header.css';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {

  const [headerClass, setHeaderClass] = useState(false);
  const headerRef = useRef(null);

  const LogoColor100 = "logoColor-100.webp";

  useEffect(() => {
    // Función para manejar el scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeaderClass(true);
      } else {
        setHeaderClass(false);
      }
    };

    // Añadir el listener de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Ejecutarse solo al montar el componente

  return (
    <>
      <Helmet>
        <link rel="preload" href="logoColor-100.webp" as="image" />
      </Helmet>
      <header className={`container-header ${headerClass ? 'header-sticky' : ''}`} ref={headerRef}>
        <div className='header-logo'>
          <img src={LogoColor100} alt="Logo de Inspira Web Studio" aria-label='Inicio' id='img-logo' />
          <span className={`header-title ${headerClass ? 'header-sticky-title' : ''}`} title='Inspira Web Studio, estudio de desarrollo y diseño web'>Inspira Web Studio</span>
        </div>
        <div className="header" id='header-id'>
          <nav className="header-nav" title='Menú de navegación'>
            <a className="nav-link" href="#" title='Nosotros'>
              Nosotros
            </a>
            <a className='nav-link' href='#objectives' title='Objetivos'>
              Objetivos
            </a>
          </nav>
          <a id="header-call" href='#planing' title='Planes de pago'>Ver planes</a>
        </div>
        <button className="menu-button" aria-label="Abrir menú">
          <MenuIcon style={{ fontSize: 30 }} />
        </button>
      </header>
    </>
  );
};

export default Header;
