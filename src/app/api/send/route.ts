import { PurchaseReceiptEmail } from "@/app/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const generateOrderId = () => {
  const timePart = Date.now().toString().slice(-5);
  const randomPart = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `#E${timePart}${randomPart}`;
};

export async function POST(request: Request) {
  try {
    const { formData, cartItems, total } = await request.json();

    const name = `${formData.nombre} ${formData.apellidos}`;
    const phone = formData.telefono;
    const email = formData.email;
    const nitOrCf = formData.nitOrCf.trim().toUpperCase();

    const paymentMethod = formData.metodoPago;

    const orderId = generateOrderId();

    const address = `${formData.direccion}, ${formData.municipio}, ${formData.departamento}`;

    const billingAddress =
      nitOrCf === "CF"
        ? null
        : formData.usarDireccionEnvioComoFacturacion
          ? null
          : {
              name: `${formData.facturacionNombre} ${formData.facturacionApellidos}`,
              nitOrCf: formData.facturacionNitOrCf,
              address: `${formData.facturacionDireccion}, ${formData.facturacionMunicipio}, ${formData.facturacionDepartamento}`,
              postalCode: formData.facturacionCodigoPostal,
              phone: formData.facturacionTelefono,
            };

    const { data, error } = await resend.emails.send({
      from: "Distinción <onboarding@distincion.shop>",
      to: [email, "contacto@distincion.shop"],
      subject: "Compra en línea",
      react: PurchaseReceiptEmail({
        name,
        phone,
        email,
        address,
        billingAddress,
        cartItems,
        total,
        orderId,
        paymentMethod,
      }),
    });
    console.log("Metodo de pago:", paymentMethod);

    if (error) {
      console.error("Error al enviar el correo:", error);
      return NextResponse.json({ error }, { status: 500 });
    } else {
      console.log("Correo enviado exitosamente:", data, paymentMethod);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
