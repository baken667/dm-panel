import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "../locales/ru/messages.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ru
    }
  },
  lng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;