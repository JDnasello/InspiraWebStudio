import { payCardList } from "../data/payCards";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";
import debounce from "lodash.debounce";
import tattoo from "../assets/original/pruebaTattoo4.png";
import tattooMachine from "../assets/original/tattoMachineIcon.webp";

import "swiper/css";

const RecommendOutlinedLazy = lazy(() =>
  import("@mui/icons-material/RecommendOutlined")
);
const StorefrontLazy = lazy(() => import("@mui/icons-material/Storefront"));
const WorkspacePremiumLazy = lazy(() =>
  import("@mui/icons-material/WorkspacePremium")
);
const PayCardCharacteristicsLazy = lazy(() =>
  import("./PayCardCharacteristics")
);

const PayCard = ({ t, cardContainer }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1400);
  const [swiperModules, setSwiperModules] = useState(null);
  const [openCountriesList, setOpenCountriesList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("AR");

  const countries = [
    { code: "AR", name: "Argentina" },
    { code: "BR", name: "Brasil" },
    { code: "ES", name: "España" },
    { code: "US", name: "Estados Unidos" },
  ];

  const currencySymbol = {
    AR: "AR$",
    ES: "€",
    US: "US$",
    BR: "R$",
  };

  const sortCards = useCallback(() => {
    return isLargeScreen
      ? [
          payCardList[1],
          payCardList[5],
          payCardList[2],
          payCardList[4],
          payCardList[0],
          payCardList[3],
        ]
      : [
          payCardList[1],
          payCardList[5],
          payCardList[2],
          payCardList[4],
          payCardList[0],
          payCardList[3],
        ];
  }, [isLargeScreen]);

  // Función para manejar la aparición de tarjetas
  const appearCards = useCallback(() => {
    const section3 = document.getElementById("planing");
    if (section3) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const containers =
                cardContainer.current.querySelectorAll(".card-container");

              containers.forEach((container, index) => {
                setTimeout(() => {
                  container.classList.add("appear");
                }, index * 200);
              });

              observer.unobserve(entry.target); // Dejar de observar una vez que la sección se vea
            }
          });
        },
        { threshold: 0.5 } // Ajusta el umbral según lo que necesites
      );

      observer.observe(section3); // Observa la sección planing
    }
  }, [cardContainer]);

  useEffect(() => {
    (async () => {
      const { Navigation, Pagination } = await import("swiper/modules");
      setSwiperModules([Navigation, Pagination]);
      await import("swiper/css/navigation");
      await import("swiper/css/pagination");
    })();
  }, []);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsLargeScreen(window.innerWidth >= 1400);
    }, 50);

    window.addEventListener("resize", handleResize);

    // Llama a la función inmediatamente al montar para ver si la sección ya está visible
    appearCards();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [appearCards]);

  if (!swiperModules)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );

  return (
    <>
      {openCountriesList && <div className="seccion3-overlay"></div>}
        <div className="location-wrapper">
          <div
            className={`location ${openCountriesList ? 'location-open' : ''}`}
            onClick={() => setOpenCountriesList(!openCountriesList)}
          >
            {
              window.innerWidth >= 768 ? <span>Moneda: {currencySymbol[selectedCountry]}</span>
                : <span>{currencySymbol[selectedCountry]}</span>
            }
            <KeyboardArrowDown />
          </div>
          {openCountriesList && (
            <ul className="country-dropdown">
              {countries.map((c) => (
                <li
                  key={c.code}
                  onClick={() => {
                    setSelectedCountry(c.code);
                    setOpenCountriesList(false);
                  }}
                >
                  {c.name} ({currencySymbol[c.code]})
                </li>
              ))}
            </ul>
          )}
        </div>
      <Swiper
        modules={swiperModules}
        navigation
        pagination={{ clickable: true }}
        loop
        slidesPerView={4}
        touchStartPreventDefault={false}
        breakpoints={{
          1: { slidesPerView: 1 },
          668: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        className="swiper-container"
      >

        {sortCards().map((card) => (
          <SwiperSlide key={card.id}>
            <article className="card-container" id={`card-container-${card.id}`}>
              {card?.chip && (
                <span
                  className={`chip ${
                    card.id === 2
                      ? "first-chip"
                      : card.id === 4
                      ? "second-chip"
                      : card.id === 5
                      ? "third-chip"
                      : "fourth-chip"
                  }`}
                >
                  {t(card.chip)}
                </span>
              )}
              <div
                className={`card ${
                  card.id === 2 || card.id === 4 || card.id === 5 || card.id === 6
                    ? "no-radius"
                    : "basics-cards"
                }`}
              >
                {card.id === 2 ? (
                  <Suspense>
                    <RecommendOutlinedLazy
                      className="best-plans recommend"
                      aria-label="Recomendado"
                    />
                  </Suspense>
                ) : card.id === 5 ? (
                  <Suspense>
                    <StorefrontLazy
                      className="best-plans e-commerce"
                      aria-label="Tienda en línea"
                    />
                  </Suspense>
                ) : card.id === 6 ? (
                  <Suspense>
                    <img
                      src={tattooMachine}
                      alt="Máquina de tatuajes"
                      className="best-plans tattoo-machine"
                    />
                  </Suspense>
                ) : (
                  card.id === 4 && (
                    <Suspense>
                      <WorkspacePremiumLazy
                        className="best-plans premium"
                        aria-label="Premium"
                      />
                    </Suspense>
                  )
                )}
                <div className="top-card">
                  <div>
                    <h3>{t(card.title)}</h3>
                    <p
                      className={`card-description ${
                        card.id === 2 ? "description-landing" : ""
                      }`}
                    >
                      {t(card.description)}
                    </p>
                  </div>
                  <div>
                    {card.id === 6 ? (
                      <>
                        <span className="card-quotes">
                          {t("payCardsDetails.--paycard-fee-tattoo")}
                        </span>
                        <span id="card-price">
                          <span className="coin-type" aria-label="Moneda">
                            {currencySymbol[selectedCountry]}
                          </span>
                          {card.price[selectedCountry]}
                          <span className="coin-type price-per-month">
                            {t("payCardsDetails.--paycard-monthly-pay")}
                          </span>
                        </span>
                        <Button
                          buttonText={t("payCardsDetails.--paycard-button-query")}
                          buttonClassName="button-variant"
                          aria-label="Consultar precio del plan"
                          textForWhatsapp={t(card.textForContact)}
                        />
                      </>
                    ) : card.id === 2 ? (
                      <>
                        <span className="card-quotes">
                          {t("payCardsDetails.--paycard-fee-landing")}
                        </span>
                        <span id="card-price">
                          <span className="coin-type" aria-label="Moneda">
                            {currencySymbol[selectedCountry]}
                          </span>
                          {card.price[selectedCountry]}
                          <span className="coin-type price-per-month">
                            {t("payCardsDetails.--paycard-monthly-pay")}
                          </span>
                        </span>
                      </>
                    ) : (
                      <Button
                        buttonText={t("payCardsDetails.--paycard-button-query")}
                        buttonClassName="button-variant"
                        aria-label="Consultar precio del plan"
                        textForWhatsapp={t(card.textForContact)}
                      />
                    )}
                    {card.button && (
                      <Button
                        buttonText={t("payCardsDetails.--paycard-button-txt")}
                        aria-label="Elegir este plan"
                        textForWhatsapp={t(card.textForContact)}
                      />
                    )}
                  </div>
                </div>
                <div className="card-separator"></div>
                <Suspense>
                  <PayCardCharacteristicsLazy t={t} card={card} />
                </Suspense>
                {card.id === 6 && (
                  <img
                    src={tattoo}
                    alt="Tatuaje trival"
                    className="tattooImage"
                  />
                )}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    
    </>
  );
};

export default PayCard;
