import { useEffect, useRef, useState } from "react"
import IwStudioPage from "./pages/IwStudioPage"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


function App() {

  const cursorRef = useRef(null)
  const innerCursorRef = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 460)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 460)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) {
      document.querySelector("body").style.cursor = "default"
      document.querySelectorAll("button, a, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .lang-btn")
        .forEach((el) => {
          el.style.cursor = "pointer"
        })
    } else if (!isMobile) {
      document.querySelector('body').style.cursor = 'none'
      document.querySelectorAll("button, a, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .lang-btn")
        .forEach((el) => {
          el.style.cursor = "none"
        })

      const handleMove = e => {
        const posX = e.clientX
        const posY = e.clientY
  
        innerCursorRef.current.style.left = `${posX}px`
        innerCursorRef.current.style.top = `${posY}px`
  
        cursorRef.current.animate(
          {
            top: `${posY}px`,
            left: `${posX}px`
          },
          { duration: 100, fill: "forwards" }
        );
      }
  
      const handleMouseEnter = (e) => {
        const tag = e.target.tagName.toLowerCase()
        const isSwiperControl = e.target.classList.contains("swiper-button-next") ||
                                e.target.classList.contains("swiper-button-prev") ||
                                e.target.classList.contains("swiper-pagination-bullet")
        
        if ( tag === "a" || tag === "button" || isSwiperControl) {
          cursorRef.current.classList.add("hovered");
          innerCursorRef.current.classList.add("hovered");
        }
      }
  
      const handleMouseLeave = (e) => {
        const tag = e.target.tagName.toLowerCase()
        const isSwiperControl = e.target.classList.contains("swiper-button-next") ||
                                e.target.classList.contains("swiper-button-prev") ||
                                e.target.classList.contains("swiper-pagination-bullet")
        
        if ( tag === "a" || tag === "button" || isSwiperControl) {
          cursorRef.current.classList.remove("hovered")
          innerCursorRef.current.classList.remove("hovered")
        }
      }
  
      window.addEventListener('mousemove', handleMove)
      document.body.addEventListener("mouseenter", handleMouseEnter, true)
      document.body.addEventListener("mouseleave", handleMouseLeave, true)
  
      return () => {
        window.removeEventListener("mousemove", handleMove)
        document.body.removeEventListener("mouseenter", handleMouseEnter, true)
        document.body.removeEventListener("mouseleave", handleMouseLeave, true)
      } 
    }
  }, [isMobile])

  return (
    <>
      {
        !isMobile && (
          <>
            <div ref={cursorRef} className="cursor"></div>
            <div ref={innerCursorRef} className="inner-cursor"></div>
          </>
        )
      }
      <IwStudioPage cursorRef={cursorRef} innerCursorRef={innerCursorRef} />
      <a
        href="https://wa.me/+5492284472217?text=Hola%2C%20estoy%20interesado%20en%20tus%20servicios" 
        className="whatsapp-container" 
        aria-label="Contactar por WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
      <WhatsAppIcon className="whatsapp-icon" />
      </a>
    </>
  );
}

export default App
