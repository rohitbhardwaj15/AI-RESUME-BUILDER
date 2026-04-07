import { motion } from "framer-motion";
import dummyProfile from "../../assets/dummy_profile.png";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Product Analyst",
    quote: "I built a clean ATS resume in under 15 minutes and got interview calls within a week."
  },
  {
    name: "Aman Verma",
    role: "Software Engineer",
    quote: "The AI improvements made my experience section far more impactful and concise."
  },
  {
    name: "Neha Kapoor",
    role: "HR Specialist",
    quote: "Great templates and very easy editing workflow. Highly recommend for freshers and professionals."
  }
];

const TestimonialsSection = () => (
  <section className="mx-auto max-w-7xl px-4 py-14" id="testimonials">
    <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">What Users Say</h2>
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {testimonials.map((item, index) => (
        <motion.blockquote
          key={item.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm leading-6 text-slate-600">"{item.quote}"</p>
          <footer className="mt-4 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-3">
              <img src={dummyProfile} alt={item.name} className="h-9 w-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </div>
          </footer>
        </motion.blockquote>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
