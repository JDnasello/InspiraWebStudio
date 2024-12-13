import { useRef } from "react";
import PayCard from "../components/PayCard";
import '../css/section-3.css'

const Section3 = () => {
    const cardContainer = useRef(null);

    // useEffect(() => {
    //     // Selecciona todas las card-container
    //     const containers = cardContainer.current.querySelectorAll(".card-container");

    //     // Agrega los event listeners a cada card-container
    //     containers.forEach((container) => {
    //         container.addEventListener("mousemove", cardEffect3d);
    //         container.addEventListener("mouseleave", restartEffect3d);
    //     });

    //     // Limpia los event listeners al desmontar el componente
    //     return () => {
    //         containers.forEach((container) => {
    //             container.removeEventListener("mousemove", cardEffect3d);
    //             container.removeEventListener("mouseleave", restartEffect3d);
    //         });
    //     };
    // }, []); // Se ejecuta solo una vez al montarse el componente

    return (
        <section className="seccion3" ref={cardContainer} id="planing" aria-labelledby="section3-title">
            <PayCard cardContainer={cardContainer} />
        </section>
    );
};

export default Section3;
