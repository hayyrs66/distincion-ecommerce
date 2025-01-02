import Hero from "@components/Hero";
import Showcase from "@components/Showcase";
import MostSold from "@components/MostSold";
import Services from "@components/Services";
import Newsletter from "@components/Newsletter";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Showcase />
        <MostSold />
        <Newsletter />
        <Services />
      </main>
    </div>
  );
}
