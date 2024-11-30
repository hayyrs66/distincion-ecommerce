import InfiniteMarquee from "vanilla-infinite-marquee";
import { useEffect } from "react";
import "../../../node_modules/vanilla-infinite-marquee/infinite-marquee.css";
import Link from "next/link";

const Marquee = () => {
  useEffect(() => {
    const marquee = new InfiniteMarquee({
      element: ".marquee-container",
      speed: 19000,
      smoothEdges: false,
      direction: "left",
      duplicateCount: 2,
      pauseOnHover: true,
      mobileSettings: {
        direction: "left",
        speed: 200000,
      },
    });

    return () => {
      marquee.destroy();
    };
  }, []);

  return (
    <div className="marquee-container bg-black">
      <div className="flex mx-2 items-center">
        <Link
          href="/"
          className="font-semibold bg-gradient-to-r from-white  to-indigo-200 inline-block text-transparent bg-clip-text"
        >
          COLECCIÓN PLAYERAS 2025{" "}
        </Link>
      </div>
    </div>
  );
};

export default Marquee;
