import { Check, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

const PayCardCharacteristics = ({ card }) => {

    const [showAll, setShowAll] = useState(false)
    
    const handleToggleCharacteristics = () => {
        setShowAll(prev => !prev)

        showAll ? card.characteristics : card.characteristics.slice(0, 5)
    }

    return (
        <div className="characteristics">
            {card.characteristics.map((char, index) => (
                <div
                key={index}
                className={`characteristic-container ${index < 5 || showAll ? 'show' : 'hide'}`}
                style={{ transitionDelay: `${index >= 5 && showAll ? (index - 5) * 100 : 0}ms`}}
                >
                    <Check sx={{ fill: 'red' }} />
                    <span className="characteristic-txt">{char}</span>
                </div>
            ))}
            <button className="characteristic-btn" onClick={handleToggleCharacteristics}>
                Ver todas las características <KeyboardArrowDown className={`characteristic-btn-arrow ${showAll ? 'rotate-arrow' : ''}`} />
            </button>
        </div>
    )
}

export default PayCardCharacteristics
