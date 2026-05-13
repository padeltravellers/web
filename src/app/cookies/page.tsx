import LegalLayout from "@/components/LegalLayout";
import { legalCompany as c } from "@/data/legal";

export const metadata = {
  title: "Política de cookies",
  description: "Información sobre las cookies que utiliza el sitio web de Padel Travellers.",
};

export default function Cookies() {
  return (
    <LegalLayout kicker="Cookies" title="Política de cookies">
      <p>
        En {c.website} utilizamos cookies y tecnologías similares para mejorar tu experiencia de
        navegación, analizar el uso del sitio y mostrar contenido relevante. En esta política te
        explicamos qué son, cuáles usamos y cómo puedes gestionarlas.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu dispositivo cuando lo
        visitas. Permiten al sitio recordar información sobre tu visita (como el idioma o
        preferencias), lo que facilita que vuelvas y que el sitio te resulte más útil.
      </p>

      <h2>2. Tipos de cookies que usamos</h2>

      <h3>Cookies técnicas (necesarias)</h3>
      <p>
        Son imprescindibles para el correcto funcionamiento del Sitio Web (por ejemplo, mantener
        tu sesión o recordar preferencias de visualización). No requieren tu consentimiento.
      </p>

      <h3>Cookies analíticas</h3>
      <p>
        Nos ayudan a entender cómo los usuarios interactúan con el sitio (páginas más visitadas,
        tiempo de navegación, dispositivos). Usamos esta información de forma agregada para
        mejorar el contenido y la experiencia. Si quieres, las puedes deshabilitar.
      </p>

      <h3>Cookies de publicidad y terceros</h3>
      <p>
        Pueden instalarlas servicios de terceros (como redes sociales o plataformas publicitarias)
        para medir la efectividad de campañas o personalizar la publicidad. Solo se activan con
        tu consentimiento.
      </p>

      <h2>3. Detalle de cookies de terceros</h2>
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Finalidad</th>
            <th>Más información</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google Analytics</td>
            <td>Análisis estadístico anónimo del uso del sitio.</td>
            <td><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Política Google</a></td>
          </tr>
          <tr>
            <td>Meta (Facebook/Instagram)</td>
            <td>Medición de campañas publicitarias y remarketing.</td>
            <td><a href="https://www.facebook.com/about/privacy" target="_blank" rel="noreferrer">Política Meta</a></td>
          </tr>
          <tr>
            <td>Google Fonts / CDN</td>
            <td>Servir fuentes tipográficas e infraestructura del sitio.</td>
            <td><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Política Google</a></td>
          </tr>
        </tbody>
      </table>

      <h2>4. Cómo gestionar las cookies</h2>
      <p>
        Puedes aceptar, rechazar o configurar las cookies en cualquier momento desde el panel de
        consentimiento al entrar al Sitio Web, o desde la configuración de tu navegador. Aquí
        tienes instrucciones para los principales navegadores:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer">Microsoft Edge</a></li>
      </ul>
      <p>
        Ten en cuenta que si deshabilitas todas las cookies, algunas funciones del Sitio Web
        pueden no funcionar correctamente.
      </p>

      <h2>5. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios en los servicios o cookies que
        usamos. La versión vigente siempre será la publicada en el Sitio Web, con su fecha de
        actualización al inicio.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Si tienes preguntas sobre el uso de cookies, escríbenos a{" "}
        <a href={`mailto:${c.email}`}>{c.email}</a>.
      </p>
    </LegalLayout>
  );
}
