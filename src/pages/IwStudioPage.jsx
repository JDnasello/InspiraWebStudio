import Footer from "../layouts/Footer"
import Section1 from "../layouts/Section1"
import Section2 from "../layouts/Section2"
import Section3 from "../layouts/Section3"


const IwStudioPage = ({ cursorRef, innerCursorRef}) => {
    return (
        <>
            <Section1 cursorRef={cursorRef} innerCursorRef={innerCursorRef} />
            <Section2 />
            <Section3 />
            <Footer />
        </>
    )
}

export default IwStudioPage
