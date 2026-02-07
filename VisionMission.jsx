// src/pages/VisionMission.jsx
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import slide2 from "../assets/slide2.jpg";

export default function VisionMission() {
  return (
    <div>
      {/* HERO */}
      <PageHero
        title="Vision & Mission"
        subtitle="The strategic foundation of PT Sigma Cipta Utama in supporting the digital transformation of Indonesia’s energy sector."
        image={slide2}
      />

      {/* CONTENT */}
      <Section>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* VISION */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become a <strong>leading and trusted</strong> provider of{" "}
              <strong>Data Management</strong> and{" "}
              <strong>Information & Communication Technology (ICT)</strong> solutions
              in the national energy sector — through excellent, innovative, and
              sustainable services.
            </p>
          </div>

          {/* MISSION */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
              <li>
                Deliver <strong>Data Management</strong> and{" "}
                <strong>ICT</strong> services that are efficient, secure,
                and internationally standardized.
              </li>
              <li>
                Develop innovative information technology solutions that are
                responsive to the evolving needs of the energy industry.
              </li>
              <li>
                Uphold and continuously enhance{" "}
                <strong>HSSE (Health, Safety, Security & Environment)</strong>{" "}
                standards across all company operations.
              </li>
              <li>
                Play an active role in driving{" "}
                <strong>digital transformation</strong> and{" "}
                <strong>national energy sustainability</strong>.
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
