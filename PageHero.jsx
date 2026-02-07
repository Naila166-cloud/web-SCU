// src/components/ui/PageHero.jsx
import { motion } from "framer-motion";
import BreadcrumbBar from "../BreadcrumbBar";

export default function PageHero({
  title,
  subtitle,
  image,
  showBreadcrumb = true,
  brand,
  accent,
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full px-6 md:px-12">
      <div className="relative rounded-b-2xl overflow-hidden h-[60vh] min-h-[420px] flex items-center">
        {/* Background */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        {/* Konten */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 container mx-auto w-full flex flex-col justify-end h-full pb-20 md:pb-28"
        >
          {/* Brand */}
          {brand && (
            <motion.div
              variants={fadeUp}
              className="mb-2 text-sm md:text-base font-semibold tracking-wide"
              style={{ color: "#E73431" }}
            >
              {brand}
            </motion.div>
          )}

          {/* Title */}
          <div className="drop-shadow-xl">
            <motion.h1
              variants={fadeUp}
              className="font-extrabold leading-[0.98] text-4xl sm:text-5xl md:text-7xl"
              style={{ color: "#0076C6" }}
            >
              {title}
            </motion.h1>

            {accent && (
              <motion.div
                variants={slideLeft}
                className="font-extrabold leading-[0.98] text-4xl sm:text-5xl md:text-7xl"
                style={{ color: "#0076C6" }}
              >
                {accent}
              </motion.div>
            )}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg md:text-xl max-w-2xl font-medium"
              style={{ color: "#E73431" }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Breadcrumb */}
        {showBreadcrumb && (
          <BreadcrumbBar
            inHero
            labelOverride={title ? String(title).toUpperCase() : undefined}
          />
        )}
      </div>
    </section>
  );
}
