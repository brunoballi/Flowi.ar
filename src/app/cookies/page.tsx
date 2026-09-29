import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Política de Cookies — ${site.name}`,
  description: "Qué guarda autoflowi.com en tu dispositivo y qué terceros intervienen. El sitio no usa cookies ni herramientas de seguimiento.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage title="Política de Cookies" updated="septiembre de 2026">
      <div className="callout">
        <p>
          <strong>En resumen:</strong> este sitio no usa cookies. No hay analítica, ni píxeles publicitarios, ni
          seguimiento de ningún tipo. Guarda una sola cosa en tu navegador, para que el sitio funcione mejor, y no
          sale de tu dispositivo.
        </p>
      </div>

      <h2>Cookies</h2>
      <p>
        {site.domain} no instala cookies, ni propias ni de terceros. Podés verificarlo vos mismo abriendo las
        herramientas de desarrollo de tu navegador (F12), en la pestaña &quot;Aplicación&quot; o
        &quot;Almacenamiento&quot;.
      </p>

      <h2>Qué guardamos en tu navegador</h2>
      <p>
        Usamos un único mecanismo de almacenamiento local. A diferencia de las cookies, lo que se guarda ahí nunca
        viaja al servidor: queda solo en tu dispositivo y no podemos leerlo desde afuera.
      </p>

      <table>
        <tbody>
          <tr>
            <th>Qué</th>
            <th>Para qué</th>
            <th>Cuánto dura</th>
          </tr>
          <tr>
            <td>
              <code>flowi-loader-seen</code>
              <br />
              (almacenamiento de sesión)
            </td>
            <td>Recordar que ya viste la animación de entrada, para no repetirla si navegás de nuevo dentro del sitio en la misma pestaña.</td>
            <td>Mientras dure la pestaña abierta. Se borra al cerrarla.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Podés borrarlo en cualquier momento desde la configuración de tu navegador, en la sección de datos de sitios.
        Si lo hacés, el sitio sigue funcionando igual: solo vas a volver a ver la animación de entrada.
      </p>

      <h2>Terceros que intervienen</h2>
      <p>
        Las tipografías y las librerías de animación del sitio están incluidas en su propio código, generado en el
        momento de publicarlo: tu navegador no le pide nada a Google Fonts ni a ningún otro servidor de terceros para
        mostrarlas. Solo interviene el que aloja el sitio:
      </p>

      <table>
        <tbody>
          <tr>
            <th>Servicio</th>
            <th>Para qué</th>
            <th>Qué recibe</th>
          </tr>
          <tr>
            <td>
              Vercel
              <br />
              <small>alojamiento del sitio</small>
            </td>
            <td>Servir la página</td>
            <td>Registros técnicos del servidor, que incluyen tu IP, por seguridad y diagnóstico.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Si entrás al demo del bot de WhatsApp, nada de esa conversación sale del sitio: es una simulación que corre en
        tu navegador y no envía ningún mensaje real.
      </p>

      <h2>¿Hace falta que aceptes algo?</h2>
      <p>
        No, y por eso no vas a encontrar el típico cartel de cookies. En Argentina, la Ley 25.326 regula el
        tratamiento de datos personales pero no exige consentimiento previo para el almacenamiento técnico que no
        identifica a nadie, y este sitio además no usa cookies ni hace seguimiento. Lo único que guardamos es
        estrictamente funcional: sin eso, verías la animación de entrada cada vez que navegás dentro del sitio en la
        misma pestaña, en vez de una sola vez.
      </p>
      <p>
        Si en algún momento sumamos analítica, publicidad o cualquier herramienta que sí haga seguimiento, vamos a
        actualizar esta página y a pedirte consentimiento antes de activarla.
      </p>

      <h2>Cambios</h2>
      <p>Cualquier modificación queda reflejada acá, con su fecha. La versión vigente es siempre la publicada en esta dirección.</p>

      <h2>Contacto</h2>
      <p>
        Ante cualquier duda, escribinos a <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <div className="legal-footer">
        <a href="/privacidad">Política de Privacidad</a>
        <a href="/terminos">Términos y Condiciones</a>
        <span>
          {site.name} · {site.domain}
        </span>
      </div>
    </LegalPage>
  );
}
