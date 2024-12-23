import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "../locales/ru/messages.json";
import { setDefaultOptions } from 'date-fns'
import { ru as ruDate } from 'date-fns/locale'

setDefaultOptions({
  locale: ruDate,
})

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