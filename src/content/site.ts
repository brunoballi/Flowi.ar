// Contenido de autoflowi.com volcado al nuevo diseño.
// Todos los textos, links y datos de ejemplo salen de acá.

const WA_NUMBER = "543413487910";
export const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const site = {
  name: "Flowi",
  // Texto que acompaña al isotipo en el nav, el footer y el panel de contacto.
  // Es un nombre más largo, así que ahí va solo (sin el ícono al lado).
  wordmark: "Flowi estudio",
  domain: "autoflowi.com",
  city: "Rosario, Santa Fe",
  email: "brunoballinari@gmail.com",
  instagram: { handle: "@flowi.estudio", url: "https://www.instagram.com/flowi.estudio" },
  whatsapp: { number: WA_NUMBER, general: wa("Hola Flowi, quiero info sobre automatización") },
  seo: {
    title: "Flowi — Automatización a medida para pymes",
    description:
      "Automatizamos los procesos que te roban tiempo: sistemas a medida, bots de WhatsApp, páginas web y tiendas online para pymes. Sin programar y con un plan claro desde la primera reunión.",
    ogImage: "/media/og-flowi.jpg",
    ogImageAlt: "Flowi — Hecho a tu medida. No al revés.",
  },

  nav: {
    links: [
      { label: "Barberías", href: "#flowigest" },
      { label: "Bot WhatsApp", href: "#bot-demo" },
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Servicios", href: "#servicios" },
    ],
    status: "respuesta en menos de 24 h hábiles",
    cta: { label: "Contacto", href: "#contacto" },
  },

  hero: {
    pill: "Automatización para Pymes",
    title: ["Hecho a tu medida. No al", "revés", "."],
    lede: "Automatizamos los procesos que te roban tiempo. Sin programar, sin complicaciones, con un plan claro desde la primera reunión.",
    primary: { label: "Sistema para barberías →", href: "#flowigest" },
    secondary: { label: "Probá el bot en vivo", href: "#bot-demo" },
    stats: [
      { value: "+20", label: "procesos automatizados" },
      { value: "8 a 12", label: "semanas de implementación" },
      { value: "100%", label: "sin que programes nada" },
    ],
    graph: {
      title: "Turno por WhatsApp",
      meta: "3 pasos / 1 rama",
      nodes: {
        trigger: { title: "Mensaje recibido", sub: "whatsapp" },
        cond: { title: "¿Pide turno?", sub: "condición" },
        yes1: { title: "Reservar en agenda", sub: "flowigest" },
        yes2: { title: "Confirmar y recordar", sub: "whatsapp" },
        no: { title: "Responder consulta", sub: "bot" },
      },
      runs: [
        ["turno-barberia", "1,1 s"],
        ["recordatorio-turno", "0,4 s"],
        ["reserva-padel", "1,3 s"],
        ["cierre-de-caja", "0,9 s"],
        ["consulta-precios", "0,6 s"],
        ["liquidacion-comisiones", "2,1 s"],
      ] as [string, string][],
    },
  },

  integrations: {
    label: "se conecta con lo que ya usás",
    // "brand" busca el logo oficial en BRAND_ICONS (src/content/brandIcons.ts).
    // "web" y "formularios" no son marcas: usan un ícono genérico propio.
    items: [
      { key: "whatsapp", kind: "brand", name: "whatsapp" },
      { key: "instagram", kind: "brand", name: "instagram" },
      { key: "facebook", kind: "brand", name: "facebook" },
      { key: "mercadopago", kind: "brand", name: "mercado pago" },
      { key: "gmail", kind: "brand", name: "gmail" },
      { key: "googlesheets", kind: "brand", name: "sheets" },
      { key: "googlecalendar", kind: "brand", name: "calendar" },
      { key: "googlemaps", kind: "brand", name: "maps" },
      { key: "googledrive", kind: "brand", name: "drive" },
      { key: "shopify", kind: "brand", name: "tienda online" },
      { key: "web", kind: "generic", name: "tu web" },
      { key: "qr", kind: "generic", name: "formularios" },
    ] as { key: string; kind: "brand" | "generic"; name: string }[],
  },

  bolillero: {
    eyebrow: "girá el bolillero",
    title: ["Probá tu", "suerte", " antes de arrancar."],
    lede: "Pasá el mouse por el tambor para mezclar las bolillas y dale a girar. Lo que salga, lo reclamás por WhatsApp.",
    button: "Girar",
    again: "Empezar de nuevo",
    claim: "Reclamar por WhatsApp →",
    prizes: [
      { title: "Demo guiada de FlowiGest", text: "Te mostramos el sistema andando, con datos de prueba, y te respondemos todo lo que quieras preguntar." },
      { title: "Diagnóstico exprés de tu negocio", text: "Contanos cómo trabajás hoy y te decimos por dónde conviene arrancar a automatizar. Sin vueltas y sin compromiso." },
    ],
  },

  flowigest: {
    eyebrow: "sistemas a medida para barberías",
    title: ["Probá", "FlowiGest", ", nuestro sistema para barberías."],
    lede: "Tus clientes reservan solos, tus barberos ven su agenda desde el celular y vos controlás la caja desde la compu. Sin planillas y sin cuentas a mano a fin de semana.",
    features: [
      "Reserva de turnos online, sin que nadie atienda el teléfono",
      "Confirmación y recordatorio automáticos por WhatsApp",
      "Liquidaciones automáticas de comisiones por barbero",
      "Control de caja, gastos, adelantos y bonos",
      "Multi-sucursal, reportes financieros y auditoría de cambios",
    ],
    primary: { label: "Quiero empezar una demo →", href: wa("Hola Flowi, quiero empezar una demo de FlowiGest para mi barbería") },
    secondary: { label: "Lo quiero a medida", href: "#contacto" },
    caption: "El panel del admin en la compu y la app del barbero en el celular",
    video: {
      webm: "/media/escena-sistema.webm",
      src: "/media/escena-sistema.mp4",
      poster: "/media/escena-poster.jpg",
      width: 1040,
      height: 620,
      label: "Demo de FlowiGest: el panel del admin en la notebook y la app del barbero en el celular",
    },
  },

  bot: {
    eyebrow: "probalo vos mismo",
    title: ["Así atiende tu negocio mientras vos", "no estás", "."],
    lede: "Elegí tu rubro y hablá con el bot como lo haría un cliente tuyo. Es el mismo flujo que implementamos, funcionando.",
    features: [
      "Responde consultas, precios y horarios solo",
      "Toma reservas y confirma automáticamente",
      "Deriva al humano cuando el cliente lo necesita",
      "Contesta a toda hora, todos los días",
    ],
    cta: { label: "Quiero mi bot →", href: "#contacto" },
    disclaimer: "Demo interactiva · no se envía ningún mensaje real",
  },

  plate: {
    words: "Automatizamos los procesos que te roban tiempo. Vos te dedicás a tu negocio.",
    accent: "tiempo.",
  },

  process: {
    eyebrow: "el proceso",
    title: ["Simple, rápido y a", "medida", "."],
    lede: "Relevamos tu negocio, diseñamos la solución y la dejamos funcionando. Sin tecnicismos.",
    steps: [
      { n: "01", title: "Charla inicial", text: "Entendemos tu negocio, cómo lo manejás hoy y dónde perdés tiempo. Sin costo, sin compromiso." },
      { n: "02", title: "Relevamiento", text: "Analizamos tus procesos actuales y definimos qué se puede automatizar con mayor impacto." },
      { n: "03", title: "Implementación", text: "Configuramos la solución con herramientas no-code. Rápido, probado y sin sorpresas." },
      { n: "04", title: "Entrega y soporte", text: "Te mostramos cómo funciona todo y quedamos disponibles para ajustes y mejoras continuas." },
    ],
    chat: {
      q: "¿Dónde sentís que se te va más tiempo en la semana?",
      a: "Contestando turnos por WhatsApp y haciendo la caja a mano los sábados.",
      r: "Perfecto. Arrancamos por ahí 👌",
    },
    audit: {
      title: "relevamiento · horas por semana",
      rows: [
        ["contestar turnos", 9],
        ["hacer la caja", 5],
        ["mandar recordatorios", 4],
        ["liquidar comisiones", 3],
      ] as [string, number][],
      max: 10,
      note: "* ejemplo de una barbería con 3 barberos",
    },
    build: { nodes: ["WA", "MP", "GS", "GC"], foot: "herramientas no-code · probado antes de salir" },
    handoff: ["Te mostramos cómo funciona todo", "Capacitamos a tu equipo", "Ajustes durante el primer mes", "Mantenimiento mensual opcional"],
  },

  services: {
    eyebrow: "lo que hacemos",
    title: ["Nuestros", "servicios", "."],
    lede: "Cuatro formas de sacarte trabajo de encima. Cada una, a la medida de tu negocio.",
    items: [
      {
        icon: "sistemas",
        badge: "más pedido",
        title: "Sistemas a medida",
        text: "El sistema que tu negocio necesita, diseñado para cómo trabajás vos: turnos, reservas, caja, inventario, clientes y reportes.",
        items: ["Relevamiento y diseño previo", "Panel de administración y vista para tu equipo", "Capacitación del equipo incluida", "Opción de suscripción mensual disponible"],
        link: { label: "¿Tenés una barbería? Conocé FlowiGest →", href: "#flowigest" },
      },
      {
        icon: "bot",
        title: "Bots de WhatsApp",
        text: "Atención automática 24/7 con menú de opciones, captura de datos, confirmación de reservas y derivación a humano cuando hace falta.",
        items: ["Configuración completa del flujo", "Menú interactivo personalizado", "Integración con tu agenda o sistema", "Pruebas y ajustes incluidos"],
        link: { label: "Probalo acá arriba →", href: "#bot-demo" },
      },
      {
        icon: "web",
        title: "Páginas web",
        text: "Tu presencia profesional en internet, lista para que te encuentren y te escriban. Diseñada a la medida de tu marca.",
        items: ["Diseño propio, no una plantilla", "Optimizada para mobile y para Google", "Botón de WhatsApp y formulario de contacto", "Dominio, hosting y SSL (no incluidos)"],
      },
      {
        icon: "tienda",
        title: "Tiendas online",
        text: "Vendé sin depender de contestar mensajes uno por uno: catálogo, carrito y cobro online funcionando solos.",
        items: ["Catálogo con stock y variantes", "Medios de pago y envíos configurados", "Avisos automáticos de cada pedido", "Panel para cargar productos vos mismo"],
      },
    ] as { icon: string; badge?: string; title: string; text: string; items: string[]; link?: { label: string; href: string } }[],
    extra: "También hacemos formularios con QR y encuestas, y mantenimiento mensual de todo lo que implementamos.",
    extraLink: { label: "¿Tenés un proceso específico? Consultanos →", href: "#contacto" },
  },

  numbers: {
    eyebrow: "en números",
    title: ["Lo que ya hicimos, en", "números", "."],
    lede: "Negocios de Rosario que dejaron de contestar lo mismo veinte veces por día.",
    items: [
      { label: "procesos automatizados", prefix: "+", value: 20, suffix: "", viz: "spark" },
      { label: "semanas de implementación", prefix: "", value: 12, suffix: "", lead: "8 a ", viz: "segments" },
      { label: "sin que programes nada", prefix: "", value: 100, suffix: "%", viz: "progress" },
    ] as { label: string; prefix: string; value: number; suffix: string; lead?: string; viz: "spark" | "segments" | "progress" }[],
    cases: [
      ["Barberías", "Turnos online, recordatorios por WhatsApp, caja y comisiones con FlowiGest."],
      ["Complejos de pádel y fútbol", "Reservas de canchas y señas sin que nadie atienda el teléfono."],
      ["Gimnasios", "Inscripción a clases, planes y avisos de vencimiento automáticos."],
    ] as [string, string][],
  },

  contact: {
    eyebrow: "contacto",
    title: ["Hablemos de tu", "negocio", "."],
    text: "Primera consulta sin cargo. Contanos qué necesitás y te armamos una propuesta a medida.",
    fields: {
      name: "Nombre",
      whatsapp: "WhatsApp",
      business: "Tipo de negocio",
      businessPlaceholder: "Seleccioná una opción",
      businessOptions: ["Barbería / peluquería", "Complejo deportivo (pádel / fútbol)", "Gimnasio / estudio fitness", "Gastronomía", "Profesional independiente", "Otro"],
      process: "¿Qué proceso querés automatizar?",
      privacy: "Acepto la Política de Privacidad para que Flowi use mis datos para responder esta consulta.",
    },
    button: "Enviar consulta →",
    success: "¡Listo! Te abrimos WhatsApp con tu consulta armada.",
    info: [
      ["email", "brunoballinari@gmail.com"],
      ["instagram", "@flowi.estudio"],
      ["respuesta", "En menos de 24 horas hábiles"],
    ] as [string, string][],
    brandLine: "Automatización para pequeños y medianos negocios. Hecho a tu medida.",
    waButton: "Hablanos por WhatsApp",
  },

  footer: {
    status: ["primera consulta sin cargo", "respuesta en menos de 24 h hábiles", "hecho en Rosario"],
    tagline: "Sistemas a medida, bots de WhatsApp, páginas web y tiendas online.",
    // Las columnas "servicios" y "flowi" se sacaron: repetían, link por link,
    // lo que ya está en el nav de arriba. Legal es la única que solo vive acá.
    cols: [
      { title: "legal", links: [["Política de Privacidad", "/privacidad"], ["Términos y Condiciones", "/terminos"], ["Cookies", "/cookies"]] },
    ] as { title: string; links: [string, string][] }[],
    copy: "© 2026 Flowi · autoflowi.com",
  },
};

export type Site = typeof site;
