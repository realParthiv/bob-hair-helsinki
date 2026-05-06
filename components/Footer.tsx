'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Instagram, MapPin, Mail, ArrowUpRight } from 'lucide-react';

const variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 bg-[#FF3366] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm"
    >
      {children}
    </motion.a>
  );
};

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const footerLinks = ["about", "services", "join-us", "contact", "privacy"];

  return (
    <motion.footer 
      ref={ref}
      className="bg-[#1A1A1A] text-[#F4F4F4] pt-24 pb-12 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          style={{ y }}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#333] pb-24">
            <motion.div variants={variants} className="md:col-span-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">BOB<br />Hair Helsinki</h2>
              <p className="text-[#999] max-w-sm mb-8 leading-relaxed">
                The hair salon of the brave and rebellious. A warm and tolerant oasis where simple but sophisticated hair is tailored specifically for you.
              </p>
              <MagneticButton href="https://varaa.timma.fi/bobhairhelsinki">
                Book Appointment <ArrowUpRight size={16} />
              </MagneticButton>
            </motion.div>

            <motion.div variants={variants} className="md:col-span-4 md:col-start-6">
              <h3 className="text-sm uppercase tracking-widest text-[#FF3366] mb-8">Navigation</h3>
              <ul className="space-y-4">
                {footerLinks.map((link) => (
                  <li key={link}>
                    <Link href={`/${link}`} className="text-2xl hover:text-[#FF3366] transition-colors capitalize">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={variants} className="md:col-span-3">
              <h3 className="text-sm uppercase tracking-widest text-[#FF3366] mb-8">Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#999]">
                  <MapPin size={20} />
                  <span>Fredrikinkatu 20, 00120 Helsinki</span>
                </div>
                <div className="flex items-center gap-3 text-[#999]">
                  <Mail size={20} />
                  <a href="mailto:bob@bobhairhelsinki.com" className="hover:text-[#FF3366]">bob@bobhairhelsinki.com</a>
                </div>
                <div className="flex items-center gap-3 text-[#999]">
                  <Instagram size={20} />
                  <a href="https://instagram.com/bobhairhelsinki" className="hover:text-[#FF3366]">@bobhairhelsinki</a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={variants}
            className="mt-12 flex flex-col md:flex-row justify-between items-center text-sm text-[#666]"
          >
            <p>© {new Date().getFullYear()} BOB Hair Helsinki. Precision by Kristel Tamm and Saara Vuorela.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF3366]" />
                Vidal Sassoon partner salon
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-12 md:mt-24 overflow-hidden whitespace-nowrap pb-8">
        <motion.div 
          animate={{ x: ['0%', '-50%'] }} 
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 text-[15vw] md:text-[10vw] font-bold text-[#F4F4F4] uppercase opacity-[0.03] pointer-events-none"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>Revolutionary Cuts • Precision Design • Nordic Aesthetic • </span>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
}