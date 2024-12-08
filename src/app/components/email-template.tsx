import * as React from "react";

interface EmailTemplateProps {
  name: string; // Nombre del comprador
  phone: string; // Teléfono de contacto
  email: string; // Correo electrónico del comprador
  address: string; // Dirección de envío
  billingAddress?: { // Dirección de facturación (opcional)
    name: string; // Nombre completo para facturación
    nitOrCf: string; // NIT o CF para facturación
    address: string; // Dirección para facturación
    postalCode?: string; // Código postal para facturación (opcional)
    phone: string; // Teléfono para facturación
  };
  cartItems: Array<{
    id: string; // ID del producto
    name: string; // Nombre del producto
    size: string; // Talla del producto
    color: string; // Color del producto
    price: number; // Precio unitario del producto
    quantity: number; // Cantidad del producto
    image: string; // URL de la imagen del producto
  }>;
  total: number; // Total de la compra
}


export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  phone,
  email,
  address,
  billingAddress,
  cartItems,
  total,
}) => {
  const accentColor = "#5850EC";
  const textColor = "#333";
  const bgColor = "#f7f8fa";
  const cardBgColor = "#ffffff";

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: bgColor, padding: "40px 0" }}>
      <table
        align="center"
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: cardBgColor,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center", padding: "30px 20px", backgroundColor: accentColor }}>
              <h1 style={{ margin: 0, fontSize: "24px", color: "#ffffff", fontWeight: "normal" }}>
                Resumen de tu Compra
              </h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Datos de Envío */}
          <tr>
            <td style={{ padding: "30px 20px" }}>
              <h2 style={{ color: accentColor, fontSize: "18px", margin: "0 0 15px 0", fontWeight: "normal" }}>
                Datos de Envío
              </h2>
              <div style={{ lineHeight: "1.6", color: textColor, fontSize: "14px" }}>
                <p><strong>Nombre:</strong> {name}</p>
                <p><strong>Teléfono:</strong> {phone}</p>
                <p><strong>Correo:</strong> {email}</p>
                <p><strong>Dirección:</strong> {address}</p>
              </div>
            </td>
          </tr>

          {/* Dirección de Facturación */}
          {billingAddress && (
            <tr>
              <td style={{ padding: "30px 20px" }}>
                <h2 style={{ color: accentColor, fontSize: "18px", margin: "20px 0 15px 0", fontWeight: "normal" }}>
                  Dirección de Facturación
                </h2>
                <div style={{ lineHeight: "1.6", color: textColor, fontSize: "14px" }}>
                  <p><strong>Nombre:</strong> {billingAddress.name}</p>
                  <p><strong>NIT o CF:</strong> {billingAddress.nitOrCf}</p>
                  <p><strong>Dirección:</strong> {billingAddress.address}</p>
                  <p><strong>Código Postal:</strong> {billingAddress.postalCode}</p>
                  <p><strong>Teléfono:</strong> {billingAddress.phone}</p>
                </div>
              </td>
            </tr>
          )}

          {/* Productos en el Carrito */}
          <tr>
            <td style={{ padding: "0px 20px 30px 20px" }}>
              <h2 style={{ color: accentColor, fontSize: "18px", margin: "20px 0 15px 0", fontWeight: "normal" }}>
                Productos en tu Carrito
              </h2>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", fontSize: "13px", paddingBottom: "8px", borderBottom: "1px solid #eee" }}>
                      Producto
                    </th>
                    <th style={{ textAlign: "left", fontSize: "13px", paddingBottom: "8px", borderBottom: "1px solid #eee" }}>
                      Cantidad
                    </th>
                    <th style={{ textAlign: "left", fontSize: "13px", paddingBottom: "8px", borderBottom: "1px solid #eee" }}>
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>{item.name}</td>
                      <td style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>{item.quantity}</td>
                      <td style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
                        GTQ {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2 style={{ color: accentColor, fontSize: "18px", margin: "20px 0 10px 0", fontWeight: "normal" }}>
                Total a Pagar
              </h2>
              <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 30px 0", color: textColor }}>
                GTQ {total.toFixed(2)}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
