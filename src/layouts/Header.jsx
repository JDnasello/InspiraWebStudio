import '../css/header.css'
import { useState, useEffect, useRef } from 'react'

const Header = () => {

  const [headerClass, setHeaderClass] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    // Función para manejar el scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeaderClass(true)
      } else {
        setHeaderClass(false)
      }
    }

    // Añadir el listener de scroll
    window.addEventListener('scroll', handleScroll)

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])  // Ejecutarse solo al montar el componente

  return (
    <div className={`container-header ${headerClass ? 'header-sticky' : ''}`} ref={headerRef}>
      <div className='header-logo'>
        <img src="logoColor.png" alt="" width={80} height="auto" style={{ zIndex: 10 }} />
        <span className={`header-title ${headerClass ? 'header-sticky-title' : ''}`}>Inspira Web Studio</span>
      </div>
      <header className="header" id='header-id'>
        <nav className="header-nav">
          <a className="nav-link" href="#">
            Nosotros
          </a>
          <a className='nav-link' href='#objectives'>
            Objetivos
          </a>
        </nav>
        <a id="header-call" href='#planing'>Ver planes</a>
      </header>
    </div>
  );
}

export default Header
