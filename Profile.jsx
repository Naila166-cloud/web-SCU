// src/pages/Profile.jsx
import Section from "../components/ui/Section";
import ProfilVideo from "../components/ProfilVideo";


export default function Profile() {
  return (
    <div>
      {/* HERO */}
      <ProfilVideo />
      

      {/* OVERVIEW */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed">
          <p>
            <strong>PT Sigma Cipta Utama (SCU)</strong> is a subsidiary of{" "}
            <strong>PT Elnusa Tbk</strong> (Pertamina Group) specializing in{" "}
            <strong>data management</strong> and <strong>ICT</strong> solutions for
            the energy industry, particularly oil and gas. SCU serves as a digital
            transformation partner, providing secure, accurate, and efficient data
            governance with integrated, cross-platform technology.
          </p>

          <p>
            In <strong>2018</strong>, SCU merged with{" "}
            <strong>Patra Nusa Data</strong> — the operator of the National Oil & Gas
            Data Repository (NDR) — strengthening its role in upstream data management
            while supporting metadata standardization and system interoperability within
            the Pertamina Group.
          </p>
        </div>
      </Section>

      {/* HISTORY & TRANSFORMATION */}
      <Section title="History & Transformation">
        <div className="max-w-3xl mx-auto">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>April 8, 1980</strong> — SCU was established, focusing on data
              management for the oil and gas industry.
            </li>
            <li>
              <strong>1984</strong> — PT Elnusa Telematika (ETA) began operations in
              telematics, later strengthening SCU’s capabilities.
            </li>
            <li>
              <strong>1997</strong> — PT Elnusa Rentrakom started operations in
              telecommunications, complementing SCU’s future competencies.
            </li>
            <li>
              <strong>2007</strong> — SCU was designated as the sole subsidiary responsible
              for <strong>Data Management</strong> under the Elnusa Group, integrating ETA
              and Rentrakom to complete its technical portfolio.
            </li>
            <li>
              <strong>2018</strong> — SCU merged with{" "}
              <strong>Patra Nusa Data</strong>, operator of the NDR, expanding its scope in
              upstream technical data management and ICT integration.
            </li>
          </ul>
        </div>
      </Section>

      {/* VISION & MISSION */}
      <Section title="Vision & Mission">
        <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
          <p>
            <strong>Vision:</strong> To become a trusted partner in technology and data
            integration to enhance operational efficiency, safety, and value in the
            energy sector.
          </p>
          <p>
            <strong>Mission:</strong> To provide adaptive, secure, and standards-compliant
            data and ICT solutions; to build an open integration ecosystem; and to
            support sustainable digital transformation for all stakeholders.
          </p>
        </div>
      </Section>

      {/* PERFORMANCE & QUALITY CULTURE */}
      <Section title="Performance & Quality Culture">
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          <p className="mb-4">
            SCU upholds a professional performance culture driven by{" "}
            <strong>customer satisfaction</strong>, supported by skilled experts,
            modern operational facilities, and continuous technological improvement.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Continuous quality improvement aligned with{" "}
              <strong>HSE</strong> and industry quality management standards.
            </li>
            <li>
              Information security, access control, and auditable data governance.
            </li>
            <li>
              Ongoing development of human capital and process enhancement.
            </li>
          </ul>
        </div>
      </Section>

      {/* OPERATIONAL COVERAGE */}
      <Section title="Operational Coverage">
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-4">
          <div>
            <h4 className="font-semibold">Main Areas</h4>
            <p className="mt-1">
              Rokan (Riau), South Sumatra, East & North Kalimantan, East Java (Poleng),
              Greater Jakarta (Jabodetabek), Papua, and other strategic regions across Indonesia.
            </p>
          </div>
          <p>
            This wide coverage enables SCU to provide responsive and integrated operational
            support across multiple locations, aligned with the needs of the national energy sector.
          </p>
        </div>
      </Section>

      {/* VALUE PROPOSITION */}
      <Section title="SCU Value Proposition">
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          <ul className="list-disc pl-6 space-y-2">
            <li>Cross-platform integration & system interoperability.</li>
            <li>Flexible, open architecture and <em>vendor-independent</em> design.</li>
            <li>Strong data security and governance supporting auditability.</li>
            <li>Enterprise scalability for large-scale operations.</li>
          </ul>
        </div>
      </Section>
    </div>
  );
}