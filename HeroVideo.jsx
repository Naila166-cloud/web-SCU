import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom"; // <-- tambah ini

const mp4Url = "/hero.mp4.mp4";

export default function HeroVideo() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="relative w-full px-8 md:px-12 py-8 md:py-10 overflow-hidden">
      <motion.div
        className="relative rounded-2xl overflow-hidden h-[85vh] min-h-[680px]"
        style={{ y }}
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-95"
          src={mp4Url}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => console.log("[VIDEO LOADED]:", mp4Url)}
          onError={(e) => { console.log("[VIDEO ERROR]", mp4Url, e); }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent backdrop-blur-[1px]" />

        <div className="relative z-10 flex flex-col justify-center h-full px-10 md:px-20 text-left">
          <motion.span
            className="text-sm md:text-base text-red-400 font-semibold mb-3 tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            PT Sigma Cipta Utama
          </motion.span>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-snug mb-6 max-w-2xl drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Digital Solutions, <br />
            <motion.span
              className="text-blue-400 inline-block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Ready to Support the Energy Industry
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            We deliver the best services through innovative technologies for a
            more sustainable future.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <Link
              to="/profile"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition"
            >
              Company Profile
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-white/90 text-gray-900 font-medium shadow-lg hover:bg-white transition"
            >
              Contact Us →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
