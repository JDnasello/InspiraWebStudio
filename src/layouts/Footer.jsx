import "../css/footer.css";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useRef, useEffect } from "react";


const Footer = () => {
  // Función que maneja el comportamiento del parallax al hacer scroll
  const footerRef = useRef(null); // Ref para el footer


  const logo = "/assets/optimized/logoSinColor.webp";

  // Función que maneja el efecto de parallax
  const handleScroll = () => {
    const scrollOffset = window.scrollY; // Obtener desplazamiento del scroll
    const viewportHeight = window.innerHeight; // Altura del viewport
    const documentHeight = document.documentElement.scrollHeight; // Altura total del documento
    const footerHeight = footerRef.current.offsetHeight; // Altura del footer

    if (footerRef.current) {
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

    }
  };

  useEffect(() => {
    // Escuchar evento de scroll
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Limpiar evento
  }, []);

  return (
    <footer ref={footerRef} aria-labelledby="footer-heading">
      <div className="container-footer">
        <div className="nav-footer">
          <div className="container-footer-logo">
            <a href="#" aria-label="Inspira Web Studio - Inicio">
              <img
                srcSet={`${logo} 90w, ${logo.replace(".webp", "-600.webp")} 600w, ${logo.replace(".webp", "-1200.webp")} 1200w`}
                sizes="(max-width: 460px) 90px, (min-width: 461px) and (max-width: 1024px) 600px, (min-width: 1024px) 1200px"
                src={logo}
                alt="Logo de Inspira Web Studio"
                width={70}
                height="auto"
              />
              <span className="footer-title">Inspira Web Studio</span>
            </a>
          </div>
          <div className="nav-section section-1">
            <h4 className="nav-section-title">Nosotros</h4>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              laudantium aliquid id accusantium provident, quaerat voluptatum
              eius necessitatibus quo totam consectetur exercitationem
              aspernatur corporis, dolore odio magni, delectus hic velit.
            </p>
          </div>
          <div className="nav-section section-2">
            <h4 className="nav-section-title">Menú</h4>
            <ul>
              <li><a className="a-us" href="#" aria-label="Conoce más sobre nosotros">Nosotros</a></li>
              <li><a href="#objectives" aria-label="Nuestros objetivos">Objetivos</a></li>
              <li><a href="#" aria-label="Explora nuestro portfolio">Portfolio</a></li>
              <li><a href="#planing" aria-label="Ver planes disponibles">Ver planes</a></li>
            </ul>
          </div>
        </div>
        <div className="social-media-and-email">
          <div>
            <a href="" aria-label="Envía un correo a Inspira Web Studio">inspira@webstudio.com</a>
          </div>
          <p className="copyright">&copy; 2024, Inspira Web Studio.</p>
          <div className="social-media">
            <a>
              <Facebook className="social-icon" aria-label="Visita nuestra página de Facebook" />
            </a>
            <a>
              <Instagram className="social-icon" aria-label="Síguenos en Instagram" />
            </a>
            <a>
              <LinkedIn className="social-icon" aria-label="Conéctate con nosotros en LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
