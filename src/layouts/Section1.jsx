import "@google/model-viewer";
import HummingBird from "../components/HummingBird";
import Cone from "../assets/Cone.png";
import Cone1 from "../assets/Cone-1.png";
import Cone2 from "../assets/Cone-2.png";
import Cone3 from "../assets/Cone-3.png";
import Cone4 from "../assets/Cone-4.png";
import { useEffect, useRef, useState } from "react";
import "../css/section-1.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

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

  const updateTargetPositions = (isMobile) =>
    isMobile
      ? {
          item1: { x: 0, y: -80, rotation: 45 },
          item2: { x: 0, y: -80, rotation: 30 },
          item3: { x: 0, y: -80, rotation: 90 },
          item4: { x: 0, y: -80, rotation: -45 },
          item5: { x: 0, y: -80, rotation: 180 },
        }
      : {
          item1: { x: -60, y: 60, rotation: 45 },
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
                <LazyLoadImage
                  src={[Cone, Cone1, Cone2, Cone3, Cone4][index]}
                  className={`item${index + 1}`}
                  alt={`Objeto 3D ${index + 1}`}
                  effect="blur"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
