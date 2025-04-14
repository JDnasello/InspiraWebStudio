import Section1 from "../layouts/Section1"
import Header from "../layouts/Header"
import { lazy, Suspense } from "react"
import LanguageProvider from "../context/LanguageContext"

const Section2Lazy = lazy(() => import('../layouts/Section2'))
const Section3Lazy = lazy(() => import("../layouts/Section3"))
const FooterLazy = lazy(() => import('../layouts/Footer'))

const IwStudioPage = ({ cursorRef, innerCursorRef}) => {

    return (
        <LanguageProvider>
            <Header />
            <Section1 cursorRef={cursorRef} innerCursorRef={innerCursorRef} />
            <Suspense>
                <Section2Lazy />
            </Suspense>

            <Suspense>
                <Section3Lazy />
            </Suspense>

            <Suspense>
                <FooterLazy />
            </Suspense>
        </LanguageProvider>
    )
}

export default IwStudioPage
