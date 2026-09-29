import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Política de Privacidad — ${site.name}`,
  description: "Qué datos recolecta autoflowi.com, para qué se usan y cómo ejercer tus derechos, en línea con la Ley 25.326.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de Privacidad" updated="septiembre de 2026">
      <p>
        Esta política explica qué datos personales recolecta <strong>{site.name}</strong> ({site.domain}) a través de
        este sitio, para qué los usa y qué derechos tenés sobre ellos, en línea con la Ley 25.326 de Protección de
        Datos Personales de la República Argentina.
      </p>

      <h2>Qué datos recolectamos</h2>
      <p>El único lugar del sitio donde se recolectan datos personales es el formulario de contacto de la sección &quot;Contacto&quot;. Ahí pedimos:</p>
      <ul>
        <li>Nombre</li>
        <li>Número de WhatsApp</li>
        <li>Tipo de negocio</li>
        <li>Descripción del proceso que querés automatizar</li>
      </ul>
      <p>
        No pedimos nada más. No hay campo de email, ni de dirección, ni de datos de facturación: para responderte una
        consulta comercial alcanza con saber cómo te llamás, a qué te dedicás y por dónde contestarte. Los cuatro
        campos son obligatorios: sin completarlos, el formulario no se envía.
      </p>

      <h2>Para qué los usamos</h2>
      <p>
        Únicamente para responder tu consulta comercial y armarte una propuesta. No usamos tus datos para enviarte
        publicidad no solicitada ni los compartimos, vendemos o cedemos a terceros.
      </p>

      <h2>Adónde van tus datos</h2>
      <p>
        Al enviar el formulario, tus datos pasan primero por el propio servidor de {site.name} (alojado en Vercel),
        que no los guarda en ninguna base de datos: hoy los usa únicamente para reenviarte a WhatsApp con tu consulta
        ya armada, para que la envíes vos. Es el mismo tratamiento que tendría cualquier mensaje que nos mandes por tu
        cuenta.
      </p>
      <p>
        Eso implica que los datos que escribiste pasan por <strong>WhatsApp, un servicio de Meta Platforms</strong>, y
        quedan sujetos a las políticas de esa empresa, incluida la transferencia a servidores fuera de la Argentina.
      </p>
      <p>
        Si preferís no usar WhatsApp, escribinos por email a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> y tu consulta no pasa por Meta.
      </p>
      <p>Además interviene, sin recibir los datos del formulario:</p>
      <ul>
        <li>
          <strong>Vercel</strong>, que aloja el sitio y guarda registros técnicos del servidor con tu dirección IP,
          por seguridad y diagnóstico.
        </li>
      </ul>
      <p>
        Las tipografías y las animaciones del sitio están incluidas en el propio código: no se piden a servidores de
        terceros al cargar la página. El detalle completo está en la{" "}
        <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>Con qué base legal</h2>
      <p>
        Tratamos tus datos porque nos diste tu consentimiento libre, expreso e informado al marcar la casilla del
        formulario, como exige el artículo 5 de la Ley 25.326. Sin esa casilla el formulario no se envía. Podés
        retirar ese consentimiento cuando quieras, escribiéndonos.
      </p>

      <h2>Cuánto los conservamos</h2>
      <p>
        Tu consulta queda en el historial del chat de WhatsApp o del email, según por dónde nos escribas. La
        conservamos mientras dure la conversación comercial y hasta dos años después, por si retomás el contacto. Si
        nos pedís que la borremos, la borramos antes.
      </p>

      <h2>Cookies y analítica</h2>
      <p>
        Este sitio no instala cookies ni usa herramientas de analítica o publicidad. Guarda una sola cosa en tu
        navegador, técnica y necesaria para que el sitio funcione. El detalle completo está en la{" "}
        <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>Menores de edad</h2>
      <p>
        Este sitio se dirige a personas que manejan un negocio y no está pensado para menores de 18 años. No
        recolectamos datos de menores a sabiendas. Si detectás que un menor nos envió datos, avisanos y los
        eliminamos.
      </p>

      <h2>Seguridad</h2>
      <p>
        El sitio se sirve siempre por conexión cifrada (HTTPS). Como no guardamos tus datos en ninguna base propia, no
        hay un depósito nuestro que pueda ser vulnerado: la seguridad de la conversación depende de WhatsApp o de tu
        proveedor de correo, según el canal que elijas.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Como titular de tus datos, tenés derecho a acceder, rectificar, actualizar o solicitar la supresión de tus
        datos personales en cualquier momento. Para ejercerlo, escribinos a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley 25.326, tiene la
        atribución de atender denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por
        incumplimiento de las normas vigentes en materia de protección de datos personales (
        <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener">
          www.argentina.gob.ar/aaip
        </a>
        ).
      </p>

      <h2>Cambios en esta política</h2>
      <p>Si la modificamos, actualizamos la fecha del encabezado. La versión vigente es siempre la publicada en esta dirección.</p>

      <h2>Contacto</h2>
      <p>
        Ante cualquier duda sobre esta política, escribinos a <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <div className="legal-footer">
        <a href="/terminos">Términos y Condiciones</a>
        <a href="/cookies">Cookies</a>
        <span>
          {site.name} · {site.domain}
        </span>
      </div>
    </LegalPage>
  );
}
