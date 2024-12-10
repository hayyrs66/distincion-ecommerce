import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  phone: string;
  email: string;
  address: string;
  billingAddress?: {
    name: string;
    nitOrCf: string;
    address: string;
    postalCode?: string;
    phone: string;
  };
  cartItems: Array<{
    id: string;
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  orderId: string;
  paymentMethod: string;
}

export const PurchaseReceiptEmail: React.FC<EmailTemplateProps> = ({
  name,
  phone,
  email,
  address,
  billingAddress,
  cartItems,
  total,
  orderId,
  paymentMethod,
}) => (
  <Html>
    <Head />
    <Preview>Recibo de tu compra</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Row>
            <Column>
              <Img
                src="https://utfs.io/f/Kd9w79vOPqydVkkgI01ikFwdY7eISDh3av0unCcMyo64ZzUQ"
                alt="Distinción Guatemala Logo"
                width="42"
                height="42"
              />
            </Column>
            <Column align="right" style={tableCell}>
              <Text style={heading}>Recibo</Text>
            </Column>
          </Row>
        </Section>

        {/* Número de pedido */}
        <Section>
          <Text style={informationTitle}>Número de Pedido</Text>
          <Text style={informationText}>{orderId}</Text>
        </Section>

        <Section>
          <Text style={informationTitle}>Información del comprador</Text>
          <Text style={informationText}>
            <strong>Nombre:</strong> {name}
          </Text>
          <Text style={informationText}>
            <strong>Teléfono:</strong> {phone}
          </Text>
          <Text style={informationText}>
            <strong>Correo:</strong> {email}
          </Text>
          <Text style={informationText}>
            <strong>Dirección:</strong> {address}
          </Text>
        </Section>

        {billingAddress && (
          <Section>
            <Text style={informationTitle}>Dirección de facturación</Text>
            <Text style={informationText}>
              <strong>Nombre:</strong> {billingAddress.name}
            </Text>
            <Text style={informationText}>
              <strong>NIT o CF:</strong> {billingAddress.nitOrCf}
            </Text>
            <Text style={informationText}>
              <strong>Dirección:</strong> {billingAddress.address}
            </Text>
            {billingAddress.postalCode && (
              <Text style={informationText}>
                <strong>Código Postal:</strong> {billingAddress.postalCode}
              </Text>
            )}
            <Text style={informationText}>
              <strong>Teléfono:</strong> {billingAddress.phone}
            </Text>
          </Section>
        )}

        {/* Resumen de compra */}
        <Section>
          <Text style={informationTitle}>Resumen de compra</Text>
          {cartItems.map((item) => (
            <Row key={item.id} style={productRow}>
              <Column>
                <Img
                  src={item.image}
                  alt={item.name}
                  width="64"
                  height="64"
                  style={productImage}
                />
              </Column>
              <Column style={productDetails}>
                <Text style={productTitle}>{item.name}</Text>
                <Text style={productDescription}>
                  Talla: {item.size} | Color: {item.color}
                </Text>
                <Text style={productDescription}>
                  Cantidad: {item.quantity}
                </Text>
                <Text style={productPrice}>
                  <strong>GTQ {item.price.toFixed(2)}</strong>
                </Text>
              </Column>
            </Row>
          ))}
        </Section>

        {/* Instrucciones para transferencia si aplica */}
        {paymentMethod === "transferencia" && (
          <Section style={instructionsContainer}>
            <Text style={instructionsTitle}>
              Instrucciones para realizar tu pago:
            </Text>
            <Text style={instructionsText}>
              Realiza el depósito o transferencia correspondiente.
            </Text>
            <Text style={instructionsText}>
              Envía el comprobante de pago junto con tu número de pedido a:
            </Text>
            <Text style={instructionsText}>
              <strong>Correo electrónico:</strong> contacto@distincion.shop
            </Text>
            <Text style={instructionsText}>
              <strong>WhatsApp:</strong> 31135906
            </Text>
            <Text style={instructionsText}>
              Una vez confirmado tu pago, te notificaremos a través del medio
              que utilizaste para enviar la información.
            </Text>
            <Text style={instructionsText}>
              Tu pedido será empacado y enviado; el tiempo estimado de entrega
              es de 2 días hábiles.
            </Text>
          </Section>
        )}

        <Hr style={divider} />
        <Section align="right">
          <Text style={totalText}>
            <strong>Total:</strong> GTQ {total.toFixed(2)}
          </Text>
        </Section>

        <Section align="center">
          <Text style={informationTitle}>¡Gracias por tu compra!</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f9f9f9",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#444444",
};

const informationTitle = {
  fontSize: "18px",
  fontWeight: "bold" as const,
  color: "#444444",
  marginBottom: "10px",
};

const informationText = {
  fontSize: "14px",
  color: "#666666",
  lineHeight: "1.6",
};

const productRow = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #eeeeee",
  padding: "10px 0",
};

const productImage = {
  borderRadius: "8px",
};

const productDetails = {
  paddingLeft: "15px",
};

const productTitle = {
  fontSize: "14px",
  fontWeight: "bold" as const,
  color: "#444444",
};

const productDescription = {
  fontSize: "12px",
  color: "#888888",
};

const divider = {
  margin: "20px 0",
  borderTop: "1px solid #eeeeee",
};

const totalText = {
  fontSize: "18px",
  fontWeight: "bold" as const,
  color: "#444444",
};
const instructionsContainer = {
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  padding: "16px",
  margin: "20px 0",
  border: "1px solid #ddd",
};

const instructionsTitle = {
  fontSize: "16px",
  fontWeight: "bold" as const,
  color: "#333",
  marginBottom: "8px",
};

const instructionsText = {
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.6",
};

const productPrice = {
  fontSize: "14px",
  fontWeight: "bold" as const,
  color: "#444",
  marginTop: "8px",
};

export default PurchaseReceiptEmail;
