import { lazy, Suspense, useState } from 'react'
import InfoCard from './InfoCard'

const CheckLazy = lazy(() => import('@mui/icons-material/Check'))
const CloseLazy = lazy(() => import("@mui/icons-material/Close"));
const InfoOutlinedLazy = lazy(() => import("@mui/icons-material/InfoOutlined"));
const KeyboardArrowDownLazy = lazy(() => import("@mui/icons-material/KeyboardArrowDown"));


const PayCardCharacteristics = ({ t, card }) => {

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
                                char.type === 'checked' ? <Suspense><CheckLazy className='check-icon' aria-hidden='true' /></Suspense>
                                    : char.type === 'info' ? (<Suspense><InfoOutlinedLazy className='info-icon' aria-hidden='true' /></Suspense>)
                                        : (<Suspense><CloseLazy className='cross-icon' aria-hidden='true' /></Suspense>)
                        }
                            <span className="characteristic-txt" >{t(char.text)}</span>
                            <InfoCard t={t} infotext={char.info} isVisible={hoverIndex === index} />
                        </li>
                ))}
            </ul>
            <button className="characteristic-btn" onClick={handleToggleCharacteristics} aria-expanded={showAll} aria-controls='characteristics-list'>
                {showAll ? t('payCardsDetails.--paycard-view-less') : t('payCardsDetails.--paycard-view-all')}
                
                <Suspense>
                    <KeyboardArrowDownLazy className={`characteristic-btn-arrow ${showAll ? 'rotate-arrow' : ''}`} />
                </Suspense>
                
            </button>
        </div>
    )
}

export default PayCardCharacteristics
