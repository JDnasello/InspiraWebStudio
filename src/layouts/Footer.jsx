import '../css/footer.css'
import logo from '../assets/logoSinColor.png'

const Footer = () => {
    return (
        <footer>
            <div><p>inspira@webstudio.com</p></div>
            {/* <div className="nav-footer">
                <p>Menú</p>
                <a className="nav-link" href="#">
                    Nosotros
                </a>
                <a className='nav-link' href='#objectives'>
                    Objetivos
                </a>
                <a className="nav-link" href="#">
                    Portfolio
                </a>
                <a className="nav-link" href="#planing">
                    Ver planes
                </a>
            </div> */}
            <div className='container-footer-logo'>
                <a href="#" >
                <img src={logo} alt="" width={100} height='auto' />
                <span className='footer-title'>Inspira Web Studio</span>
                </a>
            </div>
        </footer >
    )
}

export default Footer
