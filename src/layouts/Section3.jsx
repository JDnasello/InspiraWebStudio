import { useRef } from "react";
import PayCard from "../components/PayCard";
import '../css/section-3.css'

const Section3 = () => {
    const cardContainer = useRef(null);

    return (
        <section className="seccion3" ref={cardContainer} id="planing" aria-labelledby="section3-title">
            <PayCard cardContainer={cardContainer} />
        </section>
    );
};

export default Section3;
