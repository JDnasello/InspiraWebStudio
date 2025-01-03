import "@google/model-viewer";
import HummingBird from "../components/HummingBird";

import { useEffect, useRef, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import "../css/section-1.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import Instagram from "@mui/icons-material/Instagram";
import { Helmet } from 'react-helmet-async'
import useParallax from "../hooks/useParallax";

const Section1 = ({ cursorRef, innerCursorRef, headerRef }) => {

  const [windowWidth] = useState(window.innerWidth);
  const spanRef = useRef(null);
  const itemRefs = {
    item1: useRef(null),
    item2: useRef(null),
    item3: useRef(null),
    item4: useRef(null),
    item5: useRef(null),
  };
  const colibriRef = useRef(null);

  const Cone = "/assets/optimized/Cone.webp"
  const Cone1 = "/assets/optimized/Cone-1.webp";
  const Cone2 = "/assets/optimized/Cone-2.webp";
  const Cone3 = "/assets/optimized/Cone-3.webp";
  const Cone4 = "/assets/optimized/Cone-4.webp";

  const targetPos = {
    item1: { x: 0, y: -80, rotation: 65 },
    item2: { x: 0, y: -80, rotation: 30 },
    item3: { x: 0, y: -80, rotation: 90 },
    item4: { x: 0, y: -80, rotation: -45 },
    item5: { x: 0, y: -80, rotation: 180 },
  }

  const getSrcSet = (baseImage) => {
    return `
      ${baseImage.replace(".webp", "-300.webp")} 300w,
      ${baseImage.replace(".webp", "-600.webp")} 600w,
      ${baseImage.replace(".webp", "-1200.webp")} 1200w
    `;
  };

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

 useParallax(itemRefs, targetPos, 0.2);

  return (
    <>
      <Helmet>
        {windowWidth <= 460 ? (
          <>
            <link
              rel="preload"
              href={Cone.replace(".webp", "-300.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone1.replace(".webp", "-300.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone2.replace(".webp", "-300.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone3.replace(".webp", "-300.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone4.replace(".webp", "-300.webp")}
              as="image"
              type="image/webp"
            />
          </>
        ) : windowWidth > 461 && windowWidth < 1024 ? (
          <>
            <link
              rel="preload"
              href={Cone.replace(".webp", "-600.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone1.replace(".webp", "-600.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone2.replace(".webp", "-600.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone3.replace(".webp", "-600.webp")}
              as="image"
              type="image/webp"
            />
            <link
              rel="preload"
              href={Cone4.replace(".webp", "-600.webp")}
              as="image"
              type="image/webp"
            />
          </>
        ) : (
          windowWidth > 1024 && (
            <>
              <link
                rel="preload"
                href={Cone.replace(".webp", "-1200.webp")}
                as="image"
                type="image/webp"
              />
              <link
                rel="preload"
                href={Cone1.replace(".webp", "-1200.webp")}
                as="image"
                type="image/webp"
              />
              <link
                rel="preload"
                href={Cone2.replace(".webp", "-1200.webp")}
                as="image"
                type="image/webp"
              />
              <link
                rel="preload"
                href={Cone3.replace(".webp", "-1200.webp")}
                as="image"
                type="image/webp"
              />
              <link
                rel="preload"
                href={Cone4.replace(".webp", "-1200.webp")}
                as="image"
                type="image/webp"
              />
            </>
          )
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
            <a href="https://www.instagram.com/inspirawebstudio/" aria-label="Visita nuestro perfil en Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="social-icon" />
            </a>
          </div>
        </div>

        <div className="sec1-contder">
          <div className="contder-presentation">
            <h1 className="span-hero" ref={spanRef}>
              <span className="contder-h1">imagine.</span>
              <span className="contder-h1">develop.</span>
              <span className="contder-h1">& style.</span>
              <button className="planing-btn"><a id="header-call" href="#planing" title="Planes de pago">
                Ver planes
              </a></button>
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
                    srcSet={getSrcSet([Cone, Cone1, Cone2, Cone3, Cone4][index])}
                    sizes="(max-width: 460px) 300px,(min-width: 461px) and (max-width: 1024px) 600px,(min-width: 1024px) 1200px"
                    src={[Cone, Cone1, Cone2, Cone3, Cone4][index]}
                    className={`item${index + 1}`}
                    alt={`Objeto 3D ${index + 1}`}
                    loading="eager"
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