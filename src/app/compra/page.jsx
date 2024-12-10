// src/app/components/CompraPage.tsx

"use client";
import { useState } from "react";
import { useCart } from "../context/CartProvider";
import CartItem from "../components/CartItem";

export default function CompraPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    country: "Guatemala",
    nombre: "",
    apellidos: "",
    nitOrCf: "",
    direccion: "",
    municipio: "",
    envio: "Dentro de la capital",

    telefono: "",

    // Datos de pago
    numeroTarjeta: "",
    fechaVencimiento: "",
    codigoSeguridad: "",
    nombreTitular: "",
    usarDireccionEnvioComoFacturacion: true,

    // Datos facturación (solo si no se usa dirección de envío)
    facturacionPais: "Guatemala",
    facturacionNombre: "",
    facturacionApellidos: "",
    facturacionNitOrCf: "",
    facturacionDireccion: "",
    facturacionMunicipio: "",
    facturacionDepartamento: "",
    facturacionCodigoPostal: "",
    facturacionTelefono: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cálculos del carrito
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const validateForm = () => {
    const newErrors = {};

    // Validaciones mínimas
    if (!formData.email || formData.email.length < 5) {
      newErrors.email = "Correo electrónico inválido.";
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono de contacto no puede estar vacío.";
    }
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre no puede estar vacío.";
    }
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos no pueden estar vacíos.";
    }
    if (!formData.nitOrCf.trim()) {
      newErrors.nitOrCf = "El NIT o CF no puede estar vacío.";
    }
    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección no puede estar vacía.";
    }
    if (!formData.municipio.trim()) {
      newErrors.municipio = "El municipio no puede estar vacío.";
    }

    // Pago
    if (!formData.numeroTarjeta.trim()) {
      newErrors.numeroTarjeta = "Número de tarjeta inválido.";
    }
    if (!formData.fechaVencimiento.trim()) {
      newErrors.fechaVencimiento = "Fecha de vencimiento requerida.";
    }
    if (!formData.codigoSeguridad.trim()) {
      newErrors.codigoSeguridad = "Código de seguridad requerido.";
    }
    if (!formData.nombreTitular.trim()) {
      newErrors.nombreTitular = "Nombre del titular requerido.";
    }

    // Facturación si no se usa dirección de envío
    if (!formData.usarDireccionEnvioComoFacturacion) {
      if (!formData.facturacionNombre.trim()) {
        newErrors.facturacionNombre = "El nombre de facturación es requerido.";
      }
      if (!formData.facturacionApellidos.trim()) {
        newErrors.facturacionApellidos =
          "Los apellidos de facturación son requeridos.";
      }
      if (!formData.facturacionNitOrCf.trim()) {
        newErrors.facturacionNitOrCf =
          "El NIT o CF de facturación es requerido.";
      }
      if (!formData.facturacionDireccion.trim()) {
        newErrors.facturacionDireccion =
          "La dirección de facturación es requerida.";
      }
      if (!formData.facturacionMunicipio.trim()) {
        newErrors.facturacionMunicipio =
          "El municipio de facturación es requerido.";
      }
      if (!formData.facturacionDepartamento.trim()) {
        newErrors.facturacionDepartamento =
          "El departamento de facturación es requerido.";
      }
      if (!formData.facturacionTelefono.trim()) {
        newErrors.facturacionTelefono =
          "El teléfono de facturación es requerido.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Enviando datos:", { formData, cartItems, total });

      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, cartItems, total }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData.error || "Error al enviar la solicitud");
      }

      const data = await response.json();
      alert("Información enviada exitosamente.");
    } catch (error) {
      console.error("Error al enviar:", );
      alert("Hubo un problema al enviar la información.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="w-full min-h-screen pt-24 pb-24">
      <div className="max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna Izquierda: Contacto + Pago */}
          <div className="bg-white rounded-md shadow-sm p-6 flex flex-col gap-12">
            {/* Sección de Contacto */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-gray-900">
                Contacto
              </h4>
              <form className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Nuevo Campo: Teléfono de Contacto */}
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder="52258525"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.telefono ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.telefono}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    País
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    disabled
                    className="w-full border border-gray-400/50 bg-gray-100 text-gray-500 rounded-md p-2 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.nombre ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apellidos"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    placeholder="Pérez López"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.apellidos
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.apellidos && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.apellidos}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="nitOrCf"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    NIT o CF
                  </label>
                  <input
                    type="text"
                    id="nitOrCf"
                    name="nitOrCf"
                    placeholder="1234567-8"
                    value={formData.nitOrCf}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.nitOrCf ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.nitOrCf && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nitOrCf}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="direccion"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Dirección
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    rows={2}
                    placeholder="Calle Principal #123, Guatemala Ciudad"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                      errors.direccion
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.direccion && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.direccion}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="municipio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Municipio
                  </label>
                  <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    placeholder="Zona 14"
                    value={formData.municipio}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.municipio
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.municipio && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.municipio}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Método de envío
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="envioCapital"
                      name="envio"
                      value="Dentro de la capital"
                      checked={formData.envio === "Dentro de la capital"}
                      onChange={handleInputChange}
                      disabled
                    />
                    <label
                      htmlFor="envioCapital"
                      className="text-sm text-gray-700"
                    >
                      Dentro de la capital
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Sección de Pago */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-gray-900">Pago</h4>
              <form className="flex flex-col gap-6 mb-8">
                <div>
                  <label
                    htmlFor="numeroTarjeta"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Número de la tarjeta
                  </label>
                  <input
                    type="text"
                    id="numeroTarjeta"
                    name="numeroTarjeta"
                    placeholder="4111 1111 1111 1111"
                    value={formData.numeroTarjeta}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.numeroTarjeta
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.numeroTarjeta && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.numeroTarjeta}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="fechaVencimiento"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Fecha de vencimiento (MM/AA)
                  </label>
                  <input
                    type="text"
                    id="fechaVencimiento"
                    name="fechaVencimiento"
                    placeholder="12/25"
                    value={formData.fechaVencimiento}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.fechaVencimiento
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.fechaVencimiento && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fechaVencimiento}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="codigoSeguridad"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Código de seguridad
                  </label>
                  <input
                    type="text"
                    id="codigoSeguridad"
                    name="codigoSeguridad"
                    placeholder="123"
                    value={formData.codigoSeguridad}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.codigoSeguridad
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.codigoSeguridad && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.codigoSeguridad}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="nombreTitular"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    id="nombreTitular"
                    name="nombreTitular"
                    placeholder="Juan Pérez"
                    value={formData.nombreTitular}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.nombreTitular
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.nombreTitular && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nombreTitular}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="usarDireccionEnvioComoFacturacion"
                    name="usarDireccionEnvioComoFacturacion"
                    checked={formData.usarDireccionEnvioComoFacturacion}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="usarDireccionEnvioComoFacturacion"
                    className="text-sm text-gray-700"
                  >
                    Usar la dirección de envío como facturación
                  </label>
                </div>
              </form>

              {/* Sección desplegable de Dirección de facturación si no está chequeado */}
              {!formData.usarDireccionEnvioComoFacturacion && (
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-8">
                  <h5 className="text-lg font-semibold mb-4 text-gray-900">
                    Dirección de Facturación
                  </h5>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label
                        htmlFor="facturacionPais"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        País/Región
                      </label>
                      <input
                        type="text"
                        id="facturacionPais"
                        name="facturacionPais"
                        value={formData.facturacionPais}
                        disabled
                        className="w-full border border-gray-400/50 bg-gray-100 text-gray-500 rounded-md p-2 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionNombre"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="facturacionNombre"
                        name="facturacionNombre"
                        placeholder="Juan"
                        value={formData.facturacionNombre}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionNombre
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {errors.facturacionNombre && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionNombre}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionApellidos"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Apellidos
                      </label>
                      <input
                        type="text"
                        id="facturacionApellidos"
                        name="facturacionApellidos"
                        placeholder="Pérez López"
                        value={formData.facturacionApellidos}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionApellidos
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {errors.facturacionApellidos && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionApellidos}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionNitOrCf"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        NIT o CF
                      </label>
                      <input
                        type="text"
                        id="facturacionNitOrCf"
                        name="facturacionNitOrCf"
                        placeholder="1234567-8"
                        value={formData.facturacionNitOrCf}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionNitOrCf
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {errors.facturacionNitOrCf && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionNitOrCf}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionDireccion"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Dirección
                      </label>
                      <textarea
                        id="facturacionDireccion"
                        name="facturacionDireccion"
                        rows={2}
                        placeholder="Calle Principal #123, Guatemala Ciudad"
                        value={formData.facturacionDireccion}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                          errors.facturacionDireccion
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {errors.facturacionDireccion && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionDireccion}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionMunicipio"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Municipio
                      </label>
                      <input
                        type="text"
                        id="facturacionMunicipio"
                        name="facturacionMunicipio"
                        placeholder="Zona 14"
                        value={formData.facturacionMunicipio}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionMunicipio
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {errors.facturacionMunicipio && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionMunicipio}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionDepartamento"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Departamento
                      </label>
                      <input
                        type="text"
                        id="facturacionDepartamento"
                        name="facturacionDepartamento"
                        placeholder="Guatemala"
                        value={formData.facturacionDepartamento}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionDepartamento
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {errors.facturacionDepartamento && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionDepartamento}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionCodigoPostal"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Código Postal (opcional)
                      </label>
                      <input
                        type="text"
                        id="facturacionCodigoPostal"
                        name="facturacionCodigoPostal"
                        placeholder="01014"
                        value={formData.facturacionCodigoPostal}
                        onChange={handleInputChange}
                        className="w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="facturacionTelefono"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="facturacionTelefono"
                        name="facturacionTelefono"
                        placeholder="52258525"
                        value={formData.facturacionTelefono}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionTelefono
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {errors.facturacionTelefono && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionTelefono}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`mt-6 w-full text-white font-medium text-base px-4 py-2 rounded-sm transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-black/80 focus:ring-2 focus:ring-black/80"
                }`}
              >
                Confirmar Compra
              </button>
            </div>
          </div>

          {/* Columna Derecha: Carrito y Resumen */}
          <div className="w-full bg-black rounded-md h-fit p-6 text-white">
            <div>
              <h4 className="text-xl font-semibold mb-6">Tu Carrito</h4>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-400 mt-8">
                  No tienes productos en tu carrito.
                </p>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.size}-${item.color}`}
                    item={item}
                    onIncrease={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity + 1
                      )
                    }
                    onDecrease={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity - 1
                      )
                    }
                    onRemove={() =>
                      removeFromCart(item.id, item.size, item.color)
                    }
                  />
                ))
              )}
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-6">Resumen</h4>
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center">
                  No hay productos para calcular.
                </p>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-sm font-semibold">
                      GTQ {subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pb-6 border-b border-gray-600">
                    <p className="text-sm">Costo de envío</p>
                    <p className="text-sm font-semibold">Gratis</p>
                  </div>
                  <div className="flex justify-between items-center pt-6">
                    <p className="text-lg font-medium">Total</p>
                    <p className="text-lg font-bold">GTQ {total.toFixed(2)}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
