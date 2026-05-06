'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function JoinUsPage() {
  return (
    <main className="bg-[#F4F4F4] min-h-screen text-[#1A1A1A]">
      <Navbar />
      
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="visible"
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.p variants={variants} className="text-[#FF3366] uppercase tracking-[0.4em] font-bold text-sm mb-6">
            Join Our Team
          </motion.p>
          <motion.h1 className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.85] tracking-tighter mb-12">
            ”A WORK PLACE IS A RELAXED SPACE WHERE CREATIVITY THRIVES.”
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <motion.div variants={variants} className="space-y-8">
              <p className="text-2xl font-light leading-relaxed">
                Are you the ambitious, enthusiastic, and unique hairstylist we are looking for? Join us in a warm and supportive environment where you can experiment, learn, create, and be inspired together!
              </p>
              <div className="pt-8">
                <a 
                  href="mailto:bob@bobhairhelsinki.com?subject=Join Bob Hair Helsinki"
                  className="inline-block bg-[#FF3366] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl"
                >
                  GET IN TOUCH
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={variants} className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/bob-hair-helsinki/images/interior.png" 
                alt="BOB Studio Atmosphere" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-32 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h3 className="text-[#FF3366] uppercase tracking-widest text-xs">Environment</h3>
              <p className="text-xl font-light">Warm, tolerant, and creatively unrestricted.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[#FF3366] uppercase tracking-widest text-xs">Growth</h3>
              <p className="text-xl font-light">Local and international training opportunities.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[#FF3366] uppercase tracking-widest text-xs">Community</h3>
              <p className="text-xl font-light">We respect and enjoy each other and our clients.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
