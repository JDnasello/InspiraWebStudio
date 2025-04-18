
const NavLinks = ({ closeMenu, scrollToPlaning, t }) => {
  return (
    <>
        <a className="nav-link" href="#footer" title="Nosotros" onClick={closeMenu}>
            {t('header.--head-about')}
          </a>
          <a className="nav-link" href="#objectives" title="¿Qué ofrecemos?" onClick={closeMenu}>
          {t('header.--head-offer')}
          </a>
          <a className="nav-link" href="#planing" title="Planes de pago" onClick={() => { closeMenu(); scrollToPlaning() }}>
            {t('header.--head-plans')}
          </a>
    </>
  )
}

export default NavLinks