import "../css/header.css";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

const Header = () => {
  const [headerClass, setHeaderClass] = useState(false);
  const headerRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

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
    window.addEventListener("scroll", handleScroll);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Ejecutarse solo al montar el componente

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const scrollToPlaning = () => {
    const targetElement = document.querySelector("#planing");

    if (targetElement) {
      // Obtenemos el offsetTop del elemento con respecto al documento
      const targetPosition = targetElement.offsetTop - 40;

      // Realizamos el desplazamiento suave hasta el offsetTop del target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }



  return (
    <>
      <Helmet>
        <link rel="preload" href="logoColor-100.webp" as="image" />
      </Helmet>
      <div className={`menu-responsive ${openMenu ? "menu-open" : ""}`}>
        <nav className="header-nav" title="Menú de navegación">
          <a className="nav-link" href="#footer" title="Nosotros" onClick={closeMenu}>
            Nosotros
          </a>
          <a className="nav-link" href="#objectives" title="Objetivos" onClick={closeMenu}>
            Objetivos
          </a>
          <a className="nav-link" href="#planing" title="Planes de pago" onClick={() => { closeMenu(); scrollToPlaning() }}>
            Ver planes
          </a>

          <div className="social-header">
            <a href="https://www.instagram.com/inspirawebstudio/" aria-label="Visita nuestro perfil en Instagram">
              <Instagram className="social-icon" />
            </a>
            {/* <a href="#" aria-label="Visita nuestro perfil en Facebook">
              <Facebook className="social-icon" />
            </a>
            <a href="#" aria-label="Visita nuestro perfil en LinkedIn">
              <LinkedIn className="social-icon" />
            </a> */}
          </div>
        </nav>
      </div>
      <header
        className={`container-header ${headerClass && !openMenu ? "header-sticky" : ""
          }`}
        ref={headerRef}
      >
        <div className="header-logo">
          <img
            src={LogoColor100}
            alt="Logo de Inspira Web Studio"
            aria-label="Inicio"
            id="img-logo"
          />
          <span
            className={`header-title ${headerClass ? "header-sticky-title" : ""
              }`}
            title="Inspira Web Studio, estudio de desarrollo y diseño web"
          >
            Inspira Web Studio
          </span>
        </div>
        <div className="header" id="header-id">
          <nav className="header-nav" title="Menú de navegación">
            <a className="nav-link" href="#footer" title="Nosotros"  >
              Nosotros
            </a>
            <a className="nav-link" href="#objectives" title="Objetivos"  >
              Objetivos
            </a>
          </nav>
          <a id="header-call" href="#planing" title="Planes de pago" onClick={(e) => { e.preventDefault(); scrollToPlaning(); }}  >
            Ver planes
          </a>
        </div>
        {!openMenu && (
          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <MenuIcon style={{ fontSize: 30 }} />
          </button>
        )}

        {openMenu && (
          <button className="menu-close">
            <CloseIcon style={{ fontSize: 30 }} onClick={toggleMenu} />{" "}
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
