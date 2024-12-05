import { Package, Headset, CreditCard, ShieldCheck } from "lucide-react";

const Services = () => {
  return (
    <section className="w-full px-6 py-12">
      <div className="w-full gap-2 grid grid-cols-4">
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-md ">
          <Package size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Envío Gratis
          </h3>
          <p className="font-normal tracking-tight">
            Envío gratis todo diciembre.
          </p>
        </div>
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-md  ">
          <Headset size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Soporte
          </h3>
          <p className="font-normal tracking-tight">Soporte 8 horas al día.</p>
        </div>
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-md  ">
          <CreditCard size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Pago Flexible
          </h3>
          <p className="font-normal tracking-tight">
            Pago online seguro.
          </p>
        </div>
        <div className="flex flex-col py-12 w-full h-full items-center gap-2 rounded-md  ">
          <ShieldCheck size={38} />
          <h3 className="font-semibold text-base leading-1 tracking-tight">
            Calidad Asegurada
          </h3>
          <p className="font-normal tracking-tight">
            Garantía de calidad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
