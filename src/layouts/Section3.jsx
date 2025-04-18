import { useRef } from "react";
import PayCard from "../components/PayCard";
import '../css/section-3.css'
import { useTranslation } from "react-i18next";

const Section3 = () => {
    const { t } = useTranslation()
    const cardContainer = useRef(null);

    return (
        <section className="seccion3" ref={cardContainer} id="planing" aria-labelledby="section3-title">
            <PayCard t={t} cardContainer={cardContainer} />
        </section>
    );
};

export default Section3;
