"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartProvider";

export default function CancelPage() {
  const router = useRouter();
  const { clearCart, cartItems } = useCart();
  const [transactionId, setTransactionId] = useState(null);
  const [pendingOrderInfo, setPendingOrderInfo] = useState(null);

  useEffect(() => {
    try {
      const pendingOrder = sessionStorage.getItem('pendingOrder');
      if (pendingOrder) {
        const orderData = JSON.parse(pendingOrder);
        setPendingOrderInfo(orderData);
        if (orderData.orderRef) {
          setTransactionId(orderData.orderRef);
        }
      }
    } catch (error) {
      console.error("Error al recuperar información de la orden:", error);
    }
  }, []);

  const handleContinue = () => {
    clearCart();
    window.history.replaceState(null, '', '/');
    router.replace("/");
  };

  const generateSupportMessage = () => {
    const cartDetails = cartItems.map(item => 
      `${item.name} (Talla: ${item.size}, Color: ${item.color}, Cantidad: ${item.quantity})`
    ).join('\n');
  
    let message = 'Necesito ayuda con mi pago cancelado';
    
    if (transactionId) {
      message += `\nID de transacción: ${transactionId}`;
    }
    
    if (cartItems.length > 0) {
      message += `\n\nProductos en carrito:\n${cartDetails}`;
      message += `\nTotal: Q${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}`;
    }

    return message;
  };

  return (
    <section className="w-full min-h-screen pt-24 pb-24 bg-gray-50">
      <div className="max-w-7xl px-4 lg:px-6 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-glow" />
            <div className="relative">
              <svg
                className="w-32 h-32 mx-auto text-red-500 overflow-visible"
                viewBox="0 0 52 52"
              >
                <motion.circle
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 2 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  d="M16 16L36 36 M36 16L16 36"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                />
              </svg>
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Pago Cancelado
              </h1>

              {transactionId && (
                <div className="mb-6 bg-red-900/20 p-4 rounded-lg">
                  <p className="text-red-400 text-sm">
                    ID de transacción: <span className="font-mono">{transactionId}</span>
                  </p>
                </div>
              )}

              <p className="text-neutral-400 text-lg leading-[1.5] mb-8 max-w-md mx-auto">
                {cartItems.length > 0 
                  ? "Tu carrito sigue activo para reintentar el pago"
                  : "No se completó el proceso de pago. Puedes:"}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {cartItems.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.history.replaceState(null, '', '/compra');
                      router.replace("/compra");
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Reintentar Pago
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinue}
                  className="border border-neutral-700 hover:border-neutral-600 text-neutral-400 hover:text-neutral-500 px-8 py-4 rounded-lg font-medium transition-colors duration-300"
                >
                  Continuar en la tienda
                </motion.button>
              </div>

              <div className="mt-8 text-sm text-neutral-500">
                <p>¿Necesitas ayuda con tu pedido?</p>
                <a
                  href={`https://api.whatsapp.com/send?phone=50231135906&text=${encodeURIComponent(generateSupportMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 underline mt-2 inline-block"
                >
                  Contactar a Soporte
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}