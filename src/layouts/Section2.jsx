import '../css/section-2.css'
import { objectivesList } from '../data/objectives.js';
import { useRef, useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";



const Section2 = () => {

  const itemRefs = {
    item6: useRef(null),
    item7: useRef(null)
  };

  const colibriRef = useRef(null);

  const targetPositions = {
    item6: { x: 0, y: -30, rotation: 0 },
    item7: { x: 0, y: -30, rotation: 0 }

  };

  const [visibleIndexes, setVisibleIndexes] = useState([]);

  const Cone5 = "/assets/optimized/Cone-5.webp"
  const Cone6 = "/assets/optimized/Cone-6.webp";

  useEffect(() => {
    const handleAnimation = () => {
      objectivesList.forEach((_, index) => {
        setTimeout(() => {
          setVisibleIndexes((prev) => [...prev, index]);
        }, index * 300); // Ajusta el retraso (300ms por fila)
      });
    };

    handleAnimation();
  }, [objectivesList]);

  // Función que maneja el comportamiento del parallax al hacer scroll
  const handleScroll = () => {
    const scrollOffset = window.scrollY; // Obtener desplazamiento vertical

    // Mover los elementos con efecto parallax
    for (const [key, ref] of Object.entries(itemRefs)) {
      moverElemento(ref.current, targetPositions[key], scrollOffset, 0.2);
    }

    if (colibriRef.current) {
      moverColibri(colibriRef.current, scrollOffset, 0.1);
    }
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
    <section className="seccion2" id='objectives' aria-labelledby='section2-title'>
      <span className="background-h1">Inspira</span>
      <div className="parallax-section1" ref={itemRefs.item6}>
        <LazyLoadImage
          srcSet={`
          ${Cone5.replace('.webp', '-300.webp')} 300w,
          ${Cone5.replace('.webp', '-600.webp')} 600w,
          ${Cone5.replace('.webp', '-1200.webp')} 1200w
        `}
          sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 1200px"
          src={Cone5}
          ref={itemRefs.item6}
          className="item6"
          alt="Resorte 3D"
          effect="blur"
        />
      </div><div className="parallax-section2" ref={itemRefs.item7}>
        <LazyLoadImage
          srcSet={`
          ${Cone6.replace('.webp', '-300.webp')} 300w,
          ${Cone6.replace('.webp', '-600.webp')} 600w,
          ${Cone6.replace('.webp', '-1200.webp')} 1200w
        `}
          sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 1200px"
          src={Cone6}
          ref={itemRefs.item7}
          className="item7"
          alt="Piramide 3D"
          effect="blur"
        />
      </div>
      <h2 className='seccion2-title'>Nuestros Objetivos</h2>
      <div className="container-objectives">
        {
          objectivesList.map((obj, index) => (
            <article
              className={`objective-article ${visibleIndexes.includes(index) ? 'visible' : ''
                }`}
              key={obj.id}
            >
              <h3
                className="objective-h3"
                title={obj.title}
                aria-label={obj.title}
              >
                {obj.title}
              </h3>
              <p
                className="objective-p"
                title={obj.description}
                aria-label={obj.description}
              >
                {obj.description}
              </p>
            </article>
          ))
        }
      </div>
    </section>
  );
}

export default Section2
