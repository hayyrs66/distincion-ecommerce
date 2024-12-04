import { Package, Headset, CreditCard } from "lucide-react";

const Services = () => {
  return (
    <section className="w-full px-6 py-12 bg-white">
      <div className="w-full gap-2 grid grid-cols-4">
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-lg border-2 border-black/15 bg-white">
          <Package size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Envío Gratis
          </h3>
          <p className="font-normal tracking-tight">
            Envío gratis todo diciembre.
          </p>
        </div>
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-lg border-2 border-black/15 bg-white ">
          <Headset size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Soporte
          </h3>
          <p className="font-normal tracking-tight">
            Soporte 8 horas al día.
          </p>
        </div>
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-lg border-2 border-black/15 bg-white ">
          <CreditCard size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Pago Flexible
          </h3>
          <p className="font-normal tracking-tight">
            Paga con cualquier tarjeta.
          </p>
        </div>
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-lg border-2 border-black/15 bg-white ">
          <CreditCard size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Pago Flexible
          </h3>
          <p className="font-normal tracking-tight">
            Paga con cualquier tarjeta.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
