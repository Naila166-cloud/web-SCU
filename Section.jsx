function Section({ title, subtitle, children, center }) {
  return (
    <section className="container mx-auto px-4 py-16">
      {title && (
        <div className={`mb-12 ${center ? "text-center" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export default Section;
