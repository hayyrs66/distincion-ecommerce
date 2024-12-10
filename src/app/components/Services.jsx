import { Package, Headset, CreditCard, ShieldCheck } from "lucide-react";

const Services = () => {
  return (
    <section className="w-full px-6 py-12 bg-[#f5f5f5]">
      <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col py-6 lg:py-12 w-full h-full items-center gap-2 rounded-md">
          <Package size={45} />
          <h3 className="font-semibold text-base md:text-lg leading-5 tracking-tight">
            Envío Gratis
          </h3>
          <p className="font-normal text-sm md:text-base tracking-tight text-center">
            Envío gratis todo diciembre.
          </p>
        </div>
        <div className="flex flex-col py-6 lg:py-12 w-full h-full items-center gap-2 rounded-md">
          <Headset size={45} />
          <h3 className="font-semibold text-base md:text-lg leading-5 tracking-tight">
            Soporte
          </h3>
          <p className="font-normal text-sm md:text-base tracking-tight text-center">
            Soporte 8 horas al día.
          </p>
        </div>
        <div className="flex flex-col py-6 lg:py-12 w-full h-full items-center gap-2 rounded-md">
          <CreditCard size={45} />
          <h3 className="font-semibold text-base md:text-lg leading-5 tracking-tight">
            Pago Flexible
          </h3>
          <p className="font-normal text-sm md:text-base tracking-tight text-center">
            Pago online seguro.
          </p>
        </div>
        <div className="flex flex-col py-6 lg:py-12 w-full h-full items-center gap-2 rounded-md">
          <ShieldCheck size={45} />
          <h3 className="font-semibold text-base md:text-lg leading-5 tracking-tight">
            Calidad Asegurada
          </h3>
          <p className="font-normal text-sm md:text-base tracking-tight text-center">
            Garantía de calidad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
