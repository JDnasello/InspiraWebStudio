import { useEffect, useRef } from "react"

const InfoCard = ({ infotext, isVisible}) => {

  const infoContainer = useRef(null)

  useEffect(() => {
    if (isVisible) {
      console.log(infoContainer.current.className);
      
    }
  }, [isVisible])
  

  return (
    <div ref={infoContainer} className={`info-container ${isVisible ? 'show' : ''}`}>
        <p>{infotext}</p>
    </div>
  )
}

export default InfoCard