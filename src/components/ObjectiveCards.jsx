import { useEffect, useRef, useState } from "react";
import { Brush, Phonelink, QueryStats, RocketLaunch, ShieldTwoTone, SupportAgent } from '@mui/icons-material';
import { objectivesList } from "../data/objectives";
import debounce from "lodash.debounce";

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
                return <Brush className='objective-icon' />;
            case 'SEO':
                return <QueryStats className='objective-icon' />;
            case 'responsive':
                return <Phonelink className='objective-icon' />;
            case 'fast':
                return <RocketLaunch className='objective-icon' />;
            case 'secure':
                return <ShieldTwoTone className='objective-icon' />;
            case 'support':
                return <SupportAgent className='objective-icon' />;
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