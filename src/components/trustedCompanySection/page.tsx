import Image from "next/image";
import { useRef } from "react";
import clientsLogo01 from "@/assets/images/clientsLogo01.png";
import clientsLogo02 from "@/assets/images/clientsLogo02.png";
import clientsLogo03 from "@/assets/images/clientsLogo03.png";
import clientsLogo04 from "@/assets/images/clientsLogo04.png";
import clientsLogo05 from "@/assets/images/clientsLogo05.png";
import clientsLogo06 from "@/assets/images/clientsLogo06.png";
import clientsLogo07 from "@/assets/images/clientsLogo07.png";
import clientsLogo08 from "@/assets/images/clientsLogo08.png";

export default function TrustedCompanySection() {
  const primaryRef = useRef<HTMLDivElement>(null);

  const logos = [
    {
      src: clientsLogo01,
      alt: "LT Logo",
      width: 80,
    },
    {
      src: clientsLogo02,
      alt: "A&R Logo",
      width: 120,
    },
    {
      src: clientsLogo03,
      alt: "Survatan Logo",
      width: 150,
    },
    {
      src: clientsLogo04,
      alt: "Linium Consult Logo",
      width: 160,
    },
    {
      src: clientsLogo05,
      alt: "Wellness Logo",
      width: 140,
    },
    {
      src: clientsLogo06,
      alt: "Alphatech Logo",
      width: 130,
    },
    {
      src: clientsLogo07,
      alt: "Analog Logo",
      width: 120,
    },
    {
      src: clientsLogo08,
      alt: "Analog Logo",
      width: 120,
    },
  ];

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="heading text-center">Trusted by companies</h2>
        <p className="description text-center max-w-3xl mx-auto ">
          Rapidiously morph transparent internal or &quot;organic&quot; sources
          whereas resource sucking e-business. Conveniently innovate compelling
          internal.
        </p>

        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          <div
            ref={primaryRef}
            className="flex gap-16 items-center whitespace-nowrap py-4 animate-marquee"
          >
            {logos.map((logo, index) => (
              <div
                key={`clone-${index}`}
                className="inline-flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-110 ease-in-out "
              >
                <div className="w-28 md:w-32 lg:w-40 h-20">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
