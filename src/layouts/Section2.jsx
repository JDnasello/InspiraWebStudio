import '../css/section-2.css'
import { useRef } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useParallax from '../hooks/useParallax.jsx';
import ObjectiveCards from '../components/ObjectiveCards.jsx';



const Section2 = () => {


  const itemRefs = {
    item6: useRef(null),
    item7: useRef(null)
  };

  const targetPos = {
    item6: { x: 0, y: -30, rotation: 0 },
    item7: { x: 0, y: -30, rotation: 0 }

  };

  useParallax(itemRefs, targetPos, window.innerWidth >= 1100 ? 0.2 : 0);

  const Cone5 = "/assets/optimized/Cone-5.webp"
  const Cone6 = "/assets/optimized/Cone-6.webp";




  return (
    <section
      className="seccion2"
      id='objectives'
      aria-labelledby='section2-title'
      aria-label="Sección sobre servicios de diseño web y SEO"
    >
      <span className="background-h1">Inspira</span>
      <div className="parallax-section1" ref={itemRefs.item6}>
        <LazyLoadImage
          srcSet={`
          ${Cone5.replace('.webp', '-100.webp')} 100w,
          ${Cone5.replace('.webp', '-120.webp')} 120w,
          ${Cone5.replace('.webp', '-170.webp')} 170w,
        `}
          sizes="(max-width: 600px) 100w, (max-width: 1024px) 120w, 170w"
          src={Cone5}
          ref={itemRefs.item6}
          className="item6"
          alt="Diseño web con Resorte 3D"
          title="Diseño web con Resorte 3D"
          effect="blur"
        />
      </div><div className="parallax-section2" ref={itemRefs.item7}>
        <LazyLoadImage
          srcSet={`
          ${Cone6.replace('.webp', '-100.webp')} 100w,
          ${Cone6.replace('.webp', '-120.webp')} 120w,
          ${Cone6.replace('.webp', '-170.webp')} 170w
        `}
          sizes="(max-width: 600px) 100, (max-width: 1024px) 120px, 170px"
          src={Cone6}
          ref={itemRefs.item7}
          className="item7"
          alt="Diseño web con Piramide 3D"
          title="Diseño web con Piramide 3D"
          effect="blur"
        />
      </div>
      <h2 className='seccion2-title'>¿Qué ofrecemos?</h2>
      <ObjectiveCards />
    </section>
  );
}

export default Section2
