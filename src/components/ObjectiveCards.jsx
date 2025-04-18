import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { objectivesList } from "../data/objectives";

const LazyBrush = lazy(() => import("@mui/icons-material/Brush"));
const LazyQueryStats = lazy(() => import("@mui/icons-material/QueryStats"));
const LazyPhonelink = lazy(() => import("@mui/icons-material/Phonelink"));
const LazyRocketLaunch = lazy(() => import("@mui/icons-material/RocketLaunch"));
const LazyShieldTwoTone = lazy(() => import("@mui/icons-material/ShieldTwoTone"));
const LazySupportAgent = lazy(() => import("@mui/icons-material/SupportAgent"));

const ObjectiveCards = ({ t }) => {
    const articleRef = useRef(null);
    const [visibleIndexes, setVisibleIndexes] = useState([]);

    // Función para obtener el icono dependiendo del tipo de objetivo
    const getIcon = (type) => {
        switch (type) {
            case 'custom':
                return (
                    <Suspense fallback={<div className="loading-icon" />}>
                        <LazyBrush className="objective-icon" />
                    </Suspense>
                );
            case 'SEO':
                return (
                    <Suspense fallback={<div className="loading-icon" />}>
                        <LazyQueryStats className="objective-icon" />
                    </Suspense>
                );
            case 'responsive':
                return (
                    <Suspense fallback={<div className="loading-icon" />}>
                        <LazyPhonelink className="objective-icon" />
                    </Suspense>
                );
            case 'fast':
                return (
                    <Suspense fallback={<div className="loading-icon" />}>
                        <LazyRocketLaunch className="objective-icon" />
                    </Suspense>
                );
            case 'secure':
                return (
                    <Suspense fallback={<div className="loading-icon" />}>
                        <LazyShieldTwoTone className="objective-icon" />
                    </Suspense>
                );
            case 'support':
                return (
                    <Suspense fallback={<div className="loading-icon" />}>
                        <LazySupportAgent className="objective-icon" />
                    </Suspense>
                );
            default:
                return null;
        }
    };

    // UseEffect para configurar el IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = entry.target.getAttribute('data-index');

                if (entry.isIntersecting) {
                    // Cuando el artículo entra en el viewport, lo agregamos a los índices visibles
                    setVisibleIndexes((prevIndexes) => [
                        ...new Set([...prevIndexes, Number(index)]),
                    ]);
                }
            });
        }, { threshold: 0.2 }); // Threshold al 20% de visibilidad

        // Obtenemos todas las tarjetas (artículos) dentro del contenedor
        const articles = articleRef.current.querySelectorAll(".objective-article");

        // Observamos cada artículo para saber cuándo entra al viewport
        articles.forEach((article) => {
            observer.observe(article);
        });

        // Cleanup al desmontar el componente
        return () => {
            articles.forEach((article) => {
                observer.unobserve(article);
            });
        };
    }, []);

    return (
        <div className="container-objectives" ref={articleRef}>
            {objectivesList.map((obj, index) => (
                <article
                    key={obj.id}
                    data-index={index} // Añadimos el índice como atributo para identificar el artículo
                    className={`objective-article ${visibleIndexes.includes(index) ? 'visible' : ''}`}
                >
                    <div className="top-objective-container">
                        <div className="icon-container">
                            {getIcon(obj.type)}
                        </div>
                        <h3
                            className="objective-h3"
                            title={t(obj.titleKey)}
                            aria-label={t(obj.titleKey)}
                        >
                            {t(obj.titleKey)}
                        </h3>
                    </div>
                    <div className="container-objective-body">
                        <p
                            className="objective-p"
                            title={t(obj.descriptionKey)}
                            aria-label={t(obj.descriptionKey)}
                        >
                            {t(obj.descriptionKey)}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default ObjectiveCards;
