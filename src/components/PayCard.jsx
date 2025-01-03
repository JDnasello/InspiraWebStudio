import { RecommendOutlined, Storefront, WorkspacePremium } from '@mui/icons-material';
import { payCardList } from '../data/payCards';
import { useCallback, useEffect, useState } from 'react';
import PayCardCharacteristics from './PayCardCharacteristics';
import Button from './Button'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import debounce from 'lodash.debounce';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PayCard = ({ cardContainer }) => {

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1400);


    const sortCards = useCallback(() => {
        return isLargeScreen
            ? [payCardList[0], payCardList[1], payCardList[2], payCardList[4], payCardList[3]]
            : [payCardList[1], payCardList[2], payCardList[4], payCardList[0], payCardList[3]];
    }, [isLargeScreen]);

    const appearCard = useCallback(() => {
        const section3 = document.getElementById("planing");
        const section3OffsetTop = section3?.offsetTop || 0;
        const scrollPosition = window.scrollY;

        if (scrollPosition + window.innerHeight > section3OffsetTop) {
            const containers = cardContainer.current.querySelectorAll(".card-container");

            containers.forEach((container, index) => {
                setTimeout(() => {
                    container.classList.add("appear");
                }, index * 200);
            });
        }
    }, [cardContainer]);

    useEffect(() => {
        const handleResize = debounce(() => {
            setIsLargeScreen(window.innerWidth >= 1400);
        }, 50);
    
        const handleScroll = debounce(() => {
            if (isLargeScreen) {
                appearCard();
            }
        }, 25);
    
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll, { passive: true });
    
        appearCard();  // Llama a la función inmediatamente al montar
    
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLargeScreen, appearCard]);

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            slidesPerView={4}
            breakpoints={{
                1: {
                    slidesPerView: 1
                },
                668: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4
                }
            }}
            className="swiper-container"
        >
            {sortCards().map((card) => (
                <SwiperSlide key={card.id}>
                    <article className="card-container" id={`card-container-${card.id}`}>
                        {card?.chip && (
                            <span
                                className={`chip ${card.id === 2 ? "first-chip" : card.id === 4 ? "second-chip" : "third-chip"
                                    }`}
                            >
                                {card.chip}
                            </span>
                        )}
                        <div
                            className={`card ${card.id === 2 || card.id === 4 || card.id === 5 ? "no-radius" : "basics-cards"
                                }`}
                        >
                            {card.id === 2 ? (
                                <RecommendOutlined
                                    className="best-plans recommend"
                                    aria-label="Recomendado"
                                />
                            ) : card.id === 5 ? (
                                <Storefront className="best-plans e-commerce" aria-label="Tienda en línea" />
                            ) : (
                                card.id === 4 && (
                                    <WorkspacePremium
                                        className="best-plans premium"
                                        aria-label="Premium"
                                    />
                                )
                            )}
                            <div className="top-card">
                                <div className="">
                                    <h3>{card.title}</h3>
                                    <p className={`card-description ${card.id === 2 ? "description-landing" : ''}`}>{card.description}</p>
                                </div>
                                <div>
                                    {card.id !== 2 ? (
                                        <Button
                                            buttonText="Consultar precio"
                                            buttonClassName="button-variant"
                                            aria-label="Consultar precio del plan"
                                        />
                                    ) : (
                                        <>
                                            <span className="card-quotes">
                                                3 cuotas sin interés de:
                                            </span>
                                            <span id="card-price">
                                                <span className="coin-type" aria-label="Moneda">
                                                    ar$
                                                </span>
                                                {card.price}
                                                <span className="coin-type price-per-month">/mes</span>
                                            </span>
                                        </>
                                    )}
                                    {card.button && (
                                        <Button
                                            buttonText="Elegir plan"
                                            aria-label="Elegir este plan"
                                        />
                                    )}

                                </div>
                            </div>
                            <div className="card-separator"></div>
                            <PayCardCharacteristics card={card} />
                        </div>
                    </article>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default PayCard
