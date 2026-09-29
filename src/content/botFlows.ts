// Flujos del bot de demo. Cada nodo: mensajes del bot y opciones que llevan a otro nodo.
// "{pick}" se reemplaza por la última opción elegida.

export type BotNode = { bot: string[]; options: [label: string, next: string][] };
export type BotFlow = { id: string; tab: string; emoji: string; name: string; nodes: Record<string, BotNode> };

const back: [string, string] = ["↩ Volver al menú", "start"];

export const botFlows: BotFlow[] = [
  {
    id: "barberia",
    tab: "Barbería",
    emoji: "💈",
    name: "Barbería Norte",
    nodes: {
      start: {
        bot: ["¡Hola! 👋 Soy el asistente de Barbería Norte. ¿Qué necesitás?"],
        options: [
          ["💈 Reservar un turno", "servicio"],
          ["💰 Ver precios", "precios"],
          ["📍 Horarios y dirección", "horarios"],
          ["🙋 Hablar con alguien", "humano"],
        ],
      },
      servicio: { bot: ["¡Dale! ¿Qué servicio querés?"], options: [["Corte", "dia"], ["Corte + barba", "dia"], ["Barba", "dia"]] },
      dia: { bot: ["Perfecto: {pick}. ¿Para qué día?"], options: [["Hoy", "hora"], ["Mañana", "hora"], ["Sábado", "hora"]] },
      hora: { bot: ["Para {pick} tengo estos horarios libres 👇"], options: [["15:30 con Lucas", "ok"], ["17:00 con Nico", "ok"], ["18:30 con Maxi", "ok"]] },
      ok: {
        bot: ["✅ ¡Listo! Tu turno quedó reservado: {pick}.", "Te mando un recordatorio por WhatsApp 2 horas antes. Si no podés venir, respondé CANCELAR."],
        options: [back],
      },
      precios: {
        bot: ["Estos son nuestros precios:", "💈 Corte: $12.000\n🧔 Barba: $8.000\n✨ Corte + barba: $18.000"],
        options: [["💈 Reservar un turno", "servicio"], back],
      },
      horarios: { bot: ["📍 Estamos en Av. Pellegrini 1450, Rosario.", "🕘 Lunes a sábado de 9 a 20 h."], options: [["💈 Reservar un turno", "servicio"], back] },
      humano: { bot: ["Te paso con alguien del equipo 🙋", "En unos minutos te escriben por acá mismo."], options: [back] },
    },
  },
  {
    id: "padel",
    tab: "Pádel",
    emoji: "🎾",
    name: "Complejo El Pádel",
    nodes: {
      start: {
        bot: ["¡Hola! 👋 Soy el asistente de El Pádel. ¿En qué te puedo ayudar?"],
        options: [
          ["🎾 Reservar una cancha", "dia"],
          ["💰 Ver precios y horarios", "precios"],
          ["📍 Ubicación y cómo llegar", "ubicacion"],
          ["🙋 Hablar con alguien", "humano"],
        ],
      },
      dia: { bot: ["¡Genial! ¿Para cuándo querés reservar?", "📅 Elegí una opción:"], options: [["Hoy", "hora"], ["Mañana", "hora"], ["Otro día", "otro"]] },
      otro: { bot: ["Escribime el día y te paso las canchas libres. Mientras tanto, estos son los de mañana 👇"], options: [["Mañana", "hora"], back] },
      hora: { bot: ["Canchas libres para {pick}:"], options: [["19:00 · Cancha 1", "sena"], ["20:30 · Cancha 2", "sena"], ["22:00 · Cancha 3", "sena"]] },
      sena: {
        bot: ["✅ Te reservé {pick} por 90 minutos.", "Para confirmar, aboná la seña con este link de Mercado Pago: mpago.la/demo 💳"],
        options: [back],
      },
      precios: {
        bot: ["🎾 Turno de 90 min: $24.000 la cancha.", "💡 Con luz desde las 19 h.\n🕘 Abierto todos los días de 8 a 24 h."],
        options: [["🎾 Reservar una cancha", "dia"], back],
      },
      ubicacion: { bot: ["📍 Estamos en Av. Eva Perón 7800, Rosario.", "🚗 Hay estacionamiento gratis en la puerta."], options: [back] },
      humano: { bot: ["Te paso con alguien del complejo 🙋", "En unos minutos te escriben por acá mismo."], options: [back] },
    },
  },
  {
    id: "gimnasio",
    tab: "Gimnasio",
    emoji: "🏋️",
    name: "Gym Centro",
    nodes: {
      start: {
        bot: ["¡Hola! 👋 Soy el asistente de Gym Centro. ¿En qué te ayudo?"],
        options: [
          ["🗓 Anotarme a una clase", "clase"],
          ["💰 Planes y precios", "planes"],
          ["📍 Horarios y dirección", "horarios"],
          ["🙋 Hablar con alguien", "humano"],
        ],
      },
      clase: { bot: ["¿A qué clase te querés anotar?"], options: [["Funcional", "turno"], ["Spinning", "turno"], ["Yoga", "turno"]] },
      turno: { bot: ["Próximas clases de {pick}:"], options: [["Hoy 19:00", "ok"], ["Mañana 8:00", "ok"], ["Mañana 19:00", "ok"]] },
      ok: { bot: ["✅ ¡Anotado! Te guardé el lugar para {pick}.", "Te aviso por acá si cambia algo o se libera un cupo."], options: [back] },
      planes: {
        bot: ["Estos son nuestros planes:", "💪 Pase libre: $35.000/mes\n🗓 3 veces por semana: $28.000/mes\n🎟 Clase suelta: $6.000"],
        options: [["🗓 Anotarme a una clase", "clase"], back],
      },
      horarios: { bot: ["📍 Estamos en Córdoba 1850, Rosario.", "🕘 Lunes a viernes de 7 a 23 h, sábados de 9 a 18 h."], options: [back] },
      humano: { bot: ["Te paso con alguien de recepción 🙋", "En unos minutos te escriben por acá mismo."], options: [back] },
    },
  },
];
