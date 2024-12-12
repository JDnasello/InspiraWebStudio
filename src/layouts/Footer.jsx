import '../css/footer.css'
import logo from '../assets/logoSinColor.png'

const Footer = () => {
    return (
        <footer>
            <div className='container-footer-logo'>
                <img src={logo} alt="" width={100} height='auto' />
                <span className='footer-title'>Inspira Web Studio</span>
            </div>
        </footer>
    ) 
}

export default Footer
