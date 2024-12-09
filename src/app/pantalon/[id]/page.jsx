import { getProductByType } from "@/lib/products";
import PantalonCliente from "./PantalonClient";

export default async function Page({ params }) {
  const { id } = await params;

  const product = getProductByType(id);
  if (!product) {
    return <p>Producto no encontrado</p>;
  }
  const defaultColor = Object.keys(product.imagenes)[0];

  return (
    <PantalonCliente product={product} defaultColor={defaultColor} />
  );
}
