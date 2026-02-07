// src/pages/Services.jsx
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import slide2 from "../assets/slide2.jpg";
import { Database, Cpu, Ship, Gauge, Boxes } from "lucide-react";

function Services() {
  const services = [
    {
      title: "Data & Asset Management",
      desc: "Integrated management of data and assets with high operational standards.",
      link: "/services/data-asset",
      icon: Boxes,
    },
    {
      title: "ICT Services",
      desc: "Digital transformation through applications, IoT, data centers, and IT consulting.",
      link: "/services/ict",
      icon: Cpu,
    },
    {
      title: "Automatic Vessel Tracking (AVTS)",
      desc: "Real-time vessel monitoring to ensure operational efficiency and safety.",
      link: "/services/avts",
      icon: Ship,
    },
    {
      title: "SCADA (Supervisory Control and Data Acquisition)",
      desc: "A real-time monitoring and control system for industrial operations — secure, efficient, and well-documented.",
      link: "/scada",
      icon: Gauge,
    },
    {
      title: "RETINA Monitoring",
      desc: "Real-time drilling monitoring with CCTV integration and automatic alerts.",
      link: "/retina",
      icon: Database,
    },
    {
      title: "National Data Repository (NDR)",
      desc: "Management of Indonesia’s national energy data following international standards.",
      link: "/services/ndr",
      icon: Database,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Products & Services"
        subtitle="Delivering innovative digital solutions to support the energy industry — including SCADA integration and smart monitoring systems."
        image={slide2}
      />

      {/* Services List */}
      <Section title="Our Services" center>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <Card key={srv.title} title={srv.title} desc={srv.desc} icon={srv.icon}>
              <Button to={srv.link}>View Details</Button>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default Services;
