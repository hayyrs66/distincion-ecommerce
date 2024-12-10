import { PurchaseReceiptEmail } from "@/app/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { formData, cartItems, total } = await request.json();

    const name = `${formData.nombre} ${formData.apellidos}`;
    const phone = formData.telefono;
    const email = formData.email;

    const address = `${formData.direccion}, ${formData.municipio}`;

    const billingAddress = formData.usarDireccionEnvioComoFacturacion
      ? null
      : {
          name: `${formData.facturacionNombre} ${formData.facturacionApellidos}`,
          nitOrCf: formData.facturacionNitOrCf,
          address: `${formData.facturacionDireccion}, ${formData.facturacionMunicipio}, ${formData.facturacionDepartamento}`,
          postalCode: formData.facturacionCodigoPostal,
          phone: formData.facturacionTelefono,
        };

    console.log({
      name,
      phone,
      email,
      address,
      billingAddress,
      cartItems,
      total,
    });

    const { data, error } = await resend.emails.send({
      from: "Distinción <onboarding@distincion.shop>",
      to: ["zxnacontacto@gmail.com"],
      subject: "Compra en línea",
      react: PurchaseReceiptEmail({
        name,
        phone,
        email,
        address,
        billingAddress,
        cartItems,
        total,
      }),
    });

    if (error) {
      console.error("Error al enviar el correo:", error);
      return NextResponse.json({ error }, { status: 500 });
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
