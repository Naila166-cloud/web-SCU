import PageHeader from "../components/PageHeader";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import slide3 from "../assets/slide3.jpg";
import pertamina from "../assets/pertamina.png";
import elnusa from "../assets/elnusa.png";

function Clients() {
  return (
    <div>
      <PageHeader title="Klien & Proyek Kami" image={slide3} />

      <Section title="Partner & Klien" subtitle="Dipercaya oleh perusahaan nasional & multinasional" center>
        <div className="flex flex-wrap justify-center gap-10 mb-16">
          <img src={pertamina} alt="Pertamina" className="h-14" />
          <img src={elnusa} alt="Elnusa" className="h-14" />
          <img src="/assets/partner1.png" alt="Partner" className="h-14" />
          <img src="/assets/partner2.png" alt="Partner" className="h-14" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Manage Service Data Center">
            SCU mendukung Pertamina Group dalam layanan pengelolaan data center,
            memastikan keamanan, efisiensi, dan keberlangsungan operasional sistem TI.
          </Card>
          <Card title="Warehouse & Asset Management">
            Dengan area gudang 29.000 m², SCU mendukung pengelolaan dokumen fisik & digital
            untuk efisiensi records management.
          </Card>
          <Card title="IoT & Automation Projects">
            Implementasi IoT & otomasi di sektor energi untuk monitoring, efisiensi, dan produktivitas.
          </Card>
          <Card title="Application Development">
            Pengembangan aplikasi custom, cloud-based, dan internal system sesuai kebutuhan klien.
          </Card>
        </div>
      </Section>
    </div>
  );
}

export default Clients;
