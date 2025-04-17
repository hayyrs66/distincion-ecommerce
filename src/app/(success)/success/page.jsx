"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "../../context/CartProvider";


export default function SuccessPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { clearCart, cartItems } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const verifyAndNotify = async () => {
      try {
        const storedData = JSON.parse(sessionStorage.getItem('pendingOrder') || '{}');
  
        if (!storedData.token) {
          throw new Error("Sesión inválida o expirada");
        }
  
        if (Date.now() - storedData.timestamp > 600000) {
          sessionStorage.removeItem('pendingOrder');
          throw new Error("La sesión de pago ha expirado");
        }
  
        const { infoEmail, cartItems, total, orderRef } = storedData;
  
        const response = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: infoEmail,
            cartItems,
            total
          })
        });
  
        if (!response.ok) throw new Error("Error enviando confirmación");
  
        setOrderDetails({
          orderRef,
          email: infoEmail.email,
          total
        });
        
        sessionStorage.removeItem('pendingOrder');
  
      } catch (error) {
        toast({
          title: "Error en verificación",
          description: error.message,
          variant: "destructive"
        });
        router.push(`/cancel?error=${encodeURIComponent(error.message)}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    verifyAndNotify();
  }, [router, toast]);

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="w-full min-h-screen pt-24 pb-24 bg-gray-50">
      <div className="max-w-7xl px-4 lg:px-6 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-glow" />
            <div className="relative">
              <svg
                className="w-32 h-32 mx-auto text-green-500 overflow-visible"
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
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
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
                ¡Pago Completado!
              </h1>
              
              {orderId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mb-4"
                >
                  <p className="text-neutral-200 text-xl mb-2">
                    ID de transacción: <span className="text-green-500 font-bold">#{orderId}</span>
                  </p>
                  <button
                    onClick={copyOrderId}
                    className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-200 px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span>Copiar ID</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
              
              <p className="text-neutral-400 text-lg leading-[1.5] mb-8 max-w-md mx-auto">
                Hemos recibido tu pago correctamente. En breve recibirás un correo
                con los detalles de tu compra.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  clearCart();
                  sessionStorage.removeItem('pendingOrder'); 
                  sessionStorage.removeItem('cartItems'); 
                  window.history.replaceState(null, '', '/');
                  router.replace("/");
                }}
                className="border border-neutral-700 hover:border-neutral-600 text-neutral-400 hover:text-neutral-500 px-8 py-4 rounded-lg font-medium transition-colors duration-300"
              >
                Seguir Comprando
              </motion.button>

              <div className="mt-8 text-sm text-neutral-500">
                <p>¿Necesitas ayuda?</p>
                <a
                  href={`https://wa.me/50233606439?text=Consulta%20sobre%20la%20orden%20${orderId}`}
                  target="_blank"
                  className="text-green-500 hover:underline"
                >
                  Contáctanos por WhatsApp
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}