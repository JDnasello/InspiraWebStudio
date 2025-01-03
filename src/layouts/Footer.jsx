import "../css/footer.css";
import Instagram from "@mui/icons-material/Instagram";
import debounce from 'lodash.debounce';
import { useRef, useEffect, useState, useCallback } from "react";

const Footer = () => {
  const footerRef = useRef(null); // Ref para el footer
  const logo = "/assets/optimized/logoSinColor.webp";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Usamos resizeObserver para ajustar el tamaño del dispositivo en tiempo real
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setIsMobile(window.innerWidth < 768);
    });
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  // Usamos requestAnimationFrame para sincronizar con el ciclo de renderizado
  const handleParallaxScroll = useCallback(() => {
    if (!footerRef.current) return;

    const scrollOffset = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const footerHeight = footerRef.current.offsetHeight;

    const scrolledRatio = (scrollOffset + viewportHeight - (documentHeight - footerHeight)) / footerHeight;
    const clampedRatio = Math.min(Math.max(scrolledRatio, 0), 1);
    footerRef.current.style.transform = `translateY(${-(1 - clampedRatio) * 85}%)`;
  }, []);

  // Guardamos las animaciones en una variable para evitar la consulta del DOM cada vez
  const animateItems = useCallback(() => {
    if (!footerRef.current) return;

    const footerElements = footerRef.current.querySelectorAll(".animate-item");
    return footerElements;
  }, []);

  // Función que maneja la animación de fade-in con debounce
  const handleFadeInScroll = debounce(() => {
    if (!footerRef.current) return;

    const scrollOffset = window.scrollY;
    const viewportHeight = window.innerHeight;
    const footerRect = footerRef.current.getBoundingClientRect();
    const isFooterVisible = footerRect.top < viewportHeight && footerRect.bottom > 0;

    if (isFooterVisible) {
      const footerElements = animateItems();
      footerElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("fade-in");
        }, index * 300); // Animación escalonada
      });

      // Remover listener después de animar
      window.removeEventListener("scroll", handleFadeInScroll);
    }
  }, 10); // Limitar la ejecución a cada 50ms para evitar llamadas rápidas

  useEffect(() => {
    // Añadir un único listener para el evento de scroll
    if (isMobile) {
      window.addEventListener("scroll", handleFadeInScroll, { passive: true });
    } else {
      window.addEventListener("scroll", handleParallaxScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleFadeInScroll); // Limpiar al desmontar
      window.removeEventListener("scroll", handleParallaxScroll); // Limpiar al desmontar
    };
  }, [isMobile, handleFadeInScroll, handleParallaxScroll]); // Se actualiza solo cuando cambian las dependencias

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} aria-labelledby="footer-heading" id="footer">
      <div className="container-footer">
        <div className="nav-footer">
          <div className="container-footer-logo animate-item">
            <a href="#" aria-label="Inspira Web Studio - Inicio">
              <img
                src={logo}
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
