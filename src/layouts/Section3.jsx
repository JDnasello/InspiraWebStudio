import { Check } from "@mui/icons-material";
import "../css/section-3.css";
import { payCardList } from "../data/payCards";
import { useEffect, useRef } from "react";

const Section3 = () => {
    const cardContainer = useRef(null);

    // Función para aplicar el efecto 3D a la tarjeta específica
    function cardEffect3d(event) {
        const card = event.currentTarget;

        // Obtiene el tamaño y posición de la tarjeta
        const { left, top, width, height } = card.getBoundingClientRect();

        // Calcula la posición relativa del mouse respecto a la tarjeta
        const x = event.clientX - left;
        const y = event.clientY - top;

        // Calcula el porcentaje de movimiento relativo al centro
        const xPercent = (x / width - 0.5) * 2; // Rango: [-1, 1]
        const yPercent = (y / height - 0.5) * 2; // Rango: [-1, 1]

        // Ajusta los ángulos de rotación
        const rotateX = yPercent * -10; // Inclinación vertical
        const rotateY = xPercent * 10; // Inclinación horizontal

        // Aplica la transformación a la tarjeta
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Función para reiniciar el efecto de rotación cuando el mouse sale de la tarjeta
    function restartEffect3d(event) {
        const card = event.currentTarget;
        card.style.transform = "rotateX(0) rotateY(0)";
    }

    useEffect(() => {
        // Selecciona todas las tarjetas
        const cards = cardContainer.current.querySelectorAll(".card");

        // Agrega los event listeners a cada tarjeta
        cards.forEach((card) => {
        card.addEventListener("mousemove", cardEffect3d);
        card.addEventListener("mouseleave", restartEffect3d);
        });

        // Limpia los event listeners al desmontar el componente
        return () => {
        cards.forEach((card) => {
            card.removeEventListener("mousemove", cardEffect3d);
            card.removeEventListener("mouseleave", restartEffect3d);
        });
        };
    }, []);

    return (
        <section className="seccion3" ref={cardContainer} id="planing">
            <div className="cards-container">
            {payCardList.map((card) => (
                <div className="card" key={card.id}>
                <div className="top-card">
                    <h3>{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                    {card.id > 2 ? (
                    <button id="custom-price-btn">Consultar precio</button>
                    ) : (
                    <>
                        <span className="card-quotes">
                        3 cuotas sin interés de:
                        </span>
                        <span id="card-price">
                        <span className="coin-type">ar$</span>
                        {card.price}
                        <span className="coin-type price-per-month">/mes</span>
                        </span>
                    </>
                    )}
                </div>
                <div className="card-separator"></div>
                    <div className="characteristics">
                        {card.characteristics.map((char, index) => (
                        <div key={index} className="characteristic-container">
                            <Check sx={{ color: 'red'}}/>
                            <span className="characteristic-txt">{char}</span>
                        </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </section>
    )
}

export default Section3;
