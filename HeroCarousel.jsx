import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const DURATION = 5000;

const slides = [
  { image: slide1, title: "Total Solution", desc: "Kami adalah satu-satunya perusahaan jasa energi nasional, yang memberikan solusi total dari layanan hulu hingga hilir." },
  { image: slide2, title: "Komitmen Kami", desc: "Kami berkomitmen terhadap inovasi, keberlanjutan, dan pelayanan terbaik." },
  { image: slide3, title: "Profesional & Terpercaya", desc: "Didukung tenaga kerja ahli dan berpengalaman di bidang energi." },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const visRef = useRef(typeof document !== "undefined" ? document.visibilityState : "visible");

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const goTo = (i) => setCurrent(i);

  const handlers = useSwipeable({ onSwipedLeft: next, onSwipedRight: prev, trackMouse: true });

  useEffect(() => {
    const onVis = () => (visRef.current = document.visibilityState);
    document.addEventListener("visibilitychange", onVis);
    const interval = setInterval(() => { if (visRef.current === "visible") next(); }, DURATION);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <section
      {...handlers}
      className="relative w-full h-screen overflow-hidden select-none -mt-[80px]"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
    >
      {slides.map((slide, i) => {
        const active = i === current;
        return (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}>
            <img src={slide.image} alt={slide.title} className={`w-full h-full object-cover transition-transform duration-[6000ms] ${active ? "scale-110" : "scale-100"}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <div className="max-w-3xl">
                <h1 className={`text-4xl md:text-6xl font-extrabold text-white transition-all ${active ? "opacity-100" : "opacity-0"}`}>
                  {slide.title}
                </h1>
                <p className={`mt-4 text-lg md:text-2xl text-white/90 transition-all ${active ? "opacity-100" : "opacity-0"}`}>
                  {slide.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full">
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => {
          const active = i === current;
          return (
            <button key={i} onClick={() => goTo(i)} className={`h-3 w-3 rounded-full ${active ? "bg-white" : "bg-white/50"}`} />
          );
        })}
      </div>
    </section>
  );
}
