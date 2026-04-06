import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Orb = () => {
  const ref = useRef();
  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.3} floatIntensity={1.8}>
      <Sphere ref={ref} args={[1.2, 128, 128]}>
        <MeshDistortMaterial color="#0ea5e9" distort={0.35} speed={2.5} roughness={0.05} metalness={0.6} />
      </Sphere>
    </Float>
  );
};

const Hero3D = () => (
  <section className="grid-bg relative overflow-hidden">
    <div className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-black leading-tight md:text-6xl">
          Build ATS-Ready Resumes With <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">AI + 3D SaaS UX</span>
        </h1>
        <p className="max-w-xl text-slate-300">
          Create, edit, animate, and share stunning resumes with live preview, smart AI writing, template switching, and one-click PDF export.
        </p>
        <div className="flex gap-3">
          <Link to="/signup" className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white shadow-glow hover:bg-sky-600">
            Start Free
          </Link>
          <Link to="/dashboard" className="rounded-xl border border-slate-700 px-5 py-3 font-semibold hover:border-sky-400">
            Open Dashboard
          </Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.9 }} className="glass h-[420px] rounded-3xl">
        <Canvas camera={{ position: [0, 0, 3.4], fov: 55 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1.2} />
          <Orb />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </motion.div>
    </div>
  </section>
);

export default Hero3D;