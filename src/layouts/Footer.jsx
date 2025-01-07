import "../css/footer.css";
import Instagram from "@mui/icons-material/Instagram";
import { useRef, useEffect, useState, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Footer = () => {
  const footerRef = useRef(null); // Ref para el footer
  const logo = "/assets/optimized/logoSinColor-80.webp";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  // Use Intersection Observer for mobile
  useEffect(() => {
    if (isMobile) {
      const footerItems = document.querySelectorAll('.animate-item');

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1, // When 10% of the footer is visible, trigger the animation
      });

      footerItems.forEach(item => observer.observe(item));

      // Cleanup observer when unmounting or resizing
      return () => {
        footerItems.forEach(item => observer.unobserve(item));
      };
    }
  }, [isMobile]); // Re-run when isMobile changes

  // Handle resizing and adjust isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll handling for desktop and parallax effect
  useEffect(() => {
    const handleScroll = !isMobile ? handleParallaxScroll : null;

    if (handleScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isMobile, handleParallaxScroll]);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} aria-labelledby="footer-heading" id="footer">
      <div className="container-footer">
        <div className="nav-footer">
          <div className="container-footer-logo animate-item">
            <a href="#" aria-label="Inspira Web Studio - Inicio">
              <LazyLoadImage
                src={logo}
                alt="Logo de Inspira Web Studio"
                width={70}
                effect="blur"
              />
              <span className="footer-title">Inspira Web Studio</span>
            </a>
          </div>
          <div className="nav-section section-1 animate-item">
            <h4 className="nav-section-title">Nosotros</h4>
            <p>
              Somos un equipo creativo inspirado en diseñar páginas web con onda
              y personalidad. Investigamos las últimas tendencias, pero siempre
              le ponemos nuestro toque único. Creamos espacios digitales que
              ayudan a las marcas a conectar con sus clientes, combinando
              creatividad, innovación y nuestra propia esencia.
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
            <a href="mailto:inspirawebstudio@gmail.com" target="_blank" rel="noopener norefrerrer">
              inspirawebstudio@gmail.com
            </a>
          </div>
          <p className="copyright">&copy; {currentYear}, Inspira Web Studio.</p>
          <div className="social-media">
            <a
              href="https://www.instagram.com/inspirawebstudio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visita nuestro perfil en Instagram"
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
