import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Showcase from "./components/Showcase";
import MostSold from "./components/MostSold";
import Services from "./components/Services";
import Newsletter from "./components/Newsletter";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Showcase />
        <MostSold />
        <Newsletter />
        <Services />
        {/* <About /> */}
      </main>
    </div>
  );
}
