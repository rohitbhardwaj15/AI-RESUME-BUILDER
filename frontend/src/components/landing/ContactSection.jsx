import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const initialState = {
  name: "",
  email: "",
  message: ""
};

const ContactSection = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Valid email is required";
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters";
    return next;
  }, [form]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    // Frontend validation + mock submit. Replace with API call when backend contact endpoint is added.
    alert("Thanks! Your message has been submitted.");
    setForm(initialState);
    setSubmitted(false);
  };

  return (
    <section className="bg-slate-900 text-white" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Contact Us</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 md:text-base">
              Have questions about templates, AI features, or enterprise usage? Send us a message and we will get back to you.
            </p>
          </div>

          <motion.form initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={onSubmit} noValidate className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5">
            <label htmlFor="contact-name" className="mb-1 block text-sm">Name</label>
            <input
              id="contact-name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="mb-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
              aria-invalid={submitted && !!errors.name}
            />
            {submitted && errors.name && <p className="mb-2 text-xs text-rose-300">{errors.name}</p>}

            <label htmlFor="contact-email" className="mb-1 mt-2 block text-sm">Email</label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="mb-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
              aria-invalid={submitted && !!errors.email}
            />
            {submitted && errors.email && <p className="mb-2 text-xs text-rose-300">{errors.email}</p>}

            <label htmlFor="contact-message" className="mb-1 mt-2 block text-sm">Message</label>
            <textarea
              id="contact-message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              className="mb-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
              aria-invalid={submitted && !!errors.message}
            />
            {submitted && errors.message && <p className="mb-2 text-xs text-rose-300">{errors.message}</p>}

            <button type="submit" className="mt-3 rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;