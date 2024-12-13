import '../css/footer.css'
import logo from '../assets/logoSinColor.png'

// <div><span>inspira@webstudio.com</span></div>

const Footer = () => {
    return (
        <footer>
            <div className="nav-footer">
            <div className='container-footer-logo'>
                <a href="#" >
                <img src={logo} alt="" width={70} height='auto' />
                <span className='footer-title'>Inspira Web Studio</span>
                </a>
            </div>
                <div className='nav-section section-1'>
                    <span className='nav-section-title'>Nosotros</span>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium aliquid id accusantium provident, quaerat voluptatum eius necessitatibus quo totam consectetur exercitationem aspernatur corporis, dolore odio magni, delectus hic velit.</p>
                </div>
                <div className='nav-section section-2'>
                    <span className='nav-section-title'>Menú</span>
                    <a className='a-us' href="#">
                        Nosotros
                    </a>
                    <a href='#objectives'>
                        Objetivos
                    </a>
                    <a href="#">
                        Portfolio
                    </a>
                    <a href="#planing">
                        Ver planes
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
