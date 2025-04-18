import { useEffect, useRef } from "react"

const InfoCard = ({ t, infotext, infoCost, selectedCountry, currencySymbol, isVisible}) => {

  const infoContainer = useRef(null)

  useEffect(() => {
    if (isVisible) {
      console.log(infoContainer.current.className);
      
    }
  }, [isVisible])
  
  const additionalCost = {
    AR: "20000",
    ES: "16",
    US: "20",
    BR: "105"
  }

  return (
    <div ref={infoContainer} className={`info-container ${isVisible ? 'show' : ''}`}>
      {infoCost ? <p>{t(infotext)} {currencySymbol[selectedCountry]}{additionalCost[selectedCountry]}</p>
        : <p>{t(infotext)}</p>
      }
    </div>
  )
}

export default InfoCard