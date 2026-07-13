import { Link } from 'react-router-dom'

// Página de Privacidad y Aviso legal. En lenguaje simple, pensada para que
// la lea una familia. Enlazada desde el footer.
export default function PrivacyPage() {
  return (
    <section className="legal">
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Privacidad y aviso legal</span>
      </nav>

      <div className="page-intro">
        <h1 className="page-title">
          <span aria-hidden="true">🔒</span> Privacidad y aviso legal
        </h1>
        <p className="page-subtitle">
          En pocas palabras: qué es esta app, qué guarda y qué no.
        </p>
      </div>

      <div className="legal-prose">
        <h2>Qué es esta app</h2>
        <p>
          <strong>Prácticas Sanga</strong> es una herramienta gratuita y{' '}
          <strong>no oficial</strong> para practicar ejercicios por grado. Es un
          proyecto personal para acompañar el estudio en casa:{' '}
          <strong>no está afiliada ni respaldada por ninguna escuela</strong> ni
          institución educativa. Los contenidos son de práctica y pueden tener
          errores o no coincidir con lo que se evalúa en clase; no reemplazan al
          material oficial ni garantizan ningún resultado.
        </p>

        <h2>Qué se guarda en tu dispositivo</h2>
        <p>
          Para que la app funcione, guardamos en el <em>navegador</em> de tu
          dispositivo (localStorage), sin enviarlo a ningún lado:
        </p>
        <ul>
          <li>El <strong>nombre</strong> que cargues (opcional), para saludar y dar ánimo.</li>
          <li>El <strong>progreso</strong> de cada práctica (qué preguntas ya dominaste).</li>
        </ul>
        <p>
          Podés borrar todo esto en cualquier momento limpiando los datos del
          sitio desde tu navegador.
        </p>

        <h2>Qué se guarda en el servidor</h2>
        <p>
          Para saber cuánto se usa la app, el servidor registra eventos simples
          de uso (aperturas, inicios de práctica y respuestas correctas o
          incorrectas). Junto a cada evento se guarda:
        </p>
        <ul>
          <li>El <strong>nombre</strong> que hayas cargado, si cargaste uno.</li>
          <li>
            Un <strong>identificador anónimo del dispositivo</strong> (derivado
            de la dirección IP mediante un código irreversible), para poder
            contar visitantes distintos <em>sin</em> almacenar tu IP.
          </li>
          <li>El tipo de navegador y la fecha.</li>
        </ul>

        <h2>Para qué se usan estos datos</h2>
        <ul>
          <li>Mostrar mensajes de ánimo con el nombre del niño o la niña.</li>
          <li>Guardar el progreso para no repetir lo ya aprendido.</li>
          <li>Ver de forma general cuánto y cómo se usa la app para mejorarla.</li>
        </ul>
        <p>
          <strong>No</strong> vendemos ni compartimos estos datos con terceros,{' '}
          <strong>no</strong> hay publicidad y <strong>no</strong> usamos
          cookies de seguimiento ni servicios de analítica externos.
        </p>

        <h2>Menores de edad</h2>
        <p>
          Esta app está pensada para que la use un niño o niña{' '}
          <strong>acompañado por una persona adulta responsable</strong>. El
          nombre es opcional: si preferís, no lo cargues o usá solo un apodo o
          la inicial. Pedimos que sea siempre un adulto quien decida qué datos
          se cargan.
        </p>

        <h2>Borrar tus datos</h2>
        <p>
          Podés pedir que borremos la información asociada a tu uso, o hacer
          cualquier consulta sobre privacidad, escribiendo a{' '}
          <a href="mailto:leviatas@gmail.com">leviatas@gmail.com</a>. También
          podés borrar los datos locales limpiando el sitio en tu navegador.
        </p>

        <h2>Cambios</h2>
        <p>
          Si cambiamos qué datos se guardan, actualizaremos esta página. Última
          actualización: <strong>julio de 2026</strong>.
        </p>
      </div>

      <div className="legal-back">
        <Link className="btn btn--primary" to="/">
          🏠 Volver al inicio
        </Link>
      </div>
    </section>
  )
}
