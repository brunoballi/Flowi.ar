import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Términos y Condiciones — ${site.name}`,
  description: "Condiciones de uso de autoflowi.com, alcance de los servicios de Flowi y bases del juego del bolillero.",
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return (
    <LegalPage title="Términos y Condiciones" updated="septiembre de 2026">
      <p>
        Este sitio ({site.domain}) es operado por {site.name}, un servicio de automatización y desarrollo de sistemas
        a medida para pequeños y medianos negocios. Al usar este sitio, aceptás estos términos.
      </p>

      <h2>Quiénes somos</h2>
      <ul>
        <li>
          <strong>Nombre comercial:</strong> {site.name}
        </li>
        <li>
          <strong>Sitio:</strong> {site.domain}
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <strong>WhatsApp:</strong> +54 9 341 348-7910
        </li>
        <li>
          <strong>Instagram:</strong>{" "}
          <a href={site.instagram.url} target="_blank" rel="noopener">
            {site.instagram.handle}
          </a>
        </li>
        <li>
          <strong>Ámbito:</strong> prestamos servicios en la República Argentina.
        </li>
      </ul>

      <h2>Naturaleza del sitio</h2>
      <p>
        {site.domain} es un sitio informativo y de contacto comercial. No es una tienda online ni una plataforma de
        autoservicio: no se procesan pagos, altas de cuenta ni contrataciones directamente desde el sitio. Toda
        contratación de servicios se acuerda por fuera del sitio (WhatsApp, email o reunión), con una propuesta
        específica para cada negocio.
      </p>

      <h2>Servicios ofrecidos</h2>
      <p>
        {site.name} desarrolla e implementa, bajo acuerdo comercial independiente con cada cliente: bots de atención
        por WhatsApp, sistemas de gestión a medida (incluido FlowiGest para barberías), formularios y encuestas
        digitales, landing pages y tiendas online, y mantenimiento de estas soluciones. El alcance, plazos y
        condiciones de cada servicio se definen en la propuesta enviada a cada cliente, no en este sitio.
      </p>

      <h2>Contenido y marca</h2>
      <p>
        Los textos, el diseño y las demostraciones incluidas en este sitio pertenecen a {site.name}. No está permitido
        reproducirlos o reutilizarlos sin autorización previa.
      </p>
      <p>
        El sitio usa además material de terceros bajo sus respectivas licencias: las tipografías Poppins, Instrument
        Serif y DM Sans (licencia SIL Open Font), las librerías de animación GSAP y three.js, y las imágenes y el
        video de ambientación, generados con herramientas de imagen por computadora. Las capturas del sistema que se
        ven en la sección de FlowiGest corresponden a nuestro propio producto y tienen difuminados los datos
        identificatorios de terceros.
      </p>

      <h2>Uso del formulario de contacto</h2>
      <p>
        Al completar el formulario de contacto, aceptás que {site.name} te contacte por WhatsApp o email para
        responder tu consulta. Ver el detalle de tratamiento de datos en la{" "}
        <a href="/privacidad">Política de Privacidad</a>.
      </p>

      <h2>Precios, cancelaciones y reembolsos</h2>
      <p>
        En este sitio no se cobra nada ni se procesan pagos. Los precios, la forma de pago y las condiciones de cada
        trabajo se acuerdan en la propuesta que enviamos a cada cliente antes de empezar, y esa propuesta es la que
        rige la relación.
      </p>
      <p>Salvo que la propuesta diga otra cosa, valen estas reglas:</p>
      <ul>
        <li>
          <strong>Antes de empezar:</strong> si cancelás antes de que arranquemos el trabajo, se devuelve el 100% de
          lo que hayas adelantado.
        </li>
        <li>
          <strong>Con el trabajo en curso:</strong> se factura lo efectivamente realizado hasta el momento de la
          cancelación y se devuelve el resto. Te entregamos lo que esté hecho.
        </li>
        <li>
          <strong>Trabajo entregado y funcionando:</strong> no corresponde reembolso, pero sí corrección. Si lo
          entregado no hace lo que acordamos por escrito, lo corregimos sin cargo.
        </li>
        <li>
          <strong>Servicios mensuales</strong> (mantenimiento, soporte): se pueden dar de baja avisando con 30 días.
          No se cobra el mes siguiente y no hay penalidad.
        </li>
      </ul>
      <p>
        Para pedir una cancelación o un reembolso alcanza con escribirnos por cualquiera de los canales de arriba.
        Respondemos dentro de los 10 días hábiles.
      </p>
      <p>
        Como el sitio no vende ni cobra en línea, no corresponde el botón de arrepentimiento de la Resolución
        424/2020. Si en algún momento habilitamos contratación y pago desde el sitio, lo vamos a incorporar.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        La información de este sitio se ofrece con fines informativos y comerciales generales. {site.name} no
        garantiza resultados específicos fuera de lo acordado por escrito en cada propuesta comercial.
      </p>

      <h2>Ley aplicable</h2>
      <p>Estos términos se rigen por las leyes de la República Argentina.</p>

      <h2 id="bolillero">Juego del bolillero de la página de inicio</h2>
      <p>En la página de inicio hay un bolillero con el que se puede jugar libremente. Estas son sus reglas:</p>
      <ul>
        <li>Participar es gratuito y no requiere compra, registro ni contratación previa de ningún servicio.</li>
        <li>
          El tambor tiene 12 bolillas numeradas. 8 de las 12 no otorgan ningún beneficio e invitan a girar de nuevo;
          las 4 restantes se reparten en partes iguales (2 y 2) entre los dos beneficios en juego. No se muestra de
          antemano cuáles son los beneficios ni qué bolilla toca cada uno.
        </li>
        <li>Los beneficios son servicios prestados por {site.name}. No son canjeables por dinero ni transferibles a terceros.</li>
        <li>El beneficio se reclama por WhatsApp, desde el enlace que aparece al terminar el juego, dentro de los 30 días corridos.</li>
        <li>Corresponde un beneficio por persona o negocio.</li>
        <li>No es un juego de apuestas ni de azar con fines lucrativos: no hay dinero involucrado, ni aportado por el participante ni entregado como premio.</li>
        <li>{site.name} puede modificar o discontinuar el juego en cualquier momento, incluyendo la cantidad o el tipo de beneficios en juego. Los beneficios ya reclamados se respetan.</li>
      </ul>

      <h2>Contacto</h2>
      <p>
        Ante cualquier consulta sobre estos términos, escribinos a <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <div className="legal-footer">
        <a href="/privacidad">Política de Privacidad</a>
        <a href="/cookies">Cookies</a>
        <span>
          {site.name} · {site.domain}
        </span>
      </div>
    </LegalPage>
  );
}
