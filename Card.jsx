function Card({ title, desc, children }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition group">
      <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition">
        {title}
      </h3>
      {desc && <p className="text-gray-600 mb-4">{desc}</p>}
      {children}
    </div>
  );
}

export default Card;
