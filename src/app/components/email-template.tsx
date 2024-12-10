import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  name: string; // Nombre del comprador
  phone: string; // Teléfono de contacto
  email: string; // Correo electrónico del comprador
  address: string; // Dirección de envío
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
}

export const PurchaseReceiptEmail: React.FC<EmailTemplateProps> = ({
  name,
  phone,
  email,
  address,
  billingAddress,
  cartItems,
  total,
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

        <Section>
          <Text style={informationTitle}>Información del comprador</Text>
          <Text style={informationText}><strong>Nombre:</strong> {name}</Text>
          <Text style={informationText}><strong>Teléfono:</strong> {phone}</Text>
          <Text style={informationText}><strong>Correo:</strong> {email}</Text>
          <Text style={informationText}><strong>Dirección:</strong> {address}</Text>
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
              </Column>
              <Column align="right">
                <Text style={productPrice}>
                  GTQ {(item.price * item.quantity).toFixed(2)}
                </Text>
              </Column>
            </Row>
          ))}
        </Section>

        <Hr style={divider} />
        <Section align="right">
          <Text style={totalText}>
            <strong>Total:</strong> GTQ {total.toFixed(2)}
          </Text>
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
  fontWeight: "bold",
  color: "#444444",
};

const informationTitle = {
  fontSize: "18px",
  fontWeight: "bold",
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
  fontWeight: "bold",
  color: "#444444",
};

const productDescription = {
  fontSize: "12px",
  color: "#888888",
};

const productPrice = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#444444",
};

const divider = {
  margin: "20px 0",
  borderTop: "1px solid #eeeeee",
};

const totalText = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#444444",
};

export default PurchaseReceiptEmail;
