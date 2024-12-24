import { Check, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

const PayCardCharacteristics = ({ card }) => {

    const [showAll, setShowAll] = useState(false)
    
    const handleToggleCharacteristics = () => {
        setShowAll(prev => !prev)

        showAll ? card.characteristics
            : card.id === 4 ? card.characteristics.slice(0, 6)
                : card.characteristics.slice(0, 5)
    }

    return (
        <ul className="characteristics">
            {card.characteristics.map((char, index) => (
                <li
                key={index}
                className={`characteristic-container ${index < 5 || showAll ? 'show' : 'hide'}`}
                style={{ transitionDelay: `${index >= 5 && showAll ? (index - 5) * 100 : 0}ms`}}
                >
                    <Check sx={{ fill: 'red' }} aria-hidden='true' />
                    <span className="characteristic-txt">{char}</span>
                </li>
            ))}
            <button className="characteristic-btn" onClick={handleToggleCharacteristics} aria-expanded={showAll} aria-controls='characteristic-btn'>
                {showAll ? 'Ver menos características' : 'Ver todas las características'} <KeyboardArrowDown className={`characteristic-btn-arrow ${showAll ? 'rotate-arrow' : ''}`} />
            </button>
        </ul>
    )
}

export default PayCardCharacteristics
