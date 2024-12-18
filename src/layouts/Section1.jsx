import "@google/model-viewer";
import HummingBird from "../components/HummingBird";
import Cone from "../assets/Cone.png";
import Cone1 from "../assets/Cone-1.png";
import Cone2 from "../assets/Cone-2.png";
import Cone3 from "../assets/Cone-3.png";
import Cone4 from "../assets/Cone-4.png";
import Facebook from "../svg/Facebook";
import Instagram from "../svg/Instagram";
import Linkedin from "../svg/Linkedin";
import { useEffect, useRef } from "react";
import Header from "./Header";
import "../css/section-1.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Section1 = ({ cursorRef, innerCursorRef }) => {
  const itemRefs = {
    item1: useRef(null),
    item2: useRef(null),
    item3: useRef(null),
    item4: useRef(null),
    item5: useRef(null),
  };

  const headerRef = useRef(null);
  const colibriRef = useRef(null);

  const targetPositions = {
    item1: { x: -60, y: 60, rotation: 45 },
    item2: { x: -50, y: -50, rotation: 30 },
    item3: { x: -80, y: 0, rotation: 90 },
    item4: { x: 40, y: -80, rotation: -45 },
    item5: { x: 40, y: 80, rotation: 180 },
  };

  // Función que maneja el comportamiento del parallax al hacer scroll
  const handleScroll = () => {
    const scrollOffset = window.scrollY; // Obtener desplazamiento vertical

    // Mover los elementos con efecto parallax
    for (const [key, ref] of Object.entries(itemRefs)) {
      moverElemento(ref.current, targetPositions[key], scrollOffset, 0.2);
    }

    if (headerRef.current) {
      moverHeader(headerRef.current, scrollOffset, 0.5);
    }

    if (colibriRef.current) {
      moverColibri(colibriRef.current, scrollOffset, 0.1);
    }
  };

  const moverHeader = (element, scrollOffset, velocidad) => {
    const currentY = -scrollOffset * velocidad; // scrollOffset en negativo para que se desplace hacia arriba
    element.style.transform = `translateY(${currentY}px)`; // Desplazamiento en vertical
  };

  const moverColibri = (element, scrollOffset, velocidad) => {
    const currentY = scrollOffset * velocidad;
    element.style.transform = `translateY(${currentY}px)`;
  };

  const moverElemento = (elemento, targetPos, scrollOffset, velocidad) => {
    // Calcular la posición actual basada en el desplazamiento del scroll
    const currentX = (targetPos.x * scrollOffset * velocidad) / 100;
    const currentY = (targetPos.y * scrollOffset * velocidad) / 100;

    // Calcular la rotación basada en el desplazamiento del scroll
    const currentRotation =
      (targetPos.rotation * scrollOffset * velocidad) / 100;

    // Aplicar transformación al elemento (movimiento + rotación)
    elemento.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg)`;
  };

  // Efecto que se renderiza al montar el componente por primera vez
  useEffect(() => {
    function moverOrigen() {
      for (const ref of Object.values(itemRefs)) {
        if (ref.current) {
          ref.current.style.transform = `translate(0, 0) rotate(0deg)`
        }
      }
    }
    
    moverOrigen()
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="seccion1">
      <div className="sec1-contizq">
        <div className="container-logo" ref={headerRef}>
          <img src="logoColor.png" alt="" width={80} height="auto" style={{ zIndex: 10 }} />
          <span className="header-title">Inspira Web Studio</span>
        </div>
        <HummingBird
          colibriRef={colibriRef}
          cursorRef={cursorRef}
          innerCursorRef={innerCursorRef}
        />
        <div className="social-hero">
          <a href="">
            <Instagram />
          </a>
          <a href="">
            <Facebook />
          </a>
          <a href="">
            <Linkedin />
          </a>
        </div>
      </div>

      <div className="sec1-contder">
        <Header headerRef={headerRef} />
        <div className="contder-presentation">
          <span>
            <h1 className="contder-h1">imagine.</h1>
            <h1 className="contder-h1">develop.</h1>
            <h1 className="contder-h1">& style.</h1>
          </span>
          <div className="items-hero">
            <div className="parallax" ref={itemRefs.item1}>
              <LazyLoadImage
                src={Cone}
                ref={itemRefs.item1}
                className="item1"
                alt=""
                effect="blur"
              />
            </div>

            <div className="parallax" ref={itemRefs.item2}>
              <LazyLoadImage
                src={Cone1}
                ref={itemRefs.item2}
                className="item2"
                alt=""
                effect="blur"
              />
            </div>

            <div className="parallax" ref={itemRefs.item3}>
              <LazyLoadImage
                src={Cone2}
                ref={itemRefs.item3}
                className="item3"
                alt=""
                effect="blur"
              />
            </div>

            <div className="parallax" ref={itemRefs.item4}>
              <LazyLoadImage
                src={Cone3}
                ref={itemRefs.item4}
                className="item4"
                alt=""
                effect="blur"
              />
            </div>

            <div className="parallax" ref={itemRefs.item5}>
              <LazyLoadImage
                src={Cone4}
                ref={itemRefs.item5}
                className="item5"
                alt=""
                effect="blur"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
