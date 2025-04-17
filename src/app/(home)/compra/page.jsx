"use client";
import { useState } from "react";
import { useCart } from "../../context/CartProvider";
import CartItem from "@components/CartItem";
import { useToast } from "@/hooks/use-toast";
import { DEPARTAMENTOS } from "@/lib/departamentos";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function getMunicipios(departamentoSeleccionado) {
  const depto = DEPARTAMENTOS.find(
    (d) => d.nombre === departamentoSeleccionado
  );
  return depto ? depto.municipios : [];
}

export default function CompraPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    country: "Guatemala",
    nombre: "",
    apellidos: "",
    nitOrCf: "",
    direccion: "",
    departamento: "Guatemala",
    municipio: "",
    envio: "Toda Guatemala",
    telefono: "",
    numeroTarjeta: "",
    fechaVencimiento: "",
    codigoSeguridad: "",
    nombreTitular: "",
    usarDireccionEnvioComoFacturacion: true,
    facturacionPais: "Guatemala",
    facturacionNombre: "",
    facturacionApellidos: "",
    facturacionNitOrCf: "",
    facturacionDireccion: "",
    facturacionDepartamento: "Guatemala",
    facturacionMunicipio: "",
    facturacionCodigoPostal: "",
    facturacionTelefono: "",
    metodoPago: "transferencia",
    ebipayToken: "",
    paymentReference: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const nitIsCF = formData.nitOrCf.trim().toUpperCase() === "CF";

  const validateForm = () => {
    const newErrors = {};

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

    if (formData.metodoPago === "tarjeta") {
      if (!formData.email || formData.email.length < 5) {
        newErrors.email = "El correo es necesario para el recibo electrónico.";
      }
    }

    // Si el NIT es "CF", no se valida información de facturación adicional.
    if (!nitIsCF && !formData.usarDireccionEnvioComoFacturacion) {
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
    const paymentToken = crypto.randomUUID(); 
    if (!validateForm()) {
      return;
    }
  
    if (formData.metodoPago === "tarjeta" && cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos al carrito antes de pagar",
        variant: "destructive"
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      if (formData.metodoPago === "tarjeta") {
        const orderResponse = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            customerEmail: formData.email,
            cartItems
          })
        });
        
        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
          throw new Error(orderData.error || "Error creating payment order");
        }
  
        if (!orderData.paymentUrl) {
          throw new Error("No payment URL received");
        }

        sessionStorage.setItem('pendingOrder', JSON.stringify({
          token: paymentToken,
          orderRef: orderData.orderRef,
          infoEmail: formData,
          cartItems,
          total,
          timestamp: Date.now()
        }));
        
        window.location.href = orderData.paymentUrl;
      } else {
        
        const response = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, cartItems, total }),
        });
        
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.error || "Error processing transfer");
        }
        
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Error en el pago",
        description: error.message || "Error procesando el pago",
        variant: "destructive"
      });
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

  // Remove the early return if method === "tarjeta", so the user can actually select 'tarjeta'.
  const handlePaymentMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      metodoPago: method,
    }));
  };

  const handleDepartamentoChange = (e) => {
    const nuevoDepartamento = e.target.value;
    setFormData((prev) => ({
      ...prev,
      departamento: nuevoDepartamento,
      municipio: "",
    }));
  };

  const handleFacturacionDepartamentoChange = (e) => {
    const nuevoDepartamento = e.target.value;
    setFormData((prev) => ({
      ...prev,
      facturacionDepartamento: nuevoDepartamento,
      facturacionMunicipio: "",
    }));
  };

  const municipiosEnvio = getMunicipios(formData.departamento);
  const municipiosFacturacion = getMunicipios(formData.facturacionDepartamento);

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
                    placeholder="1234567-8 ó CF"
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
                    placeholder="Calle Principal #123"
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
                    htmlFor="departamento"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Departamento
                  </label>
                  <select
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleDepartamentoChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.departamento
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  >
                    {DEPARTAMENTOS.map((d) => (
                      <option key={d.nombre} value={d.nombre}>
                        {d.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.departamento && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.departamento}
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
                  <select
                    id="municipio"
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleInputChange}
                    className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.municipio
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Seleccione un municipio</option>
                    {municipiosEnvio.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
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
                      value="Toda Guatemala"
                      checked={formData.envio === "Toda Guatemala"}
                      onChange={handleInputChange}
                      disabled
                    />
                    <label
                      htmlFor="envioCapital"
                      className="text-sm text-gray-700"
                    >
                      Toda Guatemala
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Sección de Pago */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-gray-900">Pago</h4>

              {/* Opciones de pago */}
              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-700">Método de pago</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="metodoTransferencia"
                      name="metodoPago"
                      value="transferencia"
                      checked={formData.metodoPago === "transferencia"}
                      onChange={() =>
                        handlePaymentMethodChange("transferencia")
                      }
                    />
                    <label
                      htmlFor="metodoTransferencia"
                      className="text-sm text-gray-700"
                    >
                      Transferencia
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Enabled Tarjeta option and removed "Próximamente" */}
                    <input
                      type="radio"
                      id="metodoTarjeta"
                      name="metodoPago"
                      value="tarjeta"
                      checked={formData.metodoPago === "tarjeta"}
                      onChange={() => handlePaymentMethodChange("tarjeta")}
                    />
                    <label
                      htmlFor="metodoTarjeta"
                      className="text-sm text-gray-700"
                    >
                      Tarjeta
                    </label>
                  </div>
                </div>
              </div>

              {formData.metodoPago === "transferencia" && (
                <div className="mb-8 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-700">
                    Una vez que confirmes tu pedido, recibirás un correo con las
                    instrucciones para realizar tu pago por transferencia.
                  </p>
                </div>
              )}

              {/* Campos adicionales si elige Tarjeta */}
              {formData.metodoPago === "tarjeta" && (
                 <div className="mb-8 bg-gray-50 p-4 rounded-md border border-gray-200">
                 <p className="text-sm text-gray-700">
                   Serás redirigido a Ebipay para completar tu pago de forma segura.
                   <br />
                   <span className="font-semibold">Importante:</span> Al completar el pago, 
                   serás regresado automáticamente a esta página para finalizar tu compra.
                 </p>
               </div>
              )}

              {/* Si el NIT es CF, no mostrar el checkbox ni el formulario de facturación */}
              {!nitIsCF && (
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
              )}

              {!nitIsCF && !formData.usarDireccionEnvioComoFacturacion && (
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
                        htmlFor="facturacionDepartamento"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Departamento
                      </label>
                      <select
                        id="facturacionDepartamento"
                        name="facturacionDepartamento"
                        value={formData.facturacionDepartamento}
                        onChange={handleFacturacionDepartamentoChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionDepartamento
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      >
                        {DEPARTAMENTOS.map((d) => (
                          <option key={d.nombre} value={d.nombre}>
                            {d.nombre}
                          </option>
                        ))}
                      </select>
                      {errors.facturacionDepartamento && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionDepartamento}
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
                      <select
                        id="facturacionMunicipio"
                        name="facturacionMunicipio"
                        value={formData.facturacionMunicipio}
                        onChange={handleInputChange}
                        className={`w-full border border-gray-400/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.facturacionMunicipio
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Seleccione un municipio</option>
                        {municipiosFacturacion.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      {errors.facturacionMunicipio && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facturacionMunicipio}
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
                {formData.metodoPago === "tarjeta" 
                  ? "Pagar con Ebipay" 
                  : "Ordenar Pedido"}
              </button>
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
      </div>

      {/* AlertDialog para mostrar al finalizar */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Pedido recibido
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tu compra se ha confirmado con éxito. Recibirás las instrucciones
              de pago por correo electrónico.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenAlert(false)}>
              Cerrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
