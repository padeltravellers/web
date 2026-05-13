import LegalLayout from "@/components/LegalLayout";
import { legalCompany as c } from "@/data/legal";

export const metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad y protección de datos de Padel Travellers.",
};

export default function Privacidad() {
  return (
    <LegalLayout kicker="Protección de datos" title="Política de privacidad">
      <p>
        La privacidad de los usuarios es una prioridad para {c.name}. En esta Política de
        Privacidad explicamos cómo recabamos, tratamos y protegemos tus datos personales cuando
        interactúas con nuestro sitio web {c.website} o con nuestros servicios.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> {c.name}</li>
        <li><strong>Domicilio:</strong> {c.address}</li>
        <li><strong>Correo:</strong> <a href={`mailto:${c.email}`}>{c.email}</a></li>
      </ul>

      <h2>2. Datos que recogemos</h2>
      <p>Tratamos los siguientes datos según la finalidad:</p>
      <ul>
        <li><strong>Formulario de contacto / reserva:</strong> nombre, correo electrónico,
            teléfono, destino de interés y mensaje libre.</li>
        <li><strong>WhatsApp y email:</strong> los datos que voluntariamente compartas en la
            conversación.</li>
        <li><strong>Datos de navegación:</strong> dirección IP, navegador, dispositivo, páginas
            visitadas y duración de la visita (vía cookies analíticas).</li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <ul>
        <li>Atender tu solicitud de información sobre nuestros viajes.</li>
        <li>Gestionar la reserva, contratación y prestación de los servicios contratados.</li>
        <li>Enviarte información comercial sobre nuestros viajes y novedades, siempre que hayas
            consentido expresamente.</li>
        <li>Cumplir con las obligaciones legales aplicables.</li>
        <li>Mejorar el funcionamiento del sitio web mediante análisis estadísticos.</li>
      </ul>

      <h2>4. Base jurídica</h2>
      <p>El tratamiento de tus datos se basa en:</p>
      <ul>
        <li>Tu <strong>consentimiento expreso</strong> al rellenar formularios o iniciar
            conversaciones por WhatsApp/email.</li>
        <li>La <strong>ejecución de un contrato</strong> cuando contratas alguno de nuestros
            viajes.</li>
        <li>El <strong>cumplimiento de obligaciones legales</strong> aplicables.</li>
        <li>El <strong>interés legítimo</strong> en mejorar nuestros servicios y atender a los
            usuarios.</li>
      </ul>

      <h2>5. Conservación de los datos</h2>
      <p>
        Conservamos tus datos durante el tiempo estrictamente necesario para las finalidades
        descritas y, en cualquier caso, durante los plazos legales aplicables (por ejemplo,
        plazos fiscales, contables o de prescripción de acciones legales).
      </p>

      <h2>6. Destinatarios y cesiones</h2>
      <p>
        Como regla general, no cedemos tus datos a terceros salvo:
      </p>
      <ul>
        <li>Proveedores que nos prestan servicios necesarios para la operación del viaje
            (alojamientos, transporte, clubes deportivos, etc.), únicamente los datos
            imprescindibles para esa prestación.</li>
        <li>Proveedores tecnológicos que actúan como encargados del tratamiento (correo
            electrónico, alojamiento web, herramientas de mensajería, análisis y CRM), bajo
            contrato de tratamiento conforme al GDPR.</li>
        <li>Autoridades competentes cuando exista una obligación legal de comunicación.</li>
      </ul>
      <p>
        Algunos de estos proveedores pueden encontrarse fuera del Espacio Económico Europeo. En
        esos casos, garantizamos transferencias internacionales con las salvaguardas adecuadas
        (decisiones de adecuación, cláusulas contractuales tipo, etc.).
      </p>

      <h2>7. Tus derechos</h2>
      <p>Tienes derecho a:</p>
      <ul>
        <li><strong>Acceder</strong> a tus datos personales.</li>
        <li><strong>Rectificarlos</strong> si son inexactos.</li>
        <li><strong>Suprimirlos</strong> cuando ya no sean necesarios.</li>
        <li><strong>Oponerte</strong> al tratamiento por motivos relacionados con tu situación
            particular.</li>
        <li><strong>Solicitar la limitación</strong> del tratamiento.</li>
        <li><strong>Recibir tus datos</strong> en un formato estructurado (portabilidad).</li>
        <li><strong>Retirar tu consentimiento</strong> en cualquier momento, sin que ello afecte
            a la licitud del tratamiento previo.</li>
        <li><strong>Presentar una reclamación</strong> ante la autoridad de control competente.</li>
      </ul>
      <p>
        Puedes ejercer estos derechos enviando un correo a <a href={`mailto:${c.email}`}>{c.email}</a>{" "}
        indicando el derecho que deseas ejercer y, si lo consideras necesario, acompañando copia
        de un documento que acredite tu identidad.
      </p>

      <h2>8. Medidas de seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas adecuadas al riesgo del tratamiento para
        garantizar la confidencialidad, integridad y disponibilidad de tus datos personales. Solo
        accede a los datos el personal autorizado y nuestros encargados de tratamiento bajo
        compromiso de confidencialidad.
      </p>

      <h2>9. Cambios en esta política</h2>
      <p>
        Podemos modificar esta Política de Privacidad para adaptarla a novedades legales o a
        cambios en nuestros servicios. La versión vigente será siempre la publicada en el Sitio
        Web, con su fecha de actualización al inicio.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Para cualquier cuestión sobre esta Política de Privacidad o sobre el tratamiento de tus
        datos, escríbenos a <a href={`mailto:${c.email}`}>{c.email}</a>.
      </p>
    </LegalLayout>
  );
}
