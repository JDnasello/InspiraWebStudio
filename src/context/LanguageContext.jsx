import { useTranslation } from "react-i18next";
import { createContext, useContext } from "react";

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ t, i18n, changeLanguage }}>
        {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
