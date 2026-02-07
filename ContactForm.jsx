import { useState } from "react";
import { supabase } from "../supabaseClient";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contacts").insert([form]);

    setLoading(false);
    if (error) {
      console.error(error);
      alert("Gagal menyimpan pesan. Coba lagi.");
      return;
    }
    alert("Pesan berhasil dikirim!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" className="w-full border p-2 rounded" required />
      <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="w-full border p-2 rounded" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Pesan" rows="4" className="w-full border p-2 rounded" required />
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}
export default ContactForm;
