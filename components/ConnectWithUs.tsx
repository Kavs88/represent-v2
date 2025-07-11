export default function ConnectWithUs() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0E0E0E] via-[#0E0E0E] to-[#111111] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FFA3]/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-foreground">
        <h2 className="text-4xl font-serif font-bold tracking-tight text-primary mb-6">
          Connect With Us
        </h2>
        <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
          Are you a creative professional looking for representation, collaboration, or media exposure? We'd love to hear from you.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="/contact"
            className="inline-block bg-primary text-black font-semibold px-6 py-3 rounded-md shadow-md hover:brightness-110 transition-all"
          >
            Contact Us
          </a>
          <a
            href="/about"
            className="inline-block border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary/10 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
} 