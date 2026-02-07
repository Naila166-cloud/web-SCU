// src/pages/Structure.jsx
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import slide2 from "../assets/slide2.jpg";
import { motion } from "framer-motion";

const placeholder = "/personil/person-placeholder.jpg";

// Variants animasi (halus & profesional)
const containerV = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const listV = {
  hidden: { opacity: 0 },
  show: (i = 1) => ({
    opacity: 1,
    transition: { delayChildren: 0.08 * i, staggerChildren: 0.06 },
  }),
};

const itemV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const groups = [
  {
    title: "Manajemen & Koordinasi",
    people: [
      { name: "Marwan Siregar", role: "Area Manager Riau", image: "/personil/marwan-siregar.jpg" },
      { name: "Riski Riau Wadi Putra", role: "Project Manager", image: "/personil/riski-riau-wadi-putra.jpg" },
      { name: "Ilham Rusfebto Kurniawan", role: "HSSE Coordinator", image: "/personil/ilham-rusfebto-kurniawan.jpg" },
    ],
  },
  {
    title: "Engineering & Operasional",
    people: [
      { name: "Jaswandi", role: "North Engineer", image: "/personil/jaswandi.jpg" },
      { name: "Romi Nardo", role: "South Engineer", image: "/personil/romi-nardo.jpg" },
      { name: "Andrey Lahnan", role: "IoT Engineer", image: "/personil/andrey-lahnan.jpg" },
    ],
  },
  {
    title: "Data Operation",
    people: [
      { name: "M. Taufiq Israr", role: "Data Help Desk", image: "/personil/m-taufiq-israr.jpg" },
      { name: "Nabilah Adriana", role: "Data Help Desk", image: "/personil/nabilah-adriana.jpg" },
    ],
  },
  {
    title: "Technicians — North (Duri)",
    people: [
      { name: "Fendri Gustama P", role: "Technician North–Duri", image: "/personil/fendri-gustama-p.jpg" },
      { name: "M. Hidayat", role: "Technician North–Duri", image: "/personil/m-hidayat.jpg" },
      { name: "Farriq Ardli", role: "Technician North–Duri", image: "/personil/farriq-ardli.jpg" },
    ],
  },
  {
    title: "Technicians — North (Bangko)",
    people: [
      { name: "Suhendri", role: "Technician North–Bangko", image: "/personil/suhendri.jpg" },
      { name: "Muhammad Ali", role: "Technician North–Bangko", image: "/personil/muhammad-ali.jpg" },
      { name: "Angga Ifar. H. H", role: "Technician North–Bangko", image: "/personil/angga-ifar-h-h.jpg" },
    ],
  },
  {
    title: "Technicians — South",
    people: [
      { name: "M. Ikhsan Dauly", role: "Technician South", image: "/personil/m-ikhsan-dauly.jpg" },
      { name: "Rozi Alfansyah", role: "Technician South", image: "/personil/rozi-alfansyah.jpg" },
    ],
  },
];

export default function Structure() {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Hero */}
      <PageHero
        title="Project Team"
        subtitle="Key Personnel of the SCADA Project — PT Sigma Cipta Utama"
        image={slide2}
      />

      {/* Personnel Section */}
      <Section title="Project Team" subtitle="Key Personnel — SCADA Project Riau" center>
        <div className="space-y-14">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              variants={containerV}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              {/* Header Group */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h4 className="text-lg font-semibold text-gray-800 tracking-tight">
                  {group.title}
                </h4>
                <div className="h-px flex-1 bg-gradient-to-r from-sky-400/70 via-cyan-300/50 to-transparent rounded-full" />
              </div>

              {/* Grid Modern */}
              <motion.div
                variants={listV}
                custom={gi + 1}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {group.people.map((person) => (
                  <motion.div
                    key={`${group.title}-${person.name}`}
                    variants={itemV}
                    className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Foto */}
                      <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-300/20 via-cyan-300/30 to-indigo-300/20 blur-lg opacity-0 group-hover:opacity-100 transition" />
                        <img
                          src={person.image || placeholder}
                          alt={person.name}
                          className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md ring-1 ring-sky-100"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = placeholder;
                          }}
                        />
                      </div>

                      {/* Info */}
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-700 transition">
                        {person.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-sky-700 bg-sky-50/80 px-3 py-1 rounded-full inline-block">
                        {person.role}
                      </p>
                    </div>

                    {/* Gradient underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
