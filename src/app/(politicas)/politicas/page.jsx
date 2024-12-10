"use client";

import { useState, useEffect, useRef } from "react";

export default function PoliticasPage() {
  const [selectedSection, setSelectedSection] = useState("politicas");

  const politicasRef = useRef(null);
  const reembolsoRef = useRef(null);
  const terminosRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: "politicas", ref: politicasRef },
      { id: "reembolso", ref: reembolsoRef },
      { id: "terminos", ref: terminosRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          const visibleSection = sections.find(
            (section) => section.ref.current === mostVisible.target
          );
          if (visibleSection) {
            setSelectedSection(visibleSection.id);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, []);

  const handleMenuSelection = (sectionId) => {
    setSelectedSection(sectionId);
    const sectionElement =
      sectionId === "politicas"
        ? politicasRef.current
        : sectionId === "reembolso"
          ? reembolsoRef.current
          : terminosRef.current;

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col md:flex-row bg-gray-50">
      {/* Barra lateral (fija en pantallas grandes) */}
      <aside className="md:w-1/4 border-b md:border-r border-gray-200 bg-white p-6 md:p-8 sticky top-0 md:h-screen md:overflow-auto">
        {/* Menú en pantallas pequeñas (select) */}
        <div className="md:hidden mb-6">
          <label htmlFor="mobile-menu" className="sr-only">
            Seleccionar sección
          </label>
          <select
            id="mobile-menu"
            className="w-full border border-gray-300 rounded p-2"
            value={selectedSection}
            onChange={(e) => handleMenuSelection(e.target.value)}
          >
            <option value="politicas">Políticas</option>
            <option value="reembolso">Políticas de reembolso</option>
            <option value="terminos">Términos y condiciones</option>
          </select>
        </div>

        {/* Menú lateral en pantallas medianas y grandes */}
        <nav className="hidden md:block space-y-4">
          <button
            onClick={() => handleMenuSelection("politicas")}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedSection === "politicas"
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            Políticas
          </button>
          <button
            onClick={() => handleMenuSelection("reembolso")}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedSection === "reembolso"
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            Políticas de reembolso
          </button>
          <button
            onClick={() => handleMenuSelection("terminos")}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedSection === "terminos"
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            Términos y condiciones
          </button>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 md:p-10 max-w-3xl mx-auto">
        <section
          ref={politicasRef}
          id="politicas"
          className="mb-16 scroll-mt-24"
        >
          <h1 className="text-3xl font-bold mb-4">Políticas</h1>
          <div className="text-gray-700 leading-[1.5] text-pretty">
            <p>
              En <strong>Distincion.shop</strong>, valoramos su privacidad y
              estamos comprometidos con la protección de su información
              personal. <br />
              <br /> Toda la información proporcionada se utilizará únicamente
              para procesar pedidos, mejorar nuestros servicios y mantenerle
              informado sobre ofertas y promociones. Al facilitarnos datos
              personales (nombre, correo electrónico, dirección de envío, etc.),
              usted consiente su procesamiento conforme a nuestra Política de
              Privacidad.
              <br />
              <br />
              Asimismo, usted acepta utilizar este sitio únicamente para
              realizar consultas legítimas, adquirir productos disponibles en el
              catálogo y no efectuar pedidos fraudulentos ni proporcionar
              información falsa. Cabe señalar que
              <strong> Distincion.shop</strong>
              , se reserva el derecho de cancelar cualquier pedido sospechoso de
              fraude o incumplimiento de estas condiciones.
              <br />
              <br />
              Todos los productos están sujetos a disponibilidad y los precios
              pueden modificarse sin previo aviso. Nos esforzamos por la
              exactitud de descripciones, colores, imágenes o precios, sin
              garantizar su total precisión.
              <br />
              <br />
              El contenido del sitio —textos, imágenes, gráficos, logotipos,
              videos, software— es propiedad de Distincion.shop y está protegido
              por derechos de autor, prohibiéndose su reproducción, distribución
              o modificación sin autorización previa.
              <br />
              <br />
              Además, este sitio emplea cookies para mejorar la experiencia del
              usuario, guardar preferencias y ofrecer contenido personalizado;
              al utilizarlo, usted acepta el uso de cookies conforme a nuestra
              Política de Cookies. Puede desactivarlas en su navegador, aunque
              algunas funciones podrían verse afectadas.
              <br />
              <br />
              <strong>Distincion.shop</strong> no se hace responsable de
              retrasos por fuerza mayor, daños por uso indebido de productos o
              errores en la información proporcionada por el usuario.
              <br />
              <br />
              Finalmente, nos reservamos el derecho de modificar estos Términos
              y Condiciones en cualquier momento, con vigencia desde su
              publicación. Recomendamos revisarlos periódicamente.
            </p>
          </div>
        </section>

        <section
          ref={reembolsoRef}
          id="reembolso"
          className="mb-16 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold mb-4">Políticas de envío</h2>
          <div className="text-gray-700 leading-[1.5] text-pretty">
            <p>
              El cliente es responsable de estar disponible para recibir el
              pedido en el lugar y horario acordados; en caso de no hacerlo,
              deberá asumir el costo de un segundo envío. Los pedidos pueden ser
              recibidos únicamente por la persona cuyo nombre aparece en el
              pedido o por un familiar directo con autorización previa.
              <br />
              <br />
              No se aceptan cambios ni devoluciones por talla incorrecta; si
              necesita asistencia, contáctenos en{" "}
              <a href="mailto:contacto@distincion.shop">
                contacto@distincion.shop
              </a>
              . En situaciones de retrasos prolongados por distancia o errores
              del servicio de envío, solo se realizará la devolución del dinero
              si el pedido no ha salido de nuestras instalaciones o si el
              cliente lo cancela antes del despacho.
              <br />
              <br />
            </p>
            <div className="bg-neutral-300 rounded-lg p-2 text-pretty">
              <p>
                En caso de recibir un producto con defectos, el reembolso
                aplicará únicamente a la prenda defectuosa. Para proceder se
                requiere evidencia fotográfica clara del defecto al momento de
                la recepción, enviada dentro de las primeras 24 horas
                posteriores a la entrega. No se aceptarán reclamaciones ni
                devoluciones después de este plazo, y la prenda defectuosa
                deberá ser devuelta para gestionar el reembolso o cambio. El
                recojo se coordinará días después de la notificación.
              </p>
            </div>
          </div>
        </section>

        <section ref={terminosRef} id="terminos" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4">Términos y condiciones</h2>
          <div className="text-gray-700 leading-[1.5] text-pretty">
            <p>
              El usuario se compromete a utilizar este sitio web exclusivamente
              para fines legítimos, como realizar consultas, comprar productos y
              participar en actividades relacionadas con nuestros servicios,
              evitando el suministro de información falsa, actividades
              fraudulentas o cualquier interferencia no autorizada con la
              funcionalidad del sitio.
              <br />
              <br />
              Al proporcionar datos personales (nombre, dirección, correo
              electrónico, datos de pago), usted autoriza a
              <strong> Distincion.shop</strong> a procesar dicha información
              para gestionar pedidos, mejorar la experiencia del cliente y
              enviar comunicaciones sobre productos, servicios y promociones.
              <br />
              <br />
              <strong>Distincion.shop</strong> podrá contactarle mediante correo
              electrónico, llamadas telefónicas o mensajes SMS para confirmar
              pedidos, informar sobre el estado de las entregas y compartir
              información relevante; no obstante, usted puede optar por no
              recibir comunicaciones promocionales en cualquier momento.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
