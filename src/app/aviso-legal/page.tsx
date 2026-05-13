import LegalLayout from "@/components/LegalLayout";
import { legalCompany as c } from "@/data/legal";

export const metadata = {
  title: "Aviso legal",
  description: "Aviso legal y condiciones generales de uso del sitio web de Padel Travellers.",
};

export default function AvisoLegal() {
  return (
    <LegalLayout kicker="Términos y condiciones" title="Aviso legal">
      <p>
        El presente aviso legal regula el acceso, navegación y uso del sitio web {c.website}{" "}
        (en adelante, el «Sitio Web»), titularidad de {c.name}. El acceso al Sitio Web implica
        la aceptación de las condiciones aquí establecidas.
      </p>

      <h2>1. Identificación del titular</h2>
      <ul>
        <li><strong>Titular:</strong> {c.name}</li>
        <li><strong>EIN:</strong> {c.ein}</li>
        <li><strong>Domicilio:</strong> {c.address}</li>
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${c.email}`}>{c.email}</a></li>
        <li><strong>Teléfono:</strong> {c.phone}</li>
        <li><strong>Actividad:</strong> {c.activity}</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente Aviso Legal regula las condiciones de acceso, navegación y uso del Sitio Web,
        así como las responsabilidades derivadas de su utilización. El uso del Sitio Web atribuye
        al visitante la condición de Usuario, lo que implica la aceptación expresa, plena y sin
        reservas de todas las disposiciones aquí incluidas, en la versión publicada en el momento
        del acceso.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El Usuario se compromete a hacer un uso adecuado y lícito del Sitio Web y sus contenidos,
        de conformidad con la legislación aplicable, el presente Aviso Legal, las buenas costumbres
        y el orden público. Queda expresamente prohibido:
      </p>
      <ul>
        <li>Utilizar el Sitio Web para fines ilícitos, fraudulentos o lesivos para terceros.</li>
        <li>Reproducir, distribuir, comunicar públicamente, transformar o modificar los contenidos
            sin autorización previa por escrito del titular.</li>
        <li>Introducir o difundir virus informáticos o cualquier otro elemento que pueda alterar,
            dañar o impedir el normal funcionamiento del Sitio Web o de los sistemas de terceros.</li>
        <li>Recabar datos de carácter personal de otros Usuarios sin su consentimiento expreso.</li>
      </ul>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del Sitio Web (textos, fotografías, vídeos, logotipos, marcas,
        diseños gráficos, código fuente, etc.) son titularidad de {c.name} o de terceros que
        han autorizado su uso. Su utilización, reproducción, distribución, comunicación pública
        o transformación sin autorización constituyen una infracción de los derechos de propiedad
        intelectual e industrial.
      </p>
      <p>
        La marca «{c.brand}» y los demás signos distintivos están protegidos por la
        normativa aplicable y su uso no autorizado puede dar lugar a las acciones legales
        correspondientes.
      </p>

      <h2>5. Enlaces</h2>
      <p>
        El Sitio Web puede contener enlaces a sitios web de terceros sobre los que {c.name} no
        ejerce control alguno. La inclusión de estos enlaces no implica recomendación o
        responsabilidad sobre su contenido, productos o servicios.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        {c.name} no garantiza la disponibilidad y continuidad del Sitio Web, ni se responsabiliza
        de los daños y perjuicios que puedan derivarse de interrupciones, fallos técnicos, virus
        o cualquier otra incidencia ajena a su control. Se reserva el derecho a modificar,
        actualizar o eliminar contenidos sin previo aviso.
      </p>

      <h2>7. Modificaciones</h2>
      <p>
        {c.name} se reserva el derecho a modificar el presente Aviso Legal en cualquier momento,
        para adaptarlo a cambios legislativos o de la actividad. La versión vigente será siempre
        la publicada en el Sitio Web.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Las relaciones entre {c.name} y los Usuarios se regirán por la legislación aplicable. Para
        la resolución de cualquier controversia derivada del acceso o uso del Sitio Web, las
        partes se someten expresamente a los tribunales competentes según la normativa vigente.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para cualquier consulta relativa a este Aviso Legal puedes escribirnos a{" "}
        <a href={`mailto:${c.email}`}>{c.email}</a>.
      </p>
    </LegalLayout>
  );
}
