import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import locale2 from 'locale2'

i18n
//  .use(XHR)
// and check https://github.com/i18next/i18next-browser-languageDetector for client side !!!
// and this https://github.com/i18next/i18next-browser-languageDetector/issues/150
  .use(initReactI18next) // if not using I18nextProvider
  .init({
    lng: locale2.substr(0,2),
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },

    resources: {
      en: {
        translation: {
          "h01": "Beginning",
          "h02": "Patriarchs",
          "h03": "Exodus",
          "h04": "In the Promised Land",
          "h05": "Exile, Return and waiting on the Messiah",
          "h06": "Jesus Starts His Ministry",
          "h07": "Stories and Miracles",
          "h08": "Triumph Over Death",
          "h09": "The Church Begins",
          "h10": "God’s New Covenant",
          "000-01": "Genesis",
          "000-01-descr": "In the Beginning",
          "000-02": "Exodus",
          "000-02-descr": "Leaving Egypt until Joshua",
          "000-03": "Judges",
          "000-03-descr": "including first part of 1Samuel",
          "000-04": "First 3 kings",
          "000-04-descr": "of Israel - and their writings",
          "000-05": "Divided kingdom",
          "000-05-descr": "until the start of the second exile, including Isaiah & Jeremiah",
          "000-06": "The exile",
          "000-06-descr": "including the return from exile, Ezekiel & minor prophets",
          "000-07": "Gospels",
          "000-07-descr": "Matthew, Mark, Luke and John",
          "000-08": "Acts",
          "000-08-descr": "of the apostles",
          "000-09": "Epistles",
          "000-09-descr": "including Revelation",
          "000-10": "Poetic Books",
          "000-10-descr": "Psalms, songs, proverbs and poems",
          "loadingStories": "Loading stories from internet",
          "noFS": "No Filesystem detected",
          "gettingLocalStories": "Getting local stories",
          "noLocalDownloading": "There are no local stories, downloading stories to filesystem",
          "oldDownloadingNew": "Current object has an old structure, downloading new stories to filesystem",
          "noInternetUsingLocal": "There is no internet, using local stories",
          "newVersionDetected": "There is a new version on the server, downloading new version to filesystem",
          "latestVersionIsLocal": "Latest version on system, loading stories from filesystem",
          "noInternet": "No internet available to fetch and store stories",
          "storingStoriesOnFS": "Storing stories on local file system",
          "noStoredStories": "No stored story found.",
          "noStorySent": 'No story was sent',
          "storyNotFound": 'The specified story was not found',
          "frameNotFound": 'The specified frame was not found',
        },
      },
      de: {
        translation: {
          "h01": "Im Anfang",
          "h02": "Patriarchen",
          "h03": "Auszug",
          "h04": "Im gelobten Land",
          "h05": "Exil, Rückkehr, Warten auf dem Messias",
          "h06": "Jesus beginnt sein Wirken",
          "h07": "Geschichten und Wunder",
          "h08": "Triumph über den Tod",
          "h09": "Die Kirche beginnt",
          "h10": "Gottes neuer Bund",
          "000-01": "Im Anfang",
          "000-01-descr": "von den Anfängen der Welt und den drei Patriarchen",
          "000-02": "Auszug aus Ägypten ",
          "000-02-descr": "Vom Sklaverei bis Ankunft im gelobten Land",
          "000-03": "Richter",
          "000-04": "Die ersten drei Könige",
          "000-05": "Geteiltes Königreich",
          "000-06": "Exil",
          "000-07": "Die Evangelien",
          "000-07-descr": "Mattäus, Markus, Lukas und Johannes",
          "000-08": "Apostelgeschichte",
          "000-09": "Briefe",
          "000-09-descr": "und die Offenbarung",
          "000-10": "Poetische Bücher",
          "000-10-descr": "Psalms, songs, proverbs and poems"
        },
      },
      "es-419": {
        translation: {
          "h01": "Comienzo",
          "h02": "Patriarcas",
          "h03": "Éxodo",
          "h04": "En la tierra prometida",
          "h05": "Exilio, Retorno y espera del Mesías",
          "h06": "Jesús inicia su ministerio",
          "h07": "Narraciónes y Milagros",
          "h08": "Triunfo sobre la muerte",
          "h09": "La Iglesia Comienza",
          "h10": "El nuevo pacto de Dios",
          "loadingStories": "Loading stories from internet",
          "noFS": "No Filesystem detected",
          "gettingLocalStories": "Obtener narraciónes locales",
          "noLocalDownloading": "No hay narraciónes locales, descargando narraciónes al dispositivo",
          "oldDownloadingNew": "El objeto actual tiene una estructura obsoleta, descargando nuevas narraciónes",
          "noInternetUsingLocal": "Sin acceso a internet, usando narraciónes locales",
          "newVersionDetected": "Hay una nueva versión en el servidor, descargando la nueva versión",
          "latestVersionIsLocal": "Última versión en el sistema, cargando narraciónes locales",
          "noInternet": "No hay Internet disponible para buscar y almacenar narraciónes",
          "storingStoriesOnFS": "Almacenar narraciónes en un dispositivo local",
          "noStoredStories": "No se encontró ninguna story almacenada.",
          "noStorySent": 'No se envió un story',
          "storyNotFound": 'No se encontró el story especificado',
          "frameNotFound": 'No se encontró el frame especificado',
        },
      },
    },
  })

export default i18n
