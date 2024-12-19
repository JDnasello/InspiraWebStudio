import "@google/model-viewer";
import HummingBird from "../components/HummingBird";
import Cone from "../assets/optimized/Cone.webp";
import Cone1 from "../assets/optimized/Cone-1.webp";
import Cone2 from "../assets/optimized/Cone-2.webp";
import Cone3 from "../assets/optimized/Cone-3.webp";
import Cone4 from "../assets/optimized/Cone-4.webp";
import { useEffect, useRef, useState } from "react";
import "../css/section-1.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { Helmet } from 'react-helmet-async'

const Section1 = ({ cursorRef, innerCursorRef, headerRef }) => {
  const spanRef = useRef(null);
  const itemRefs = {
    item1: useRef(null),
    item2: useRef(null),
    item3: useRef(null),
    item4: useRef(null),
    item5: useRef(null),
  };
  const colibriRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const updateTargetPositions = (isMobile) =>
    isMobile
      ? {
        item1: { x: 0, y: -80, rotation: 65 },
        item2: { x: 0, y: -80, rotation: 30 },
        item3: { x: 0, y: -80, rotation: 90 },
        item4: { x: 0, y: -80, rotation: -45 },
        item5: { x: 0, y: -80, rotation: 180 },
      }
      : {
        item1: { x: -60, y: 60, rotation: 65 },
        item2: { x: -50, y: -50, rotation: 30 },
        item3: { x: -80, y: 0, rotation: 90 },
        item4: { x: 40, y: -80, rotation: -45 },
        item5: { x: 40, y: 80, rotation: 180 },
      };

  const getInitialTargetPositions = () =>
    updateTargetPositions(window.innerWidth <= 460);

  const [targetPositions, setTargetPositions] = useState(
    getInitialTargetPositions
  );

  const adjustPositionsForScreenSize = () => {
    const isMobile = window.innerWidth <= 460;
    setTargetPositions(updateTargetPositions(isMobile));

    if (colibriRef.current) {
      if (isMobile) {
        colibriRef.current.removeAttribute("camera-controls");
        colibriRef.current.style.touchAction = "none";
      } else {
        colibriRef.current.setAttribute("camera-controls", "");
        colibriRef.current.style.touchAction = "auto";
      }
    }
  };

  const moverElemento = (elemento, targetPos, scrollOffset, velocidad) => {
    const currentX = (targetPos.x * scrollOffset * velocidad) / 100;
    const currentY = (targetPos.y * scrollOffset * velocidad) / 100;
    const currentRotation =
      (targetPos.rotation * scrollOffset * velocidad) / 100;

    elemento.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg)`;
  };

  const handleScroll = () => {
    const scrollOffset = window.scrollY;

    for (const [key, ref] of Object.entries(itemRefs)) {
      moverElemento(ref.current, targetPositions[key], scrollOffset, 0.2);
    }
  };

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetPositions]);

  useEffect(() => {
    adjustPositionsForScreenSize()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 460);
      setIsTablet(width > 460 && width <= 1024);
    };

    // Llama a la función cuando la página cargue
    updateDeviceType();

    // Actualiza cuando el tamaño de la ventana cambie
    window.addEventListener("resize", updateDeviceType);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);


  useEffect(() => {
    for (const ref of Object.values(itemRefs)) {
      if (ref.current) {
        ref.current.style.transform = `translate(0, 0) rotate(0deg)`;
      }
    }

    if (spanRef.current) {
      spanRef.current.classList.add("animation");
    }
  }, []);

  return (
    <>
      <Helmet>
        {windowWidth <= 460 && (
          <>
            <link rel="preload" href={Cone.replace('.webp', '-300.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone1.replace('.webp', '-300.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone2.replace('.webp', '-300.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone3.replace('.webp', '-300.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone4.replace('.webp', '-300.webp')} as="image" type="image/webp" />
          </>
        )}

        {windowWidth > 461 && windowWidth < 1024 && (
          <>
            <link rel="preload" href={Cone.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone1.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone2.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone3.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone4.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
          </>
        )}

        {windowWidth > 1024 && (
          <>
            <link rel="preload" href={Cone.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone1.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone2.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone3.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
            <link rel="preload" href={Cone4.replace('.webp', '-1200.webp')} as="image" type="image/webp" />
          </>
        )}
      </Helmet>
      <section className="seccion1" aria-labelledby="section1-title">
        <div className="sec1-contizq">
          <HummingBird
            colibriRef={colibriRef}
            cursorRef={cursorRef}
            innerCursorRef={innerCursorRef}
          />
          <div className="social-hero">
            <a href="#" aria-label="Visita nuestro perfil en Instagram">
              <Instagram className="social-icon" />
            </a>
            <a href="#" aria-label="Visita nuestro perfil en Facebook">
              <Facebook className="social-icon" />
            </a>
            <a href="#" aria-label="Visita nuestro perfil en LinkedIn">
              <LinkedIn className="social-icon" />
            </a>
          </div>
        </div>

        <div className="sec1-contder">
          <div className="contder-presentation">
            <h1 className="span-hero" ref={spanRef}>
              <span className="contder-h1">imagine.</span>
              <span className="contder-h1">develop.</span>
              <span className="contder-h1">& style.</span>
            </h1>
            <div className="items-hero">
              {Object.keys(itemRefs).map((key, index) => (
                <div
                  key={key}
                  className="parallax"
                  ref={itemRefs[key]}
                  aria-hidden="true"
                >
                  <img
                    srcSet={` 
    
                        ${[Cone, Cone1, Cone2, Cone3, Cone4][index].replace('.webp', '-300.webp')},
                        ${[Cone, Cone1, Cone2, Cone3, Cone4][index].replace('.webp', '-600.webp')} ,
                        ${[Cone, Cone1, Cone2, Cone3, Cone4][index].replace('.webp', '-1200.webp')} ,

                    `}
                    sizes="(max-width: 460px) 300px, (min-width: 461px) and (max-width: 1024px) 600px, (min-width: 1024px) 1200px"
                    src={[Cone, Cone1, Cone2, Cone3, Cone4][index]}
                    className={`item${index + 1}`}
                    alt={`Objeto 3D ${index + 1}`}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;