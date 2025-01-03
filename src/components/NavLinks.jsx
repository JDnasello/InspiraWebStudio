
const NavLinks = ({ closeMenu, scrollToPlaning }) => {
  return (
    <>
        <a className="nav-link" href="#footer" title="Nosotros" onClick={closeMenu}>
            Nosotros
          </a>
          <a className="nav-link" href="#objectives" title="¿Qué ofrecemos?" onClick={closeMenu}>
          ¿Qué ofrecemos?
          </a>
          <a className="nav-link" href="#planing" title="Planes de pago" onClick={() => { closeMenu(); scrollToPlaning() }}>
            Ver planes
          </a>
    </>
  )
}

export default NavLinks