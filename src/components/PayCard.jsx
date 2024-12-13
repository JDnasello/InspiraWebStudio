import { RecommendOutlined, WorkspacePremium } from '@mui/icons-material';
import { payCardList } from '../data/payCards';
import { useEffect } from 'react';
import PayCardCharacteristics from './PayCardCharacteristics';
import Button from './Button'

const PayCard = ({ cardContainer }) => {

    // Función para aplicar el efecto 3D a la card-container específica
    function cardEffect3d(event) {
        const cardContainerElement = event.currentTarget;
    
        // Obtiene el tamaño y posición de la card-container
        const { left, top, width, height } = cardContainerElement.getBoundingClientRect();
    
        // Calcula la posición relativa del mouse respecto a la card-container
        const x = event.clientX - left;
        const y = event.clientY - top;
    
        // Calcula el porcentaje de movimiento relativo al centro
        const xPercent = (x / width - 0.5) * 2; // Rango: [-1, 1]
        const yPercent = (y / height - 0.5) * 2; // Rango: [-1, 1]
    
        // Ajusta los ángulos de rotación
        const rotateX = yPercent * -10; // Inclinación vertical
        const rotateY = xPercent * 10; // Inclinación horizontal
    
        // Aplica la transformación a la card-container
        cardContainerElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    // Función para reiniciar el efecto de rotación cuando el mouse sale de la card-container
    function restartEffect3d(event) {
        const cardContainerElement = event.currentTarget;
        cardContainerElement.style.transform = "rotateX(0) rotateY(0)";
    }
    
    
    function appearCard() {
        const section3 = document.getElementById("planing");
        const section3OffsetTop = section3.offsetTop;
        const scrollPosition = window.scrollY;
    
        if (scrollPosition + window.innerHeight > section3OffsetTop) {
            const containers = cardContainer.current.querySelectorAll(".card-container")
    
            containers.forEach((container, index) => {
                setTimeout(() => {
                    container.classList.add("appear");
                }, index * 200);
            });
        }
    }
    
    
        
    useEffect(() => {
        // Agregar el evento scroll para ejecutar appearCard
        window.addEventListener("scroll", appearCard);
        
        return () => {
            window.removeEventListener("scroll", appearCard);
        }
    }, [])

    return (
        <div className="cards-container">
            {payCardList.map((card) => (
                <div className="card-container" key={card.id}>
                    {card?.chip && (
                        <span className={`chip ${card.id === 2 ? 'first-chip' : 'second-chip'}`}>
                            {card.chip}
                        </span>
                    )}
                    <div className={`card ${card.id === 2 || card.id === 4 ? 'no-radius' : ''}`}>
                        {card.id === 2 ? <RecommendOutlined className="best-plans recommend" /> : card.id === 4 && <WorkspacePremium className="best-plans premium" />}
                        <div className="top-card">
                            <h3>{card.title}</h3>
                            <p className="card-description">{card.description}</p>
                            {card.id > 2 ? (
                                    <Button buttonText='Consultar precio' />
                                ) : (
                                <>
                                    <span className="card-quotes">3 cuotas sin interés de:</span>
                                        <span id="card-price">
                                        <span className="coin-type">ar$</span>
                                        {card.price}
                                        <span className="coin-type price-per-month">/mes</span>
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="card-separator"></div>
                        <PayCardCharacteristics card={card} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PayCard;
