import { ArrowBackIosNew, ArrowForwardIos, RecommendOutlined, WorkspacePremium } from '@mui/icons-material';
import { payCardList } from '../data/payCards';
import { useEffect, useState, useMemo } from 'react';
import PayCardCharacteristics from './PayCardCharacteristics';
import Button from './Button'

const PayCard = ({ cardContainer }) => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [visibleCardsCount, setVisibleCardsCount] = useState(1)
    const [slideClass, setSlideClass] = useState("")

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

    const reorderedCards = useMemo(() => {
        // Si hay menos tarjetas visibles, simplemente ajustamos el índice inicial
        return [...payCardList];
    }, [payCardList]);

    const getVisibleCards = () => {
        // Ajustamos el índice inicial dependiendo de visibleCardsCount
        const adjustedIndex = selectedIndex % reorderedCards.length;
        const visibleCards = reorderedCards.slice(adjustedIndex, adjustedIndex + visibleCardsCount);

        if (visibleCards.length < visibleCardsCount) {
            return [
                ...visibleCards,
                ...reorderedCards.slice(0, visibleCardsCount - visibleCards.length),
            ];
        }

        return visibleCards;
    };

    // Configuración inicial para mostrar las tarjetas con índices 1, 2, y 3
    useEffect(() => {
        setSelectedIndex(1); // Asegura que la primera tarjeta visible sea la del índice 1 (según el array ordenado)
    }, [visibleCardsCount]);

    const previousCard = () => {
        setSlideClass("right");
        setTimeout(() => {
            setSelectedIndex((prevIndex) =>
                prevIndex - 1 < 0 ? reorderedCards.length - 1 : prevIndex - 1
            );
            setSlideClass("");
        }, 500);
    };

    const nextCard = () => {
        setSlideClass("left");
        setTimeout(() => {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % reorderedCards.length);
            setSlideClass("");
        }, 500);
    };

    const handleResize = () => {
        if (window.innerWidth <= 928) {
            setVisibleCardsCount(1);
        } else if (window.innerWidth <= 1280) {
            setVisibleCardsCount(2);
        } else if (window.innerWidth <= 1400) {
            setVisibleCardsCount(3);
        } else {
            setVisibleCardsCount(4); // Cambia según la cantidad máxima visible
        }
    };

    const getCardClass = (index) => {
    if (visibleCardsCount === 2) {
        if (slideClass === "next") {
            return index === 0 ? "two-left" : "two-center-to-right";
        } else if (slideClass === "previous") {
            return index === 0 ? "two-right-to-center" : "two-out-left";
        }
    } else {
        if (slideClass === "next") {
            return index === 0
                ? "move-left"
                : index === 1
                ? "center-to-right"
                : "out-right";
        } else if (slideClass === "previous") {
            return index === 0
                ? "out-left"
                : index === 1
                ? "center-to-left"
                : "move-right";
        }
    }
    return ""; // Clase por defecto si no se cumple ninguna condición
};

    useEffect(() => {
        // Visiblildad inicial al cargar el componente
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 1400) {
                appearCard()
            }
        }

        // Agregar el evento scroll para ejecutar handleScroll
            window.addEventListener("scroll", handleScroll)
            
            return () => window.removeEventListener("scroll", handleScroll)
        
    }, [])

    return (
        <>
            <ArrowBackIosNew className='arrow arrow-back' onClick={previousCard} />
            <div ref={cardContainer} className="cards-container">
                {getVisibleCards().map((card, index) => (
                    <article className={`card-container ${getCardClass(index)}`} key={card.id}>
                        {card?.chip && (
                            <span className={`chip ${card.id === 2 ? 'first-chip' : 'second-chip'}`}>
                                {card.chip}
                            </span>
                        )}
                        <div className={`card ${card.id === 2 || card.id === 4 ? 'no-radius' : ''}`}>
                            {card.id === 2 ?
                                <RecommendOutlined className="best-plans recommend" aria-label='Recomendado' />
                                : card.id === 4 && <WorkspacePremium className="best-plans premium" aria-label='Premium' />}
                            <div className="top-card">
                                <h3>{card.title}</h3>
                                <p className="card-description">{card.description}</p>
                                {card.id != 2 ? (
                                        <Button buttonText='Consultar precio' buttonClassName='button-variant' aria-label="Consultar precio del plan" />
                                    ) : (
                                    <>
                                        <span className="card-quotes">3 cuotas sin interés de:</span>
                                            <span id="card-price">
                                            <span className="coin-type" aria-label='Moneda'>ar$</span>
                                            {card.price}
                                            <span className="coin-type price-per-month">/mes</span>
                                        </span>
                                    </>
                                )}
                                {card.button && <Button buttonText='Elegir plan' aria-label='Elegir este plan' />}
                            </div>
                            <div className="card-separator"></div>
                            <PayCardCharacteristics card={card} />
                        </div>
                    </article>
                ))}
            </div>
            <ArrowForwardIos className='arrow arrow-next' onClick={nextCard} />
        </>
    )
}

export default PayCard
