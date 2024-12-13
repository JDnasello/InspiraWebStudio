import '../css/section-2.css'
import { objectivesList } from '../data/objectives.js';
import Cone5 from "../assets/Cone-5.png";
import Cone6 from "../assets/Cone-6.png";
import React, { useRef, useEffect } from 'react';
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
        <section className="seccion2" id='objectives'>
            <h1 className="background-h1">Inspira</h1>
            <div className="parallax-section2" ref={itemRefs.item6}>
                <LazyLoadImage
                    src={Cone5}
                    ref={itemRefs.item6}
                    className="item6"
                    alt=""
                    effect="blur"
                />
            </div><div className="parallax-section2" ref={itemRefs.item7}>
                <LazyLoadImage
                    src={Cone6}
                    ref={itemRefs.item7}
                    className="item7"
                    alt=""
                    effect="blur"
                />
            </div>
            <h1 className='seccion2-title'>Nuestros Objetivos</h1>
            <div className="container-objectives">
                {
                    objectivesList.map(obj => (
                        <article className='objective-article' key={obj.id}>
                            <h2 className='objective-h2'>{obj.title}</h2>
                            <p className="objective-p">{obj.description}</p>
                        </article>
                    ))
                }
            </div>
        </section>
    );
}

export default Section2
