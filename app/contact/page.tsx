'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Instagram, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

import Footer from '@/components/Footer';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function ContactPage() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const x = useMotionValue(0);
  const yBtn = useMotionValue(0);
  
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'rate-limited'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const checkRateLimit = () => {
    const lastSub = localStorage.getItem('last_submission');
    if (lastSub) {
      const diff = Date.now() - parseInt(lastSub);
      if (diff < 3600000) return true; // 1 hour
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (checkRateLimit()) {
      setFormState('rate-limited');
      return;
    }

    setFormState('submitting');
    const formData = new FormData(e.currentTarget);
    
    // Add your Web3Forms access key here
    formData.append("access_key", "3eeabaef-b034-4002-a8bc-ca6816dccfd7"); 
    formData.append("subject", "New Inquiry from BOB Hair Helsinki");
    formData.append("from_name", "BOB Hair Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState('success');
        localStorage.setItem('last_submission', Date.now().toString());
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorMessage(data.message || "Something went wrong.");
        setFormState('idle');
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      setFormState('idle');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    yBtn.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const titleText = "Let's begin a conversation.";
  const chars = titleText.split('');

  return (
    <main className="min-h-screen bg-[#F4F4F4] text-[#1A1A1A] overflow-x-hidden">

      
      <section className="relative h-[80vh] flex flex-col justify-end p-8 md:p-24 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image 
            src="/bob-hair-helsinki/images/contact.png" 
            alt="Editorial salon" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="visible" 
          className="relative z-10 max-w-4xl"
        >
          <motion.h1 className="text-[clamp(3.5rem,15vw,8rem)] leading-[0.85] font-bold text-white tracking-tighter">
            {chars.map((char, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      </section>

      <section className="py-24 px-8 md:px-24 grid md:grid-cols-2 gap-16" ref={scrollRef}>
        <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-4xl font-light mb-8">Reach Out</h2>
          <div className="space-y-6">
            <p className="text-xl max-w-md">BOB Hair Helsinki is a cultural hub for art, design, and fashion. Located in Kamppi, we invite you to experience precision and technical excellence.</p>
            <div className="flex items-center gap-4 text-lg">
              <MapPin className="text-[#FF3366]" />
              <span>Kamppi, Helsinki, Finland</span>
            </div>
            <a href="mailto:bob@bobhairhelsinki.com" className="flex items-center gap-4 text-lg hover:text-[#FF3366] transition-colors">
              <Mail className="text-[#FF3366]" />
              <span>bob@bobhairhelsinki.com</span>
            </a>
            <div className="pt-8">
              <motion.a 
                href="https://varaa.timma.fi/bobhairhelsinki"
                target="_blank"
                className="inline-block bg-[#FF3366] text-white px-8 py-4 rounded-full font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Consultation
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.form 
          variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 shadow-2xl"
        >
          {formState === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <CheckCircle2 size={64} className="text-[#FF3366] mb-4" />
              <h3 className="text-2xl font-bold">Message Received</h3>
              <p className="opacity-60">We look forward to connecting with you. Your inquiry has been secured.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="mt-8 text-sm font-bold uppercase tracking-widest border-b border-[#FF3366]"
              >
                Send another message
              </button>
            </div>
          ) : formState === 'rate-limited' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <h3 className="text-2xl font-bold mb-4">Slow Down</h3>
              <p className="opacity-60">You've recently sent a message. Please wait an hour before sending another inquiry for security reasons.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Web3Forms Honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              
              <div className="space-y-4">
                <input type="text" name="name" placeholder="Name" required className="w-full p-4 border-b border-[#1A1A1A] bg-transparent outline-none focus:border-[#FF3366] transition-colors" />
                <input type="email" name="email" placeholder="Email" required className="w-full p-4 border-b border-[#1A1A1A] bg-transparent outline-none focus:border-[#FF3366] transition-colors" />
                <textarea name="message" placeholder="What are you looking for?" rows={4} required className="w-full p-4 border-b border-[#1A1A1A] bg-transparent outline-none focus:border-[#FF3366] transition-colors" />
              </div>

              {/* hCaptcha Integration */}
              <div className="h-captcha" data-sitekey="50b27034-ad92-4af7-a4c9-ae582110f44a"></div>

              {errorMessage && <p className="text-[#FF3366] text-sm">{errorMessage}</p>}

              <motion.button 
                type="submit"
                className="w-full bg-[#1A1A1A] text-white py-4 font-bold flex items-center justify-center gap-2"
                style={{ x, y: yBtn }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { x.set(0); yBtn.set(0) }}
                whileHover={{ backgroundColor: "#FF3366" }}
                whileTap={{ scale: 0.98 }}
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Securing...' : 'Send Inquiry'} <ArrowRight size={18} />
              </motion.button>
            </div>
          )}
        </motion.form>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-lg md:text-xl font-bold uppercase mb-6 tracking-widest text-[#FF3366]">Booking Policy</h4>
            <p className="text-lg opacity-70 leading-relaxed">We operate on a consultation-first basis to ensure technical accuracy. Please notify us 24 hours in advance for cancellations to avoid a fee.</p>
          </motion.div>
          <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-lg md:text-xl font-bold uppercase mb-6 tracking-widest text-[#FF3366]">Arrival</h4>
            <p className="text-lg opacity-70 leading-relaxed">We recommend arriving 10 minutes prior to your appointment to enjoy our current art exhibition and a complimentary beverage.</p>
          </motion.div>
          <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-lg md:text-xl font-bold uppercase mb-6 tracking-widest text-[#FF3366]">Location</h4>
            <p className="text-lg opacity-70 leading-relaxed">Conveniently located in Kamppi, just a 5-minute walk from the central station. Public transit and parking are readily available nearby.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-t border-[#E0E0E0] text-center overflow-hidden">
        <motion.div 
          className="text-[5rem] md:text-[10rem] font-black uppercase text-[#1A1A1A]/10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Object.values(["Vidal Sassoon Partner", "Helsinki Based", "Precision Cutting", "Art & Fashion"]).join(' — ')}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}