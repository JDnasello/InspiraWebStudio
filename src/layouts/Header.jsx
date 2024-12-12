import '../css/header.css'

const Header = ({ headerRef }) => {
    return (
      <div className="container-header" ref={headerRef}>
        <div className="container-logo">
          <img src='logoColor.png' alt="" width={100} height="auto" />
          <span className="header-title">Inspira Web Studio</span>
        </div>
        <header className="header">
          <nav className="header-nav">
            <a className="nav-link" href="#">
              Nosotros
            </a>
            <a className='nav-link' href='#objectives'>
              Objetivos
            </a>
            <a className="nav-link" href="#">
              Portfolio
            </a>
          </nav>
          <a id="header-call" href='#planing'>Ver planes</a>
        </header>
      </div>
    );
}

export default Header
