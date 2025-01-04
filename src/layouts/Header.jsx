import "../css/header.css";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Instagram from "@mui/icons-material/Instagram";
import debounce from "lodash.debounce";
import NavLinks from "../components/NavLinks";


const Header = () => {
  const [headerClass, setHeaderClass] = useState(false);
  const headerRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const LogoColor100 = "logoColor-100.webp";
  const navItems = ['High quality', 'User friendly', 'Custom made', 'Innovative solutions', 'On time']

  useEffect(() => {
  const handleScroll = debounce(() => {
    setHeaderClass(window.scrollY > 0);
  }, 20); // Ajusta el tiempo según tus necesidades

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

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
          <NavLinks closeMenu={closeMenu} scrollToPlaning={scrollToPlaning} />
          <div className="menu-slider">
            <div className="menu-slider-track">
              {
                navItems.concat(navItems).map((item, index) => (
                  <span className="menu-slider-item" key={index}>{item}</span>
                ))
              }
            </div>
          </div>
          <div className="social-header">
            <a href="https://www.instagram.com/inspirawebstudio/" aria-label="Visita nuestro perfil en Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="social-icon" />
            </a>

          </div>
        </nav>
      </div>
      <header
        className={`container-header ${headerClass && !openMenu ? "header-sticky" : ""
          }`}
        ref={headerRef}
      >
        <a className="header-logo" href="#">
          <div className="logo-container">
            <img
              src={LogoColor100}
              alt="Logo de Inspira Web Studio"
              aria-label="Inicio"
              id="img-logo"
              width={100}
              height={100}
            />
          </div>
          <span
            className={`header-title ${headerClass ? "header-sticky-title" : ""
              }`}
            title="Inspira Web Studio, estudio de desarrollo y diseño web"
          >
            Inspira Web Studio
          </span>
        </a>
        <div className="header" id="header-id">
          <nav className="header-nav" title="Menú de navegación">
            <a className="nav-link" href="#footer" title="Nosotros"  >
              Nosotros
            </a>
            <a className="nav-link" href="#objectives" title="¿Qué ofrecemos?"  >
            ¿Qué ofrecemos?
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
