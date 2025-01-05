import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { objectivesList } from "../data/objectives";
import debounce from "lodash.debounce";

const LazyBrush = lazy(() => import("@mui/icons-material/Brush"));
const LazyQueryStats = lazy(() => import("@mui/icons-material/QueryStats"));
const LazyPhonelink = lazy(() => import("@mui/icons-material/Phonelink"));
const LazyRocketLaunch = lazy(() => import("@mui/icons-material/RocketLaunch"));
const LazyShieldTwoTone = lazy(() => import("@mui/icons-material/ShieldTwoTone"));
const LazySupportAgent = lazy(() => import("@mui/icons-material/SupportAgent"));

const ObjectiveCards = () => {

    const articleRef = useRef(null)
    const [visibleIndexes, setVisibleIndexes] = useState([]);

    // Función que maneja el comportamiento del parallax al hacer scroll
    const handleScroll = debounce(() => {
        if (articleRef.current) {
            const articles = articleRef.current.querySelectorAll(".objective-article");
            const newVisibleIndexes = [];

            articles.forEach((article, index) => {
                const rect = article.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Si la tarjeta está visible en el viewport, agrega su índice
                    newVisibleIndexes.push(index);
                }
            });

            setVisibleIndexes((prevIndexes) => [
                ...new Set([...prevIndexes, ...newVisibleIndexes]),
            ]);
        }
    }, 10); // Ajusta el tiempo de debounce según sea necesario

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
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="container-objectives" ref={articleRef}>
            {
                objectivesList.map((obj, index) => (
                    <article
                        className={`objective-article ${visibleIndexes.includes(index) ? 'visible' : ''
                            }`}
                        key={obj.id}
                    >
                        <div className="top-objective-container">
                            <div className="icon-container">
                                {getIcon(obj.type)}
                            </div>
                            <h3
                                className="objective-h3"
                                title={obj.title}
                                aria-label={obj.title}
                            >
                                {obj.title}
                            </h3>
                        </div>
                        <div className="container-objective-body">
                            <p
                                className="objective-p"
                                title={obj.description}
                                aria-label={obj.description}
                            >
                                {obj.description}
                            </p>
                        </div>
                    </article>
                ))
            }
        </div>
    )
}

export default ObjectiveCards