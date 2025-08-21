"use client";

const testimonials = [
  "“This service saved us weeks of work!” – Aarav",
  "“Super easy to set up and use.” – Priya",
  "“Clean, modern UI. Loved it.” – Rahul",
  "“Perfect for our SaaS platform.” – Neha",
  "“Fast integration and great support.” – Karan",
];

export default function MovingCards() {
  return (
    <section className="bg-black text-white py-6 overflow-hidden">
      <div className="whitespace-nowrap flex">
        <div className="animate-marquee flex space-x-12">
          {testimonials.map((t, i) => (
            <span key={i} className="text-lg font-medium">
              {t}
            </span>
          ))}
        </div>

        {/* duplicate for seamless loop */}
        <div className="animate-marquee flex space-x-12" aria-hidden="true">
          {testimonials.map((t, i) => (
            <span key={i} className="text-lg font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
