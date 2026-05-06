'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Instagram, MapPin, Mail, Scissors } from 'lucide-react';

const variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const MAGNETIC_BUTTON_PROPS = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function Page() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const x = useMotionValue(0);
  const yPos = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    yPos.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const title = "BOB Hair Helsinki".split('');

  return (
    <main className="bg-[#F4F4F4] text-[#1A1A1A] overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-16">
        <motion.div initial="hidden" animate="visible" variants={container} className="z-10 max-w-5xl">
          <motion.p variants={variants} className="text-[#FF3366] uppercase tracking-[0.4em] mb-6 font-bold text-sm">
            Tove Jansson (Tuutikki, Taikatalvi)
          </motion.p>
          <motion.h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.1] tracking-tighter mb-8">
            ”KAIKKI ON HYVIN EPÄVARMAA, JA JUURI SE TEKEE MINUT LEVOLLISEKSI”
          </motion.h1>
          <motion.div variants={variants} className="flex flex-col md:flex-row gap-12 mt-12">
            <div className="flex-1 space-y-6 text-lg opacity-80 leading-relaxed">
              <p>BOB, the haircut, first appeared in the frisky 1920s. It started a revolution in women's hair fashion, establishing itself as the hairstyle of the brave and rebellious. BOB is also the most renowned haircut of our role model and source of eternal inspiration, Vidal Sassoon.</p>
              <p>For that reason, BOB is also the perfect name for our hair salon, a dream shared by two women who happen to have a BOB haircut.</p>
            </div>
            <div className="flex-1 flex items-center">
              <motion.a 
                href="https://varaa.timma.fi/bobhairhelsinki"
                className="inline-block bg-[#000000] text-[#F4F4F4] px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                {...MAGNETIC_BUTTON_PROPS}
              >
                Book Appointment
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y }} className="absolute inset-0 -z-0 opacity-40">
          <Image 
            src="/bob-hair-helsinki/images/hero_v2.png" 
            alt="Cinematic editorial hair salon" 
            fill 
            className="object-cover brightness-75 scale-105"
          />
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="relative z-20 py-24 bg-[#F4F4F4] border-y border-[#1A1A1A]/20 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: ['0%', '-50%'] }} 
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 text-[4rem] font-bold uppercase"
        >
          {['SIGNATURE BOB', 'MODERN CUTS', 'BALAYAGE', 'PRECISION', 'ARTISTRY'].map((text, i) => (
            <span key={i}>{text} //</span>
          ))}
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-16 grid md:grid-cols-2 gap-16 items-center bg-white">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ margin: "-100px" }}
        >
          <h3 className="text-sm uppercase tracking-[0.3em] text-[#FF3366] mb-8">Our Philosophy</h3>
          <h2 className="text-5xl font-bold mb-8 tracking-tighter uppercase leading-tight">Simple but Sophisticated</h2>
          <div className="space-y-6 text-xl leading-relaxed font-light italic">
            <p>BOB´s heart beats for freedom, clarity and rebellion with professionalism and love. Our philosophy at BOB is; simple but sophisticated and easy to maintain hair that is tailored specifically for you and your lifestyle.</p>
            <p className="not-italic opacity-60">“If you don ́t look good, we don ́t look good.” — Vidal Sassoon</p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ margin: "-100px" }}
          className="relative h-[800px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <motion.div style={{ scale: 1.2, y: useTransform(scrollYProgress, [0.3, 0.7], ['-10%', '10%']) }} className="absolute inset-0">
            <Image 
              src="/bob-hair-helsinki/images/interior.png" 
              alt="Minimal Nordic Interior" 
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 md:px-16 bg-[#000000] text-[#F4F4F4]">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3 variants={variants} className="text-sm uppercase tracking-[0.2em] mb-16 text-[#FF3366]">Our Expertise</motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {["signature bob cuts", "modern haircuts", "makeup", "balayage", "keratin", "bridal styling"].map((service, i) => (
              <motion.div key={i} variants={variants} className="p-8 md:p-12 border border-[#333] hover:border-[#FF3366] transition-all hover:bg-[#111] group rounded-xl">
                <Scissors className="mb-6 text-[#FF3366] group-hover:scale-110 transition-transform" />
                <h4 className="text-xl md:text-2xl font-bold uppercase mb-4 leading-tight">{service}</h4>
                <p className="text-sm opacity-50 leading-relaxed">Precision-engineered techniques tailored to your unique bone structure and aesthetic identity.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {[
            { step: "01", title: "Consultation", desc: "A deep dive into your lifestyle, hair history, and aesthetic goals. We treat every head of hair as a unique architectural project." },
            { step: "02", title: "Engineering", desc: "Applying Vidal Sassoon inspired geometry to create cuts that move naturally and maintain their shape as they grow." },
            { step: "03", title: "Refinement", desc: "The finishing touches—editorial styling and product education to ensure you can replicate the salon look at home." }
          ].map((item, i) => (
            <motion.div key={i} variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-[#FF3366] font-bold text-lg mb-4 block">{item.step} —</span>
              <h4 className="text-3xl font-bold uppercase mb-6 tracking-tighter">{item.title}</h4>
              <p className="text-lg opacity-70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-20 px-6 md:px-16 bg-[#F4F4F4]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h5 className="font-bold text-2xl mb-4 uppercase tracking-tighter">BOB Hair Helsinki</h5>
            <p className="flex items-center gap-2 mb-2"><MapPin size={18} /> Fredrikinkatu 20, 00120 Helsinki</p>
            <p className="flex items-center gap-2 mb-2"><Mail size={18} /> bob@bobhairhelsinki.com</p>
            <p className="font-bold mt-4 text-[#FF3366] tracking-widest text-sm">+358-44-9825198</p>
          </div>
          <div className="flex flex-col gap-4">
            <a href="https://www.instagram.com/bobhairhelsinki" className="flex items-center gap-2 text-xl font-medium">
              <Instagram /> @bobhairhelsinki
            </a>
            <motion.a 
              href="https://varaa.timma.fi/bobhairhelsinki"
              className="bg-[#FF3366] text-white px-8 py-3 rounded-full flex items-center gap-2 w-fit"
              {...MAGNETIC_BUTTON_PROPS}
            >
              Book Now <ArrowRight size={18} />
            </motion.a>
          </div>
          <div className="mt-12 pt-8 border-t border-black/10 text-sm text-black/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} BOB Hair Helsinki. Precision by Kristel Tamm and Saara Vuorela.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
              <span>Vidal Sassoon Partner Salon</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}