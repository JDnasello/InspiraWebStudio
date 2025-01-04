import { Check, Close, InfoOutlined, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'
import InfoCard from './InfoCard'

const PayCardCharacteristics = ({ card }) => {

    const [showAll, setShowAll] = useState(false)
    const [hoverIndex, setHoverIndex] = useState(null)

    const handleEnter = index => {
        setHoverIndex(index)
    }

    const handleLeave = () => {
        setHoverIndex(null)
    }

    const handleToggleCharacteristics = () => {
        setShowAll(prev => !prev)

        
    }

    return (
        <div>
            <ul className="characteristics" id="characteristics-list">
                {card.characteristics.map((char, index) => (
                        <li
                        key={char.id}
                            className={`characteristic-container ${index < 6 || showAll ? 'show' : 'hide'}`}
                            style={{ transitionDelay: `${index >= 5 && showAll ? (index - 5) * 100 : 0}ms` }}
                            onMouseEnter={char.type === 'info' ? () => handleEnter(index) : undefined}
                            onMouseLeave={char.type === 'info' ? handleLeave : undefined}
                        >   
                            {
                                char.type === 'checked' ? <Check className='check-icon' aria-hidden='true' />
                                    : char.type === 'info' ? <InfoOutlined className='info-icon' aria-hidden='true' />
                                        : <Close className='cross-icon' aria-hidden='true' />
                                }
                            <span className="characteristic-txt" >{char.text}</span>
                            <InfoCard infotext={char.info} isVisible={hoverIndex === index} />
                        </li>
                ))}
            </ul>
            <button className="characteristic-btn" onClick={handleToggleCharacteristics} aria-expanded={showAll} aria-controls='characteristics-list'>
                {showAll ? 'Ver menos características' : 'Ver todas las características'} <KeyboardArrowDown className={`characteristic-btn-arrow ${showAll ? 'rotate-arrow' : ''}`} />
            </button>
        </div>
    )
}

export default PayCardCharacteristics
