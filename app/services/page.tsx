'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Scissors, Star, Sparkles, MapPin, Mail } from 'lucide-react';

import Footer from '@/components/Footer';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const servicesList = [
  { title: "signature bob cuts", desc: "Precision-engineered, Vidal Sassoon inspired geometry." },
  { title: "modern haircuts", desc: "Contemporary silhouettes tailored to your lifestyle." },
  { title: "makeup", desc: "Editorial aesthetic for high-fashion impact." },
  { title: "balayage", desc: "Hand-painted dimension for a natural, sun-kissed finish." },
  { title: "keratin", desc: "Smoothing treatments for effortless manageability." },
  { title: "bridal styling", desc: "Architectural hair design for your most important moments." }
];

export default function ServicesPage() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const x = useMotionValue(0);
  const yVal = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    yVal.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <main className="bg-[#F4F4F4] text-[#1A1A1A] min-h-screen overflow-x-hidden">


      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/services.png" 
            alt="BOB Services Background" 
            fill 
            className="object-cover grayscale"
          />
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 text-center space-y-8 px-6 mt-12">
          <motion.h1 variants={itemVariants} className="text-[clamp(3.5rem,15vw,10rem)] font-black uppercase leading-[0.85] tracking-tighter mb-8">
            Expertise & <br className="hidden md:block"/>Precision
          </motion.h1>
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto space-y-6">
            <p className="text-2xl font-light leading-relaxed">
              Vidal Sassoon partnership emphasizes precision and technical excellence. 
              Our services are curated experiences designed for the avant-garde.
            </p>
            <div className="h-px w-24 bg-[#FF3366] mx-auto opacity-50" />
            <p className="text-sm uppercase tracking-[0.3em] opacity-60">
              Pricing by consultation only • Precision engineered
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-white border-y border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#FF3366] mb-4">Investment</h3>
              <h4 className="text-5xl font-bold uppercase tracking-tighter leading-none">Services & Pricing</h4>
            </div>
            <p className="text-sm opacity-50 italic">Prices include VAT of 25.5%</p>
          </div>
          
          <div className="space-y-6">
            {[
              { name: "Haircut", price: "85-130 €" },
              { name: "Colour", price: "165 €" },
              { name: "Cut and Colour", price: "195 €" },
              { name: "Highlights and Multicolour", price: "235 €" },
              { name: "Highlight/Multicolour and Cut", price: "235 €" },
              { name: "Bleach", price: "220 €" },
              { name: "Blow-dry / Straightening", price: "88 €" },
              { name: "Hairdo", price: "155 €" },
              { name: "Hair Treatments", price: "105 €" },
              { name: "Make Up", price: "140 €" }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between items-end border-b border-black/5 pb-4 group hover:border-[#FF3366] transition-colors"
              >
                <div className="text-xl uppercase font-bold tracking-tight group-hover:text-[#FF3366] transition-colors">{service.name}</div>
                <div className="flex-1 border-b border-dotted border-black/10 mx-4 mb-2" />
                <div className="text-lg font-light opacity-60">From {service.price}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-xs opacity-40 leading-relaxed">
            Note! For times that are not cancelled or that are cancelled the same day, we charge 75% of the price.
          </p>
        </div>
      </section>

      <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-8 uppercase tracking-tighter">
            Cultural hub for art, design, and fashion
          </h2>
          <motion.button
            style={{ x, y: yVal }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); yVal.set(0) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase flex items-center gap-2 mx-auto"
            onClick={() => window.open('https://varaa.timma.fi/bobhairhelsinki', '_blank')}
          >
            Book Consultation <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </section>

      <section className="bg-[#1A1A1A] text-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] overflow-hidden rounded-2xl shadow-2xl">
            <Image 
              src="/bob-hair-helsinki/images/about.png" 
              alt="Professional hairstylist studio" 
              fill 
              className="object-cover brightness-75 hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-[#FF3366] uppercase tracking-[0.3em] text-xs md:text-sm">Specialized Craft</h3>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">The Sassoon <br/>Methodology</h2>
            </div>
            <p className="text-xl opacity-80 leading-relaxed italic">
              "Hair design is an architectural project that complements the individual's unique bone structure."
            </p>
            <div className="space-y-6 text-lg opacity-60 leading-relaxed">
              <p>BOB Hair Helsinki brings the revolutionary precision of London's finest techniques to the heart of Kamppi. Our stylists are trained in the geometric principles of cutting, ensuring that every style is not just beautiful, but structurally sound.</p>
              <p>We cater to the fashion-forward, art-conscious clientele who demand technical mastery and creative vision.</p>
            </div>
            <div className="flex flex-wrap gap-12 pt-8 border-t border-white/10">
              <div className="space-y-2">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-xs uppercase tracking-widest opacity-40">Precision Hand-Cut</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">Vidal</div>
                <div className="text-xs uppercase tracking-widest opacity-40">Partner Salon</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">Kamppi</div>
                <div className="text-xs uppercase tracking-widest opacity-40">Helsinki Hub</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#FF3366] mb-6">Product Philosophy</h3>
              <h4 className="text-5xl font-bold uppercase tracking-tighter leading-none">Artistry Meets <br/>Science</h4>
            </div>
            <p className="max-w-md text-lg opacity-60 italic">We partner with global leaders in hair health to ensure your style is supported by the highest quality chemical engineering.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {["Olaplex", "Kevin Murphy", "Sassoon Professional", "Editorial Care"].map((item, i) => (
              <div key={i} className="group cursor-default">
                <div className="h-px w-full bg-black/10 mb-6 group-hover:bg-[#FF3366] transition-colors" />
                <div className="text-xl font-bold uppercase tracking-widest">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}