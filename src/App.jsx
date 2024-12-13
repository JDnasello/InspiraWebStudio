import { useEffect, useRef } from "react"
import IwStudioPage from "./pages/IwStudioPage"


function App() {

  const cursorRef = useRef(null)
  const innerCursorRef = useRef(null)

  useEffect(() => {
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
      if (e.target.tagName.toLowerCase() === "a" || e.target.tagName.toLowerCase() === "button") {
        cursorRef.current.classList.add("hovered");
        innerCursorRef.current.classList.add("hovered");
      }
    }

    const handleMouseLeave = (e) => {
      if (e.target.tagName.toLowerCase() === "a" || e.target.tagName.toLowerCase() === "button") {
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
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={innerCursorRef} className="inner-cursor"></div>
      <IwStudioPage cursorRef={cursorRef} innerCursorRef={innerCursorRef} />
    </>
  );
}

export default App
