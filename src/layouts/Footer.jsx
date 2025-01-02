import "../css/footer.css";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useRef, useEffect } from "react";


const Footer = () => {
  // Función que maneja el comportamiento del parallax al hacer scroll
  const footerRef = useRef(null); // Ref para el footer


  const logo = "/assets/optimized/logoSinColor.webp";

  const isMobile = window.innerWidth < 768;
  // Función que maneja el efecto de parallax
  const handleScroll = () => {
    const scrollOffset = window.scrollY; // Obtener desplazamiento del scroll
    const viewportHeight = window.innerHeight; // Altura del viewport
    const documentHeight = document.documentElement.scrollHeight; // Altura total del documento
    const footerHeight = footerRef.current.offsetHeight; // Altura del footer

    if (footerRef.current && !isMobile) {
      // Calcular cuánto del footer se ha "desbloqueado" con respecto al scroll
      const scrolledRatio =
        (scrollOffset + viewportHeight - (documentHeight - footerHeight)) /
        footerHeight;

      // Limitar el rango entre 0 y 1
      const clampedRatio = Math.min(Math.max(scrolledRatio, 0), 1);

      // Aplicar la transformación al footer para que aparezca progresivamente
      footerRef.current.style.transform = `translateY(${-
        (1 - clampedRatio) * 85
        }%)`;

    } else if (isMobile) {
      footerRef.current.style.transform = `translateY(0px)`;
    }
  };

  // Función para manejar la animación escalonada en pantallas menores a 768px
  const animateMobileFooter = () => {
    if (!footerRef.current) return;
  
    const footerRect = footerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
  
    // Verificar si alguna parte del footer está visible
    const isFooterVisible =
      footerRect.top < viewportHeight && footerRect.bottom > 0;
  
    console.log("Footer Rect:", footerRect);
    console.log("Viewport Height:", viewportHeight);
    console.log("El footer es visible:", isFooterVisible);
  
    if (isFooterVisible) {
      console.log("El footer es visible. Animando elementos...");
  
      const footerElements = footerRef.current.querySelectorAll(".animate-item");
      footerElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("fade-in");
        }, index * 300); // Animación escalonada
      });
  
      // Remover listener después de animar
      window.removeEventListener("scroll", animateMobileFooter);
    } else {
      console.log("El footer aún no es visible.");
    }
  };

  useEffect(() => {
    if (isMobile) {
      // Añadir el listener para `scroll` en modo móvil
      window.addEventListener("scroll", animateMobileFooter);
      console.log("Modo móvil detectado.");
    } else {
      // Listener para la animación de scroll en modo no móvil
      window.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      // Eliminar ambos listeners cuando el componente se desmonte
      window.removeEventListener("scroll", animateMobileFooter);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} aria-labelledby="footer-heading" id="footer">
      <div className="container-footer">
        <div className="nav-footer">
          <div className="container-footer-logo animate-item">
            <a href="#" aria-label="Inspira Web Studio - Inicio">
              <img
                src="/assets/optimized/logoSinColor.webp"
                alt="Logo de Inspira Web Studio"
                width={70}
              />
              <span className="footer-title">Inspira Web Studio</span>
            </a>
          </div>
          <div className="nav-section section-1 animate-item">
            <h4 className="nav-section-title">Nosotros</h4>
            <p>
              Somos un equipo creativo inspirado en diseñar páginas web con onda
              y personalidad.
            </p>
          </div>
          <div className="nav-section section-2 animate-item">
            <h4 className="nav-section-title">Menú</h4>
            <ul>
              <li>
                <a className="a-us" href="#footer">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#objectives">¿Qué ofrecemos?</a>
              </li>
              <li>
                <a href="#planing">Ver planes</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="social-media-and-email animate-item">
          <div>
            <a href="mailto:inspira@webstudio.com">inspira@webstudio.com</a>
          </div>
          <p className="copyright">&copy; {currentYear}, Inspira Web Studio.</p>
          <div className="social-media">
            <a
              href="https://www.instagram.com/inspirawebstudio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;