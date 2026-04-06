import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Hero3D from "../components/Hero3D";

const HomePage = () => (
  <div>
    <Navbar />
    <Hero3D />

    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-3">
      {["AI Writing", "3D SaaS UI", "Share + PDF"].map((item, i) => (
        <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="glass rounded-2xl p-5">
          <h3 className="text-xl font-bold text-sky-300">{item}</h3>
          <p className="mt-2 text-sm text-slate-300">Production-ready module crafted for modern resume workflows.</p>
        </motion.div>
      ))}
    </section>
  </div>
);

export default HomePage;