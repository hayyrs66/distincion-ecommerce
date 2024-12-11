"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "../actions/subscribeNewsletter";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    const result = await subscribeNewsletter(email);

    if (result.success) {
      setOpenAlert(true);
      setEmail("");
    } else {
      setAlertMessage("Hubo un error al suscribirte. Intenta nuevamente.");
    }
  };

  return (
    <>
      <section
        className="w-full flex justify-center items-center px-6 py-24 bg-[#222222] overflow-x-hidden"
        aria-labelledby="newsletter-heading"
        role="region"
      >
        <div className="flex flex-col gap-6 justify-center items-center w-full">
          <h4
            id="newsletter-heading"
            className="text-white text-3xl md:text-4xl font-medium text-center"
          >
            Suscríbete a Nuestra Newsletter
          </h4>
          <p className="text-neutral-300 text-base md:text-lg text-center max-w-2xl leading-[1.5]">
            Recibe las últimas colecciones, ofertas exclusivas y tips de estilo
            directamente en tu correo. ¡Únete a nuestra newsletter y renueva tu
            look!
          </p>
          <form className="w-full flex justify-center" onSubmit={handleSubmit}>
            <div className="w-full max-w-xl border-b-2 border-b-white flex items-center p-2">
              <input
                id="email"
                type="email"
                aria-label="Correo electrónico"
                className="outline-none bg-transparent text-white placeholder-white/80 flex-1 min-w-0"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                aria-label="Suscribirse a la newsletter"
                className="ml-2 shrink-0"
              >
                <ArrowRight className="text-white" />
              </button>
            </div>
          </form>
        </div>
      </section>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Suscrito Exitosamente
            </AlertDialogTitle>
            <AlertDialogDescription>
              Gracias por suscribirte a nuestra newsletter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenAlert(false)}>
              Cerrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Newsletter;
