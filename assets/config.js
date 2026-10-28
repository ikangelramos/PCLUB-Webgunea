/* ==========================================================
   PCLUB – configuración (edita solo este archivo)
   ========================================================== */

/* 1) ENVÍO DE FORMULARIOS
   Los formularios (contacto, reserva e inscripción a torneos) se envían
   a este correo mediante FormSubmit (formsubmit.co, gratuito).
   IMPORTANTE: la primera vez que alguien envíe un formulario, FormSubmit
   mandará un correo de ACTIVACIÓN a esa dirección: hay que abrirlo y
   pulsar el enlace de confirmación. Después llegan todos los mensajes.
   Para usar Formspree o Web3Forms en su lugar, cambia "endpoint". */
window.PCLUB_FORMS = {
  endpoint: "https://formsubmit.co/ajax/ik.angelramos@hernanilanh.eus",
  accessKey: "",
  fallbackEmail: "ik.angelramos@hernanilanh.eus"
};

/* 2) DATOS LEGALES (aviso legal y política de privacidad)
   Rellena estos dos campos y se actualizan solos en los 5 idiomas.
   Escribe los datos REALES del titular del negocio. */
window.PCLUB_LEGAL = {
  owner: "",   // Razón social o nombre del titular, p. ej. "PCLUB Errenteria S.L."
  nif: ""      // NIF/CIF del titular
};

/* 3) OPINIONES
   AHORA HAY OPINIONES DE EJEMPLO (proyecto de demostración): cada una
   muestra la etiqueta "Opinión de ejemplo". Antes de publicar el sitio de
   verdad, BÓRRALAS y sustitúyelas por opiniones auténticas de clientes
   (quita la marca  demo: true  de las reales).
   "text" y "role" pueden ser un texto o un objeto por idioma {eu,es,en,fr,de}. */
window.PCLUB_SITE = {
  googleReviewsUrl: "",
  reviews: [
    { name: "Ane M.", stars: 5, demo: true,
      role: { eu: "Ikaslea", es: "Estudiante", en: "Student", fr: "Étudiante", de: "Studentin" },
      text: { eu: "Gela pribatua azterketak prestatzeko: lasaia, ordenagailu azkarrak eta tabernako kafea primeran.",
              es: "Sala privada para preparar los exámenes: tranquila, ordenadores rápidos y el café de la taberna viene genial.",
              en: "A private room to prepare my exams: quiet, fast computers and the bar coffee is a lifesaver.",
              fr: "Salle privée pour réviser mes examens : calme, ordinateurs rapides et le café du bar est un vrai plus.",
              de: "Privater Raum zum Prüfungslernen: ruhig, schnelle Rechner, und der Kaffee von der Bar rettet den Tag." } },
    { name: "Jon A.", stars: 5, demo: true,
      role: { eu: "Jokalaria", es: "Jugador", en: "Gamer", fr: "Joueur", de: "Gamer" },
      text: { eu: "Gaming Pro-k RTX 4070rekin oso ondo doa. Lagunekin joan ginen gune irekira eta arratsalde osoa jolasten pasatu genuen.",
              es: "El Gaming Pro con RTX 4070 va fino. Fuimos con amigos a la zona abierta y nos pasamos toda la tarde jugando.",
              en: "The Gaming Pro with an RTX 4070 runs great. We went with friends to the open area and played all afternoon.",
              fr: "Le Gaming Pro avec RTX 4070 tourne très bien. Nous sommes venus entre amis dans l’espace ouvert et avons joué tout l’après-midi.",
              de: "Der Gaming Pro mit RTX 4070 läuft top. Wir waren mit Freunden im offenen Bereich und haben den ganzen Nachmittag gespielt." } },
    { name: "Marta R.", stars: 5, demo: true,
      role: { eu: "Diseinatzailea", es: "Diseñadora", en: "Designer", fr: "Designer", de: "Designerin" },
      text: { eu: "Errendimendu handiko ekipoak erabiltzen ditut Blenderren errenderizatzeko. Ez dut PC garesti bat erosi behar.",
              es: "Uso los equipos de alto rendimiento para renderizar en Blender. No tengo que comprar un PC carísimo.",
              en: "I use the high-performance machines to render in Blender. I don’t have to buy an expensive PC.",
              fr: "J’utilise les machines haute performance pour faire mes rendus dans Blender. Pas besoin d’acheter un PC hors de prix.",
              de: "Ich nutze die Hochleistungsrechner zum Rendern in Blender. Einen teuren PC muss ich nicht kaufen." } },
    { name: "Lucas P.", stars: 5, demo: true,
      role: { eu: "Ingeniaritza-ikaslea", es: "Estudiante de ingeniería", en: "Engineering student", fr: "Étudiant en ingénierie", de: "Ingenieurstudent" },
      text: { eu: "Prototipo bat inprimatu nuen 3Dn klaserako lan batean. Fitxategia prestatzen lagundu zidaten.",
              es: "Imprimí un prototipo en 3D para un trabajo de clase. Me ayudaron a preparar el archivo.",
              en: "I 3D-printed a prototype for a class project. They helped me prepare the file.",
              fr: "J’ai imprimé un prototype en 3D pour un travail de classe. On m’a aidé à préparer le fichier.",
              de: "Ich habe einen Prototyp für ein Uniprojekt in 3D gedruckt. Man hat mir bei der Datei geholfen." } },
    { name: "Nora S.", stars: 4, demo: true,
      role: { eu: "Ama", es: "Madre", en: "Parent", fr: "Maman", de: "Mutter" },
      text: { eu: "Nire semearen urtebetetzea PCLUBen: dena erraza, pizzarekin eta lagun pozik batzuekin.",
              es: "El cumpleaños de mi hijo en PCLUB: todo fácil, con pizza y un grupo de amigos encantados.",
              en: "My son’s birthday at PCLUB: everything was easy, with pizza and a happy group of friends.",
              fr: "L’anniversaire de mon fils chez PCLUB : tout était simple, avec des pizzas et des amis ravis.",
              de: "Der Geburtstag meines Sohnes bei PCLUB: alles unkompliziert, mit Pizza und glücklichen Freunden." } },
    { name: "Iker G.", stars: 5, demo: true,
      role: { eu: "Langilea", es: "Trabajador", en: "Professional", fr: "Salarié", de: "Berufstätiger" },
      text: { eu: "Telefonoz erreserbatu nuen eta dena prest zegoen iristean. Prezioak garbi, ezusterik gabe.",
              es: "Reservé por teléfono y estaba todo listo al llegar. Precios claros y sin sorpresas.",
              en: "I booked by phone and everything was ready when I arrived. Clear prices, no surprises.",
              fr: "J’ai réservé par téléphone et tout était prêt à mon arrivée. Prix clairs, sans surprise.",
              de: "Ich habe telefonisch reserviert, bei Ankunft war alles bereit. Klare Preise, keine Überraschungen." } }
  ]
};
