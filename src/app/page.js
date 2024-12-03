import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Showcase from "./components/Showcase";

export default function Home() {
  return (
    <div>
      <main>
        <Hero/>  
        <Showcase/>  
        <About/>
      </main>
    </div>
  );
}
