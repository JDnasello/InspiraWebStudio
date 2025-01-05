
const Button = ({ buttonText, buttonClassName, textForWhatsapp }) => {

  return (
    <a
      className={`custom-btn ${buttonClassName}`}
      href={`https://wa.me/+5492284472217?text=${textForWhatsapp}`}
      aria-label="Contactar por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
}

export default Button
